import { Alias } from "./storage";

function matches(full: string, search: string) {
  return full.startsWith(search);
}

function aliasToSuggestResult(
  { link, name }: Alias,
  input = ""
): chrome.omnibox.SuggestResult {
  return {
    content: name,
    description: `<match>${input}</match>${name.substr(
      input.length
    )} - <url>${link}</url>`
  };
}

export function getSuggestions(
  input: string,
  aliases: Alias[]
): chrome.omnibox.SuggestResult[] {
  return aliases
    .filter(a => matches(a.name, input))
    .map(alias => aliasToSuggestResult(alias, input));
}

export function getBestSuggestion(
  input: string,
  options: chrome.omnibox.SuggestResult[]
) {
  const index = options.findIndex(opt => matches(opt.content, input));
  return options[Math.max(index, 0)];
}
