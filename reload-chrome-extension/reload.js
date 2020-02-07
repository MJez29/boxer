function reloadExtension(id) {
  chrome.management.setEnabled(id, false, () => {
    console.log(`Disabling ${id}`);
    chrome.management.setEnabled(id, true, () => {
      console.log(`Enabling ${id}`);
    });
  });
}

const reloadSocket = new WebSocket("ws://localhost:8081");

reloadSocket.onopen = () => {
  console.log("Reload socket connected!");
};

reloadSocket.onmessage = event => {
  const extName = event.data;

  chrome.management.getAll(extensions => {
    extensions.forEach(ext => {
      if (
        ext.installType === "development" &&
        ext.type === "extension" &&
        ext.name === extName
      ) {
        console.log(ext);
        reloadExtension(ext.id);
      }
    });
  });
};
