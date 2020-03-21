export function requestPermission(permission: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.permissions.request(
      {
        permissions: [permission]
      },
      granted => {
        if (granted) {
          resolve();
        } else {
          reject(new Error(`Permission for ${permission} rejected`));
        }
      }
    );
  });
}

export function removePermission(permission: string) {
  return new Promise((resolve, reject) => {
    chrome.permissions.remove(
      {
        permissions: [permission]
      },
      removed => {
        if (removed) {
          resolve();
        } else {
          reject();
        }
      }
    );
  });
}
