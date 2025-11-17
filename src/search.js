/**
 * Search the web using Tavily API
 * @param {string} query - The search query
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Object>} Search results with sources
 */
export async function searchWeb(client, query, maxResults = 5) {

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
    throw new Error(`Tavily search failed: ${error.message}`);
  }
}
