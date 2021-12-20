const URL = "https://api.spaceflightnewsapi.net/v3/articles";

async function fetchArticles(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function fetchArticlesByValue(searchValue) {
  return fetchArticles(
    `${URL}?title_contains=${searchValue}&summary_contains=${searchValue}`
  );
}
export function fetchArticleDetails(articleId) {
  return fetchArticles(`${URL}/${articleId}`);
}
