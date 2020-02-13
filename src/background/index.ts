import { getSuggestions, getBestSuggestion } from "../lib/suggestions";
import { validateStorage, Alias, getAliases } from "../lib/storage";

chrome.omnibox.setDefaultSuggestion({
  description: "Boxer"
});

let cachedAliases: Alias[] = [];

chrome.omnibox.onInputStarted.addListener(async () => {
  cachedAliases = await getAliases();
  console.log("onInputStarted", cachedAliases);
});

chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  console.log("onInputChanged", cachedAliases);
  suggest(getSuggestions(input, cachedAliases));
});

chrome.omnibox.onInputEntered.addListener((url, disposition) => {
  if (!url.startsWith("http")) {
    url = getBestSuggestion(url, []).content;
  }

  switch (disposition) {
    case "currentTab":
      chrome.tabs.update({ url });
      break;
    case "newForegroundTab":
      chrome.tabs.create({ url });
      break;
    case "newBackgroundTab":
      chrome.tabs.create({ url, active: false });
      break;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  validateStorage();
});
