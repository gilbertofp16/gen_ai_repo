# Agentic Coding – Rules, Templates & Examples

This repository contains a curated collection of **coding rules**, **prompt templates**, **MCP server configurations**, and **examples** for working effectively with **Agentic Coding tools** such as [Cline](https://cline.bot), GitHub Copilot, and similar systems.

The goal is to provide a reusable, well-structured foundation that improves consistency, productivity, and prompt adherence when working in agent-driven coding environments

---

## Contents
- [Agentic Coding Tools](#gen_ai_repo-tools)  
- [MCP Servers](#mcp-servers)  
- [Rules](#rules)  
- [Patterns](#patterns)  
- [Links](#links)  
- [License](#license)  

---

## Agentic Coding Tools

- **[Cline](https://cline.bot)** – In my opinion, the most capable and flexible agentic coding tool currently available.

---

## MCP Servers

MCP servers extend the capabilities of agentic coding tools by integrating with APIs, documentation sources, and data pipelines.  
This repository includes two MCP server configuration sets:

### **1. Always-On MCP Servers**  
[Configuration file →](https://github.com/gilbertofp16/gen_ai_repo/blob/main/MCP/mcp-config-mvp.json)

- **[Context7](https://github.com/upstash/context7)** – Fetches documentation.  
- **[Fetch](https://github.com/modelcontextprotocol/servers/blob/main/src/fetch/README.md)** – Retrieves content from URLs.  
- **[Package Version](https://github.com/gilbertofp16/mcp-package-version)** – Fetches up-to-date package versions.  
- **[GitHub](https://github.com/modelcontextprotocol/servers/blob/main/src/github/README.md)** – Retrieves data from GitHub repositories, issues, and PRs.  

---

### **2. Sometimes-Used MCP Servers**  
[Configuration file →](https://github.com/gilbertofp16/gen_ai_repo/blob/main/MCP/mcp-config-sometimes.json)

- **[Firecrawl](https://github.com/mendableai/firecrawl-mcp-server)** – Web scraping + Markdown conversion (requires self-hosted Firecrawl or API key).  
- **[Markdownify](https://github.com/zcaceres/markdownify-mcp)** – Converts documents to Markdown.  
- **[Browser Use](https://github.com/Saik0s/mcp-browser-use)** – Browser automation and interaction.  
- **[SearXNG](https://github.com/ihor-sokoliuk/mcp-searxng)** – Web search via self-hosted SearXNG.  
- **[Magic MCP](https://github.com/21st-dev/magic-mcp)** – Generates frontend UI components.  

![MCP Servers Diagram](mcp-servers.png)

---

## Rules

I prefer to write rules in **pseudo-XML format**, as certain LLMs (such as Anthropic Claude) have been trained extensively on XML, which can improve prompt interpretation and compliance.

### **Cline Rule Sets**
- [**Cline Rules**](./Cline/Rules/) – Global rules applied across projects.  
- [**new-task-rules.md**](./Cline/Rules/new-task-rules.md) – Implements [Cline’s "new task tool"](https://docs.cline.bot/exploring-clines-tools/new-task-tool) for structured task handling.  
- [**cline-memory-bank.md**](./Cline/Rules/cline-memory-bank.md) – Adapted from [Cline’s memory bank documentation](https://docs.cline.bot/improving-your-prompting-skills/cline-memory-bank).  

#### **Repo-Specific Rules**
- [**mcp-server-development-rules.md**](./Cline/repo-specific-rules/mcp-server-development-rules.md) – Tailored for building new MCP servers. Based on and modified from [Cline’s guide](https://docs.cline.bot/mcp-servers/mcp-server-from-scratch).  
- [**mcp-server-repo-example.md**](./Cline/repo-specific-rules/mcp-server-repo-example.md) – For working with existing MCP server codebases.  

![Cline Rules Settings](clinerules-setting.png)

---

## Patterns

A simple, repeatable workflow structure:

**Setup → Plan → Act → Review & Iterate**

---

## License
This repository is licensed under the [Apache 2.0 License](./LICENSE).
