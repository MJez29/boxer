export function getActiveTab(): Promise<chrome.tabs.Tab> {
  return new Promise((res, rej) => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      tabs => {
        if (tabs.length !== 1) {
          rej(new Error(`Expected 1 tab but got ${tabs.length}`));
        } else {
          res(tabs[0]);
        }
      }
    );
  });
}
