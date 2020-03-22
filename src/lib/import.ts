import { mergeAliases } from "./storage";
import { Alias, isAliasArray } from "@lib/aliases";

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

export function parseAliasesFromFile(data: string): Alias[] {
  try {
    const json = JSON.parse(data);
    let array: unknown[] | null = null;
    if (Array.isArray(json)) {
      array = json;
    } else if (Array.isArray(json.aliases)) {
      array = json.aliases;
    }

    if (array && isAliasArray(array)) {
      return array;
    }
  } catch (e) {}

  return [];
}

export async function getAliasesFromFiles(files: FileList): Promise<Alias[]> {
  const fileArray = Array.from(files);
  const fileContents = await readFiles(fileArray);
  return fileContents.reduce<Alias[]>((aggr, cur) => {
    aggr.push(...parseAliasesFromFile(cur));
    return aggr;
  }, []);
}
