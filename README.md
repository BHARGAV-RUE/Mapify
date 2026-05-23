# 🧭 Mapify

> Transform your codebase into a clean, semantic architecture map.

Mapify is a powerful VS Code extension that converts complex project structures into readable, architecture-aware project maps with intelligent semantic labels.

Instead of showing only raw folders and files, Mapify understands common software architecture patterns and explains the purpose of directories inside your codebase.

Perfect for:
- 🤖 AI prompts
- 📚 Documentation
- 🏗️ Architecture understanding
- 👥 Team onboarding
- 🚀 Developer productivity
- 🌳 Codebase exploration

---

# ✨ Features

## 🧠 Semantic Codebase Understanding

Mapify doesn't just print folders.

It recognizes architectural patterns like:

```txt
controllers/   ← request handlers
services/      ← business logic
components/    ← UI components
hooks/         ← React hooks
repositories/  ← data access
auth/          ← authentication
```

It transforms raw filesystem structures into understandable software architecture.

---

## 🌳 Beautiful ASCII Tree Generation

Generate clean project maps instantly.

Example:

```txt
my-app/  [next.js app]
├── app/  ← pages / views
├── components/  ← UI components
├── hooks/  ← React hooks
├── lib/  ← utilities
├── services/  ← business logic
├── prisma/  ← ORM layer
├── public/  ← static assets
├── styles/  ← styles
├── package.json
└── tsconfig.json

8 directories, 12 files
Project type: next.js app
```

---

## ⚡ AI-Friendly Context Export

Mapify is designed for the AI era.

Instantly generate structured codebase context for tools like:
- ChatGPT
- Claude
- GitHub Copilot
- Cursor
- Windsurf

Instead of manually explaining your project architecture, Mapify generates a clean project overview automatically.

---

## 🧩 Project Type Detection

Mapify intelligently detects technologies based on known project files.

| File Detected | Project Type |
|---|---|
| `package.json` | Node project |
| `pom.xml` | Java / Maven |
| `requirements.txt` | Python project |
| `go.mod` | Go module |
| `schema.prisma` | Prisma ORM |
| `next.config.js` | Next.js app |
| `docker-compose.yml` | Docker services |
| `main.tf` | Terraform |
| `manage.py` | Django app |

And many more.

---

## 🚀 Explorer Integration

Generate maps directly from the VS Code Explorer.

### Right-click any folder:

```txt
Mapify: Generate Map from Here
```

Or use:

```txt
Ctrl + Shift + P
→ Mapify: Generate Project Map
```

---

# 📦 Installation

## From VS Code Marketplace

Search for:

```txt
Mapify
```

Or install directly from the marketplace.

---

# 🛠️ Usage

## Generate Full Workspace Map

1. Open your project in VS Code
2. Open Command Palette:

```txt
Ctrl + Shift + P
```

3. Run:

```txt
Mapify: Generate Project Map
```

---

## Generate Map From Specific Folder

1. Open Explorer
2. Right-click any folder
3. Select:

```txt
Mapify: Generate Map from Here
```

---

# ⚙️ Extension Settings

Mapify provides several configurable options.

## `mapify.maxDepth`

Controls maximum folder depth displayed.

```json
"mapify.maxDepth": 4
```

---

## `mapify.showSemanticLabels`

Enable or disable semantic folder labels.

```json
"mapify.showSemanticLabels": true
```

---

## `mapify.copyToClipboard`

Automatically copy generated map to clipboard.

```json
"mapify.copyToClipboard": true
```

---

# 🧠 Semantic Label System

Mapify recognizes many common architectural conventions.

## Frontend

| Folder | Meaning |
|---|---|
| `components` | UI components |
| `hooks` | React hooks |
| `pages` | Pages / views |
| `styles` | Styling |
| `assets` | Static assets |

---

## Backend

| Folder | Meaning |
|---|---|
| `controllers` | Request handlers |
| `services` | Business logic |
| `repositories` | Data access |
| `middleware` | Middleware |
| `graphql` | GraphQL layer |

---

## Database

| Folder | Meaning |
|---|---|
| `migrations` | DB migrations |
| `seeds` | Seed data |
| `prisma` | ORM layer |

---

## Infrastructure

| Folder | Meaning |
|---|---|
| `docker` | Containers |
| `infra` | Infrastructure |
| `deploy` | Deployment |
| `config` | Configuration |

---

# 🚫 Smart Ignore System

Mapify automatically ignores unnecessary folders and generated artifacts.

Examples:

```txt
node_modules
.git
dist
build
coverage
.cache
.next
target
venv
```

This keeps output clean and focused.

---

# 💡 Why Mapify?

Modern codebases are huge.

Understanding architecture quickly has become difficult.

Mapify helps developers:
- understand unfamiliar projects,
- visualize structure,
- explain architecture,
- generate AI context,
- improve onboarding,
- create documentation faster.

Instead of reading hundreds of folders manually, Mapify gives you a clean architectural overview instantly.

---

# 🔥 Example Use Cases

## 🤖 AI Prompting

Paste generated project maps into AI tools for better coding assistance.

---

## 👥 Team Onboarding

Help new developers understand project architecture quickly.

---

## 🌍 Open Source Projects

Improve contributor experience by exposing project structure clearly.

---

## 📚 Documentation

Generate architecture trees for README files and docs.

---

## 🏢 Large Monorepos

Understand complex repositories faster.

---

# 🏗️ Architecture

Mapify is built around three core systems:

```txt
extension.js   → VS Code integration
tree.js        → recursive tree generation
semantics.js   → semantic architecture understanding
```

---

# 🚀 Roadmap

Planned future features:

- AI architecture summaries
- Dependency analysis
- Visual graph mode
- Token-aware AI export
- Interactive tree viewer
- Smart importance ranking
- Monorepo understanding
- Architecture diagrams
- Markdown export
- JSON export
- AI context compression

---

# 🧪 Local Development

## Clone Repository

```bash
git clone https://github.com/BHARGAV-RUE/Mapify.git
cd Mapify
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Extension

Press:

```txt
F5
```

This launches the VS Code Extension Development Host.

---

# 📄 Example Output

```txt
backend/  [java / maven]
├── controllers/  ← request handlers
├── services/  ← business logic
├── repositories/  ← data access
├── auth/  ← auth
├── config/  ← config
├── migrations/  ← DB migrations
├── pom.xml
└── application.yml

6 directories, 8 files
Project type: java / maven
```

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

Feel free to:
- open issues,
- suggest features,
- improve semantic detection,
- add new architecture patterns,
- optimize performance.

---

# 📜 License

MIT License

---

# ⭐ Support

If you like Mapify:
- ⭐ Star the repository
- 🚀 Share it with developers
- 🧠 Use it in your workflow
- 🤝 Contribute new ideas

---

# 🧭 Mapify

> Understand your codebase at a glance.