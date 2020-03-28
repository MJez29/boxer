import { Alias, isAlias, isAliasArray, areAliasesEqual } from "@lib/aliases";

const ALIAS_STORE_KEY = "aliases";
const SCHEMA_VERSION_KEY = "version";
const SCHEMA_VERSION = "1";

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

export async function getAliasesByLink(link: string): Promise<Alias[]> {
  const aliases = await getAliases();
  return aliases.filter(alias => alias.link === link);
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
  name = name.trim().toLowerCase();
  link = link.trim().toLowerCase();

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

export async function replaceAlias(oldAlias: Alias, newAlias: Alias) {
  await deleteAlias(oldAlias);
  await saveAlias(newAlias.name, newAlias.link);
}

export async function mergeAliases(newAliases: Alias[]) {
  const existingAliases = await getAliases();
  newAliases.forEach(n => {
    if (!existingAliases.find(e => e.name === n.name)) {
      existingAliases.push(n);
    }
  });
  await saveAliases(existingAliases);
}

export async function searchAliases(query: string) {
  query = query.trim().toLowerCase();
  const aliases = await getAliases();
  return aliases.filter(
    ({ name, link }) => name.includes(query) || link.includes(query)
  );
}

export async function deleteAliases(aliasesToDelete: Alias[]) {
  const aliases = await getAliases();
  const newAliases = aliases.filter(
    alias =>
      !aliasesToDelete.find(aliasToDelete =>
        areAliasesEqual(alias, aliasToDelete)
      )
  );

  return await saveAliases(newAliases);
}

export async function deleteAllAliases() {
  return await saveAliases([]);
}
