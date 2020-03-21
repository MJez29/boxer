import { Alias, formatAsName } from "@lib/aliases";
import { requestPermission, removePermission } from "./permissions";

export function getBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise(resolve => {
    chrome.bookmarks.getTree(bookmarkNodes => {
      resolve(bookmarkNodes);
    });
  });
}

export function isFolder(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  return bookmark.children !== undefined;
}

export function isRoot(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  return bookmark.parentId === undefined;
}

export function isBookmarksBar(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  return bookmark.title === "Bookmarks bar";
}

export function isOtherBookmarks(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  return bookmark.title === "Other bookmarks";
}

export function isMobileBookmarks(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  return bookmark.title === "Mobile bookmarks";
}

export function getAliasesFromBookmarkTreeNode(
  bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode,
  prefix = ""
): Alias[] {
  if (
    isRoot(bookmarkTreeNode) ||
    isBookmarksBar(bookmarkTreeNode) ||
    isOtherBookmarks(bookmarkTreeNode) ||
    isMobileBookmarks(bookmarkTreeNode)
  ) {
    return (bookmarkTreeNode.children || []).flatMap(child =>
      getAliasesFromBookmarkTreeNode(child)
    );
  }

  if (isFolder(bookmarkTreeNode)) {
    prefix += " " + bookmarkTreeNode.title;
    return (bookmarkTreeNode.children || []).flatMap(child =>
      getAliasesFromBookmarkTreeNode(child, prefix)
    );
  } else {
    return [
      {
        name: formatAsName(prefix + " " + bookmarkTreeNode.title),
        link: bookmarkTreeNode.url || ""
      }
    ];
  }
}

export async function getAliasesFromBookmarks(): Promise<Alias[]> {
  await requestPermission("bookmarks");
  const bookmarkTreeNodes = await getBookmarks();
  try {
    await removePermission("bookmarks");
  } catch {}
  return bookmarkTreeNodes.flatMap(node =>
    getAliasesFromBookmarkTreeNode(node)
  );
}
