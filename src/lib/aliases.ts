import { getAliases } from "./storage";

export interface Alias {
  name: string;
  link: string;
}

export function areAliasesEqual(a1: Alias, a2: Alias) {
  return a1.name === a2.name && a1.link === a2.link;
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

export function formatAsName(s: string) {
  let name = s
    .replace(/\W/g, " ")
    .replace(/ ( )+/g, " ")
    .toLowerCase()
    .trim();

  const splitSet = new Set(name.split(" "));
  name = "";
  splitSet.forEach(value => {
    value = value.trim();
    if (value.length > 0) {
      name += value + " ";
    }
  });

  return name.trim();
}

export function getNameSuggestion({
  url: urlString,
  title
}: {
  url?: string;
  title?: string;
}) {
  if (!urlString || !title) {
    return "";
  }

  let name = "";

  const url = new URL(urlString);

  const hostnameStrings = url.hostname.split(".");

  for (let i = hostnameStrings.length - 2; i >= 0; --i) {
    if (!hostnameStrings[i].startsWith("www")) {
      name += hostnameStrings[i] + " ";
    }
  }

  name += title;

  return formatAsName(name);
}

export async function filterOutExistingAliases(aliases: Alias[]) {
  const existingAliases = await getAliases();
  const links = new Set();
  existingAliases.forEach(alias => links.add(alias.link));

  return aliases.filter(alias => !links.has(alias.link));
}
