#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import dotenv from 'dotenv';
import readline from 'readline';
import { createChatAgent } from './src/agent.js';
import { genkit } from 'genkit/beta';
import { googleAI } from '@genkit-ai/googleai';
import { tavily } from '@tavily/core';

// Load environment variables
dotenv.config();

// Interactive mode with persistent chat sessions
async function startInteractive() {
  try {
    const TavilyApiKey = process.env.TAVILY_API_KEY;
    if (!TavilyApiKey) {
      throw new Error('TAVILY_API_KEY is not set in environment variables');
    }
    
    const GeminiApiKey = process.env.GOOGLE_API_KEY;
    if (!GeminiApiKey) {
      throw new Error('GOOGLE_API_KEY is not set in environment variables');
    }
    
    const client = tavily({ apiKey: TavilyApiKey });
    const ai = genkit({
      plugins: [googleAI({ apiKey: GeminiApiKey })],
    });
    
    // Create chat agent with search capabilities
    const chat = createChatAgent(ai, client,  googleAI.model('gemini-2.5-pro'));
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.green.bold('\n💬 Ask a question (or type "exit" to quit): '),
      terminal: true
    });
    
    console.log(chalk.cyan.bold('\n╔════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold('║   Welcome to Perplexity CLI - Interactive Mode     ║'));
    console.log(chalk.cyan.bold('╚════════════════════════════════════════════════════╝'));
    console.log(chalk.gray('Type your questions and get AI-powered answers with sources!'));
    console.log(chalk.gray('Chat history is maintained during this session.'));
    console.log(chalk.gray('Commands: exit, quit, or press Ctrl+C to leave\n'));
    
    rl.prompt();
    
    rl.on('line', async (line) => {
      const query = line.trim();
      
      if (!query) {
        rl.prompt();
        return;
      }
      
      if (query.toLowerCase() === 'exit' || query.toLowerCase() === 'quit') {
        rl.close();
        return;
      }
      
      // Pause the interface during async operation to prevent issues
      rl.pause();
      
      let spinner;
      try {
        spinner = ora('Thinking...').start();
        
        // Send message to chat (which may trigger tool calls)
        const { text } = await chat.send(query);
        
        spinner.succeed('Response generated');
        
        // Display the answer
        console.log(chalk.white('\n' + text + '\n'));
        
      } catch (error) {
        if (spinner) spinner.fail('Error occurred');
        console.error(chalk.red('\n❌ Error:'), error.message);
      } finally {
        // Resume and show prompt again to continue the conversation
        rl.resume();
        rl.prompt();
      }
    });
    
    rl.on('close', () => {
      console.log(chalk.cyan.bold('\n👋 Thanks for using Perplexity CLI. Goodbye!\n'));
      process.exit(0);
    });
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    
    if (error.message.includes('TAVILY_API_KEY')) {
      console.log(chalk.yellow('\n💡 Tip: Make sure to set your TAVILY_API_KEY in the .env file'));
    }
    if (error.message.includes('GOOGLE_API_KEY')) {
      console.log(chalk.yellow('\n💡 Tip: Make sure to set your GOOGLE_API_KEY in the .env file'));
    }
    
    process.exit(1);
  }
}

// Start interactive mode
startInteractive();
