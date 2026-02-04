import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { BASE_MODEL, WRAPPER_MODEL } from "./constants.js";
import { generateModelfile } from "./modelfile.template.js";

const MODELFILE_PATH = path.resolve("Modelfile");

/* ------------------------- helpers ------------------------- */

function commandExists(cmd) {
    try {
        execSync(`command -v ${cmd}`, { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

function isModelInstalled(model) {
    try {
        const out = execSync("ollama list", { encoding: "utf8" });
        return out.includes(model);
    } catch {
        return false;
    }
}

/* ------------------------- core logic ------------------------- */

export function pullBaseModelIfNeeded() {
    if (isModelInstalled(BASE_MODEL)) {
        console.log(`✔ Base model already installed: ${BASE_MODEL}`);
        return;
    }

    console.log(`⬇ Pulling base model: ${BASE_MODEL}`);
    execSync(`ollama pull ${BASE_MODEL}`, { stdio: "inherit" });
}

export function createWrapperModel() {
    console.log("🧱 Generating Modelfile...");
    fs.writeFileSync(
        MODELFILE_PATH,
        generateModelfile(BASE_MODEL),
        "utf8"
    );

    console.log(`🤖 Creating wrapper model: ${WRAPPER_MODEL}`);
    execSync(
        `ollama create ${WRAPPER_MODEL} -f ${MODELFILE_PATH}`,
        { stdio: "inherit" }
    );
}

let ollamaProcess = null;

export function startOllamaServer() {
    console.log("🚀 Ensuring Ollama server is running...");

    try {
        execSync("ollama ps", { stdio: "ignore" });
        console.log("✔ Ollama server already running");
        return;
    } catch {
        // not running → start it
    }

    spawn("ollama", ["serve"], {
        stdio: "inherit",
        detached: true
    }).unref();
}

export function stopAllOllamaModels() {
    console.log("🛑 Stopping Ollama model...");

    try {
        execSync(`ollama stop ${WRAPPER_MODEL}`, { stdio: "inherit" });
        console.log(`✔ Stopped model: ${WRAPPER_MODEL}`);
    } catch {
        console.log(`ℹ Model not running: ${WRAPPER_MODEL}`);
    }
}


/* ------------------------- one-shot runner ------------------------- */

export function setupAndStart() {
    pullBaseModelIfNeeded();
    createWrapperModel();
    startOllamaServer();
}
