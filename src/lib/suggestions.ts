import { Alias } from "./aliases";
import * as Fuse from "fuse.js";
import { escapeXML } from "./xml";

function matches(full: string, search: string) {
  return full.startsWith(search);
}

function aliasToSuggestResult(
  { link, name }: Alias,
  input = ""
): chrome.omnibox.SuggestResult {
  return {
    content: name,
    description: `${name.replace(
      new RegExp(input),
      "<match>$&</match>"
    )} - <url>${escapeXML(link)}</url>`
  };
}

export function getSuggestions(
  input: string,
  aliases: Alias[]
): chrome.omnibox.SuggestResult[] {
  const fuse = new Fuse(aliases, {
    keys: ["name", "link"]
  });

  return fuse.search(input).map(alias => aliasToSuggestResult(alias, input));
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
    return chrome.extension.getURL("aliases.html");
  }

  const fuse = new Fuse(aliases, {
    keys: ["name", "link"]
  });

  const results = fuse.search(input);

  if (results.length > 0) {
    return results[0].link;
  }

  return chrome.extension.getURL("aliases.html");
}
