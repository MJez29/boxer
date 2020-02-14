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
  console.log(input, aliases);
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

export function getDestinationUrl(input: string, aliases: Alias[]): string {
  if (input === "") {
    return chrome.extension.getURL("options.html");
  }

  for (const alias of aliases) {
    if (input === alias.name) {
      return alias.link;
    }
  }

  return "wip";
}
