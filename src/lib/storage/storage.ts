const ALIAS_STORE_KEY = "aliases";
const SCHEMA_VERSION_KEY = "version";
const SCHEMA_VERSION = "1";

export interface Alias {
  name: string;
  link: string;
}

export function isAlias(alias: unknown): alias is Alias {
  return (
    typeof alias === "object" &&
    !!alias &&
    typeof (alias as Alias)["name"] === "string" &&
    typeof (alias as Alias)["link"] === "string"
  );
}

export function isAliasArray(aliases: unknown): aliases is Alias[] {
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

export function isAliasNameTaken(name: string, aliases: Alias[]) {
  return aliases.some(alias => alias.name === name);
}

export function isAliasValid(name: string, link: string) {
  return name.trim().length > 0 && link.trim().length > 0;
}

export async function saveAlias(name: string, link: string) {
  name = name.trim();
  link = link.trim();

  const aliases = await getAliases();
  if (isAliasNameTaken(name, aliases)) {
    throw new Error("Alias name is taken");
  }

  if (!isAliasValid(name, link)) {
    throw new Error("Alias name and link cannot be empty");
  }

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

export async function deleteAlias(alias: Alias) {
  const aliases = await getAliases();
  const updatedAliases = aliases.filter(
    ({ name, link }) => name !== alias.name || link !== alias.link
  );
  if (aliases.length !== updatedAliases.length) {
    saveAliases(updatedAliases);
  }
}
