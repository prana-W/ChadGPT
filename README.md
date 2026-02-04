# ChadGPT

**ChadGPT** is a modern, **local-first chatbot** powered by **Ollama** and a **custom-modified DeepSeek-Coder 6.7B parameter LLM**. It is designed primarily for **programming assistance**, while still being capable of answering general non-technical questions.

- No cloud APIs.  
- No API keys.  
- Runs fully on your machine.

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** v18 or newer  
- **Ollama** installed and available in your PATH  

Install Ollama from:  
https://ollama.com

Verify installation:
```bash
ollama --version
```

---

## 📦 Installation

```bash
git clone https://github.com/prana-W/ChadGPT.git
cd chadgpt
npm install
```

---

## 🔁 Change the Base Model (Optional)

By default, ChadGPT uses **DeepSeek-Coder 6.7B** as the base model.

```js
// Change this to any base model of your choice
export const BASE_MODEL = "deepseek-coder:6.7b";
```

### Edit via terminal
```bash
nano constants.js
```

or
```bash
vim constants.js
```

Example change:
```js
export const BASE_MODEL = "llama3.1:8b";
```

After editing, restart:
```bash
npm start
```

---

## ▶️ Running ChadGPT

```bash
npm start
```

Open file:
```
index.html
```

---

## ⏹️ Stopping ChadGPT

Stop server:
```
Ctrl + C
```

Unload model:
```bash
npm stop
```

---

## ✨ Features

- Customizable base model
- Code-first intelligence
- Streaming responses
- Modern dark UI
- Fully local & private

---

## 🏗️ Tech Stack

- Ollama
- Node.js + Express
- Vanilla HTML/CSS/JS
- SSE Streaming
- 
---
