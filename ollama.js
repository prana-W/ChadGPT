import {
    setupAndStart,
    stopAllOllamaModels
} from "./ollama-core.js";

const cmd = process.argv[2];

switch (cmd) {
    case "start":
        setupAndStart();
        break;
    case "stop":
        stopAllOllamaModels();
        break;
    default:
        console.log(`
Usage:
  npm run ollama:start
  npm run ollama:stop
`);
}
