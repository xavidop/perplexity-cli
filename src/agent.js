import { z } from 'zod';
import { searchWeb } from './search.js';

/**
 * Create a search tool definition for the chat agent
 * @param {Object} ai - Genkit AI instance
 * @param {Object} client - Tavily client instance
 * @returns {Object} Tool definition
 */
export function createSearchTool(ai, client) {
  return ai.defineTool(
    {
      name: 'searchWeb',
      description: 'Search the web for current information to answer user queries. Use this when you need up-to-date or factual information.',
      inputSchema: z.object({
        query: z.string().describe('The search query to look up'),
      }),
      outputSchema: z.string().describe('Search results with titles, URLs, and content'),
    },
      async (input) => {
        const searchResults = await searchWeb(client, input.query, 5);
  
        // Format search results for the model
        const formattedResults = searchResults.results
          .map((result, index) => {
            return `[${index + 1}] ${result.title}\nURL: ${result.url}\nContent: ${result.content}\n`;
          })
          .join('\n');
        
        return formattedResults;
      }
  );
}


/**
 * Create a chat agent with web search capabilities
 * @param {Object} ai - Genkit AI instance
 * @param {Object} client - Tavily client instance
 * @param {Object} model - AI model to use for the chat agent
 * @returns {Object} Chat instance with search capabilities
 */
export function createChatAgent(ai, client, model) {
  // Define the search tool
  const searchTool = createSearchTool(ai, client);

  const searchPrompt = ai.definePrompt({
    name: 'searchPrompt',
    description: 'Tool that searches the web to answer user queries based on current information.',
    model: model,
    input: {
      schema: z.object({
        query: z.string().describe('The user query to be answered using web search results'),
      }),
    },
    tools: [searchTool],
    prompt: `You are a helpful AI assistant that provides comprehensive and accurate answers based on web search results.

User Query: {{query}}

Instructions:
1. Provide a comprehensive answer to the user's query based on the search results above
2. Synthesize information from multiple sources when relevant
3. Be factual and cite specific sources using [1], [2], etc. notation
4. If the search results don't contain enough information, acknowledge this
5. Keep the answer clear and well-structured
6. Use markdown formatting for better readability
7. Please use the tool searchPrompt always when you need to look up current information
8. Add a section at the end titled "Sources" listing the URLs of the references used

Answer:`,
  });
  
  // Return chat session with in-memory persistence
  return ai.chat(searchPrompt);
}
