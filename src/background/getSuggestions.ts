function matches(full: string, search: string) {
  return full.startsWith(search);
}

export function getSuggestions(
  input: string,
  options: chrome.omnibox.SuggestResult[]
) {
  return options.filter(opt => matches(opt.description, input));
}

export function getBestSuggestion(
  input: string,
  options: chrome.omnibox.SuggestResult[]
) {
  const index = options.findIndex(opt => matches(opt.content, input));
  return options[Math.max(index, 0)];
}
