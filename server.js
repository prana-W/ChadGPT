import express from "express";
import cors from "cors";
import {WRAPPER_MODEL, serverPort, modelBaseUrl} from "./constants.js";

const app = express();
const PORT = serverPort;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {

    return res.json({
        success: true,
        message: 'ChadGPT server is running.'
    })

});

// ─── Non-streaming endpoint (kept for reference) ────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const ollamaResponse = await fetch(modelBaseUrl + "/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: WRAPPER_MODEL,
        prompt: `User question:
${message}`,
        stream: false
      }),
    });

    const data = await ollamaResponse.json();
    res.json({ reply: data.response.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ollama server error" });
  }
});

// ─── Streaming endpoint via Server-Sent Events ──────────────────────────────
app.post("/api/chat/stream", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const ollamaResponse = await fetch(modelBaseUrl + "/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: WRAPPER_MODEL,
        prompt: `User question:
${message}`,
        stream: true
      }),
    });

    if (!ollamaResponse.ok) {
      res.write(`event: error\ndata: Ollama returned ${ollamaResponse.status}\n\n`);
      res.end();
      return;
    }

    // Pipe Ollama's NDJSON stream through to the client as SSE
    const reader = ollamaResponse.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Ollama sends one JSON object per line
      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep the incomplete trailing line

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            // Forward just the token chunk
            res.write(`data: ${JSON.stringify({ token: json.response })}\n\n`);
          }
          if (json.done) {
            res.write(`event: done\ndata: {}\n\n`);
          }
        } catch {
          // skip malformed lines
        }
      }
    }

    // Safety: send done if Ollama didn't
    res.write(`event: done\ndata: {}\n\n`);
    res.end();
  } catch (error) {
    console.error(error);
    res.write(`event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

process.on("exit", code => {
    console.log("❌ process.exit called with code:", code);
});