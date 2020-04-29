import { Alias, isAliasArray } from "@lib/aliases";
import { HttpError, ParseError } from "@lib/errors";

export function readFile(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = e => {
      if (e.target?.result) {
        if (typeof e.target.result === "string") {
          res(e.target.result);
        } else {
          const dec = new TextDecoder();
          res(dec.decode(e.target.result));
        }
      }
    };

    fr.onabort = () => {
      rej(new Error("Failed to upload file"));
    };

    fr.readAsText(file);
  });
}

export async function readFiles(files: File[]) {
  return await Promise.all(files.map(readFile));
}

export function getAliasesFromJson(json: any): Alias[] {
  let array: unknown[] | null = null;
  if (Array.isArray(json)) {
    array = json;
  } else if (Array.isArray(json.aliases)) {
    array = json.aliases;
  }

  if (array && isAliasArray(array)) {
    return array;
  }

  return [];
}

export function getAliasesFromString(data: string): Alias[] {
  try {
    const json = JSON.parse(data);
    return getAliasesFromJson(json);
  } catch (e) {}

  return [];
}

export async function getAliasesFromFiles(files: File[]): Promise<Alias[]> {
  const fileContents = await readFiles(files);
  return fileContents.reduce<Alias[]>((aggr, cur) => {
    aggr.push(...getAliasesFromString(cur));
    return aggr;
  }, []);
}

export async function getAliasesFromUrl(url: string): Promise<Alias[]> {
  let res: Response | undefined = undefined;
  try {
    res = await fetch(url);
    if (res.status < 200 || res.status >= 400) {
      throw null;
    }
  } catch {
    throw new HttpError(res ?? url);
  }
  let json;
  try {
    json = await res.json();
  } catch {
    throw new ParseError();
  }

  return getAliasesFromJson(json);
}
