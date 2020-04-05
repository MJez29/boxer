function reloadExtension(id) {
  return new Promise(resolve => {
    chrome.management.setEnabled(id, false, (...args) => {
      console.log("setEnabled false", ...args);
      chrome.management.setEnabled(id, true, (...args) => {
        console.log("setEnabled true", ...args);
        resolve();
      });
    });
  });
}

function openPage(id, pageToOpen) {
  return new Promise(resolve => {
    chrome.tabs.create(
      {
        url: `chrome-extension://${id}/${pageToOpen}`
      },
      (...args) => {
        console.log("create", ...args);
        resolve();
      }
    );
  });
}

const reloadSocket = new WebSocket("ws://localhost:8081");

reloadSocket.onopen = () => {
  console.log("Reload socket connected!");
};

reloadSocket.onmessage = event => {
  try {
    const data = JSON.parse(event.data);
    const extName = data.extensionName;
    const pageToOpen = data.pageToOpen;

    chrome.management.getAll(extensions => {
      extensions.forEach(async ext => {
        if (
          ext.installType === "development" &&
          ext.type === "extension" &&
          ext.name === extName
        ) {
          await reloadExtension(ext.id);
          if (pageToOpen) {
            await openPage(ext.id, pageToOpen);
          }
        }
      });
    });
  } catch {}
};
