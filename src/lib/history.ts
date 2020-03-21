import { Alias, getNameSuggestion } from "./aliases";
import { requestPermission, removePermission } from "./permissions";

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export function getHistory(): Promise<chrome.history.HistoryItem[]> {
  return new Promise(resolve => {
    chrome.history.search(
      {
        text: "",
        maxResults: 10000,
        startTime: new Date().getTime() - ONE_WEEK
      },
      results => {
        resolve(results);
      }
    );
  });
}

export async function getAliasesFromHistory(): Promise<Alias[]> {
  await requestPermission("history");
  const history = await getHistory();
  try {
    await removePermission("history");
  } catch {}
  return history
    .filter(h => (h.visitCount ?? 0) > 10)
    .map(h => ({ name: getNameSuggestion(h), link: h.url ?? "" }));
}
