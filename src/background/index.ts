import { getSuggestions, getBestSuggestion } from "./getSuggestions";

chrome.omnibox.setDefaultSuggestion({
  description: "Boxer"
});

console.log(chrome);

chrome.storage.local.set({
  options: [
    {
      content: "https://github.com/MJez29",
      description: "github"
    }
  ]
});

chrome.omnibox.onInputChanged.addListener((input, suggest) => {
  chrome.storage.local.get("options", results => {
    console.log(results);
    if (results.options) {
      suggest(
        getSuggestions(input, results.options as chrome.omnibox.SuggestResult[])
      );
    } else {
      suggest([]);
    }
  });
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
