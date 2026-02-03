# ChadGPT 🤖⚡

**ChadGPT** is a modern, local-first chatbot powered by **Ollama** and a **custom-modified version of the DeepSeek-Coder 6.7B parameter LLM**.  
It is designed primarily for **programming assistance**, while still being capable of answering general non-technical questions.

No cloud APIs.  
No API keys.  
Runs fully on your machine.

---

## ✨ Features

- 🧠 **DeepSeek-Coder 6.7B (Modified)**  
  Uses a custom Ollama model with an updated system prompt for better control and consistency.

- 💻 **Code-first intelligence**  
  Excellent at:
  - Writing clean, production-ready code  
  - Explaining algorithms & data structures  
  - Debugging and refactoring  
  - Backend & frontend development help  

- 💬 **General conversation support**  
  Can respond naturally to non-computer-science questions.

- ⚡ **Streaming responses**  
  Tokens stream live for a smooth, ChatGPT-like experience.

- 🌙 **Modern dark-mode UI**  
  - Markdown rendering  
  - Syntax highlighting  
  - Copy-to-clipboard for code blocks  
  - Smooth scrolling & typing indicators  

- 🔐 **Fully local & private**  
  Your prompts and responses never leave your machine.

---

## 🏗️ Tech Stack

- **LLM Runtime:** Ollama  
- **Base Model:** DeepSeek-Coder 6.7B  
- **Model Customization:** Ollama `Modelfile` (system prompt + parameters)  
- **Backend:** Node.js + Express  
- **Frontend:** Vanilla HTML, CSS, JavaScript  
- **Streaming:** Server-Sent Events (SSE)  
- **Syntax Highlighting:** highlight.js  
- **Markdown Parsing:** marked  

---