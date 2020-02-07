import { getSuggestions, getBestSuggestion } from "./getSuggestions";

chrome.omnibox.setDefaultSuggestion({
  description: "Boxer"
});

const options = [
  {
    content: "https://github.com/MJez29",
    description: "github"
  }
];

chrome.omnibox.onInputChanged.addListener((input, suggest) => {
  suggest(getSuggestions(input, options));
});

chrome.omnibox.onInputEntered.addListener((url, disposition) => {
  if (!url.startsWith("http")) {
    url = getBestSuggestion(url, options).content;
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
