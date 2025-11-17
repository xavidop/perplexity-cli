# Perplexity CLI

An interactive command-line chat tool that searches the web and generates AI-powered answers with sources, similar to Perplexity AI. Built with Node.js, Google Genkit (Gemini 2.5 Pro), and Tavily Search API.

## Features

- 🔍 Web search powered by Tavily API
- 🤖 AI-generated comprehensive answers using Google Genkit with Gemini 2.5 Pro
- 💬 Interactive chat mode with persistent conversation history
- 🛠️ AI agents with tool-calling capabilities
- 📚 Cited sources with URLs
- 🎨 Beautiful terminal output with colors and spinners
- ⚡ Fast and efficient

## Prerequisites

- Node.js 18 or higher
- Tavily API key (get it from [tavily.com](https://tavily.com))
- Google AI API key (get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

## Installation

1. Clone the repository or navigate to the project folder:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env` file:
```bash
touch .env
```

4. Add your API keys to the `.env` file:
```
TAVILY_API_KEY=your_tavily_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

## Usage

### Interactive Chat Mode:
```bash
node index.js
```

This starts an interactive chat session where you can:
- Ask multiple questions in sequence
- Maintain conversation context across questions
- Type `exit` or `quit` to leave
- Press `Ctrl+C` to exit

### Example Session:
```
💬 Ask a question (or type "exit" to quit): What is quantum computing?
✓ Response generated

[AI responds with detailed answer using web search results]

💬 Ask a question (or type "exit" to quit): How does it differ from classical computing?
✓ Response generated

[AI continues the conversation with context from previous question]
```

## How It Works

1. **Interactive Session**: The CLI starts an interactive chat session with persistent conversation history
2. **Query Processing**: When you ask a question, the AI agent analyzes if it needs current web information
3. **Tool Calling**: If needed, the AI agent calls the web search tool using Tavily's API
4. **Search**: Tavily searches the web for relevant, up-to-date information
5. **Generate**: Google Genkit with Gemini 2.5 Pro analyzes the search results and conversation context to generate a comprehensive answer
6. **Display**: The answer is displayed in the terminal with proper formatting

## Project Structure

```
project/
├── index.js              # Main entry point with interactive chat interface
├── src/
│   ├── search.js        # Tavily search integration
│   └── agent.js         # Genkit AI agent with tool definitions
├── package.json
├── .env                 # Environment variables (create this)
└── README.md
```

## Example Output

```
╔════════════════════════════════════════════════════╗
║   Welcome to Perplexity CLI - Interactive Mode     ║
╚════════════════════════════════════════════════════╝
Type your questions and get AI-powered answers with sources!
Chat history is maintained during this session.
Commands: exit, quit, or press Ctrl+C to leave

💬 Ask a question (or type "exit" to quit): What is quantum computing?
✓ Response generated

Quantum computing is a revolutionary approach to computation that leverages 
the principles of quantum mechanics. Unlike classical computers that use bits 
(0s and 1s), quantum computers use quantum bits or "qubits" that can exist 
in multiple states simultaneously...

[Sources and citations included in the response]

💬 Ask a question (or type "exit" to quit):
```

## API Keys

### Tavily API
- Sign up at [tavily.com](https://tavily.com)
- Get your API key from the dashboard
- Free tier includes 1,000 searches per month

### Google AI API
- Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key
- Free tier available with rate limits

## Troubleshooting

**Error: TAVILY_API_KEY is not set**
- Make sure you've created a `.env` file with your Tavily API key

**Error: GOOGLE_API_KEY is not set**
- Make sure you've added your Google AI API key to the `.env` file

**Module not found errors**
- Run `npm install` to install all dependencies

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Google Genkit](https://firebase.google.com/docs/genkit) - AI framework for building AI-powered apps with tool-calling capabilities
- [Gemini 2.5 Pro](https://ai.google.dev/) - Google's advanced AI model
- [Tavily API](https://tavily.com) - Web search API optimized for AI applications
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [Ora](https://github.com/sindresorhus/ora) - Terminal spinners
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- [Zod](https://github.com/colinhacks/zod) - Schema validation for tool definitions

## License

MIT
