import { Alias } from "./storage";

export function download(name: string, content: string) {
  const blob = new Blob([content], { type: "text/json" });
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, name);
  } else {
    const el = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    el.href = url;
    el.download = name;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
    window.URL.revokeObjectURL(url);
  }
}

export function downloadAliases(aliases: Alias[]) {
  download(
    "boxer-aliases.json",
    JSON.stringify({
      aliases
    })
  );
}
