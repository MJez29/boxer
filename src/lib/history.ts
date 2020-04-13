import { Alias, getNameSuggestion, filterOutExistingAliases } from "./aliases";
import { requestPermission, removePermission } from "./permissions";
import { isAliasValid } from "./storage";

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
  const { aliases } = history
    .filter(h => (h.visitCount ?? 0) > 10)
    .reduce(
      (state, historyItem) => {
        const name = getNameSuggestion(historyItem);
        const link = historyItem.url ?? "";

        if (isAliasValid(name, link) && !state.names.has(name)) {
          state.aliases.push({
            name,
            link
          });
          state.names.add(name);
          state.links.add(link);
        }

        return state;
      },
      {
        aliases: [] as Alias[],
        names: new Set(),
        links: new Set()
      }
    );

  return filterOutExistingAliases(aliases);
}
