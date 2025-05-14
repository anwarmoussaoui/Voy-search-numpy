# VoySearch Polyglot WebAssembly Example

This project demonstrates a polyglot Java application using **GraalVM**, **JavaScript**, and **WebAssembly (WASM)** to perform keyword-based semantic search over scraped HTML content from the official Python documentation.

The application:
- Scrapes mathematical constants and functions from [Python’s math module documentation](https://docs.python.org/3/library/math.html)
- Processes the data using a WebAssembly-based search engine
- Accepts a user query and returns the most relevant text chunks in batches

---

## 🛠️ Features

- ✅ Web scraping with [JSoup](https://jsoup.org/)
- ✅ JavaScript and WebAssembly execution using [GraalVM Polyglot](https://www.graalvm.org/)
- ✅ Chunked semantic search with user interaction
- ✅ Uses a `.wasm` module (`voy_search_bg.wasm`) and a JavaScript wrapper (`voy.js`)

---

## 📦 Requirements

- Java 23
- [GraalVM (Community or Enterprise)](https://www.graalvm.org/downloads/)
- Maven (optional for dependency management)
- Internet connection (to fetch the documentation)
- WASM & JS files:
    - `voy_search_bg.wasm`
    - `voy.js` (ES module compatible wrapper)

---

## 📁 Project Structure

