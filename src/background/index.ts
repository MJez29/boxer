import { getSuggestions, getDestinationUrl } from "../lib/suggestions";
import { validateStorage, Alias, getAliases } from "../lib/storage";

chrome.omnibox.setDefaultSuggestion({
  description: "Boxer"
});

let cachedAliases: Alias[] = [];

// Fetch aliases on script load so that the cache is non-empty by the time they focus the omnibox
getAliases().then(aliases => (cachedAliases = aliases));

chrome.omnibox.onInputStarted.addListener(async () => {
  // Refresh the cache. Note the cache won't be update by the time the first
  // onInputChanged event is fired.
  cachedAliases = await getAliases();
});

chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  suggest(getSuggestions(input, cachedAliases));
});

chrome.omnibox.onInputEntered.addListener((input, disposition) => {
  const url = getDestinationUrl(input, cachedAliases);

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
