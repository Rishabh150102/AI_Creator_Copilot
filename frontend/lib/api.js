const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, queryKey, queryValue) {
  const params = new URLSearchParams({ [queryKey]: queryValue });
  const response = await fetch(`${API_BASE_URL}${path}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed.");
  }

  return response.json();
}

export function fetchVideoIdeas(niche) {
  return request("/generate-ideas", "niche", niche);
}

export function fetchHooksAndTitles(topic) {
  return request("/generate-hooks-titles", "topic", topic);
}

export function fetchScript(topic) {
  return request("/generate-script", "topic", topic);
}
