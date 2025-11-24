import type { TavilyClient, TavilySearchResponse } from '@tavily/core';

/**
 * Search the web using Tavily API
 * @param client - Tavily client instance
 * @param query - The search query
 * @param maxResults - Maximum number of results to return
 * @returns Search results with sources
 */
export async function searchWeb(
  client: TavilyClient,
  query: string,
  maxResults: number = 5
): Promise<TavilySearchResponse> {
  try {
    const response = await client.search(query, {
      searchDepth: 'advanced',
      maxResults: maxResults,
      includeAnswer: true,
      includeRawContent: false,
      includeImages: false,
    });

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Tavily search failed: ${errorMessage}`);
  }
}
