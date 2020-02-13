const ALIAS_STORE_KEY = "aliases";
const SCHEMA_VERSION_KEY = "version";
const SCHEMA_VERSION = "1";

export interface Alias {
  name: string;
  link: string;
}

function isAlias(alias: unknown): alias is Alias {
  return (
    typeof alias === "object" &&
    !!alias &&
    typeof (alias as Alias)["name"] === "string" &&
    typeof (alias as Alias)["link"] === "string"
  );
}

function isAliasArray(aliases: unknown): aliases is Alias[] {
  return Array.isArray(aliases) && aliases.every(isAlias);
}

export function getAliases(): Promise<Alias[]> {
  const promise = new Promise<Alias[]>((resolve, reject) => {
    chrome.storage.local.get(ALIAS_STORE_KEY, items => {
      const aliases = items[ALIAS_STORE_KEY];
      if (isAliasArray(aliases)) {
        resolve(aliases);
      } else {
        reject("aliases not in items");
      }
    });
  });

  return promise;
}

export function saveAliases(aliases: Alias[]) {
  return new Promise<void>(resolve => {
    chrome.storage.local.set(
      {
        [ALIAS_STORE_KEY]: aliases
      },
      () => {
        resolve();
      }
    );
  });
}

export async function saveAlias(name: string, link: string) {
  const aliases = await getAliases();
  aliases.push({
    name,
    link
  });
  return saveAliases(aliases);
}

export function validateStorage(): Promise<void> {
  const promise = new Promise<void>((resolve, reject) => {
    chrome.storage.local.get(null, async items => {
      if (!(ALIAS_STORE_KEY in items)) {
        await saveAliases([]);
      } else {
        const aliases = items[ALIAS_STORE_KEY];
        if (!isAliasArray(aliases)) {
          reject(new Error("Aliases is not an array"));
          return;
        }
      }

      resolve();
    });
  });

  return promise;
}
