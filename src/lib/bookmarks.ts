import { Alias, formatAsName, filterOutExistingAliases } from "@lib/aliases";
import { requestPermission, removePermission } from "./permissions";
import { isAliasValid } from "./storage";

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
  const { aliases } = await bookmarkTreeNodes
    .flatMap(node => getAliasesFromBookmarkTreeNode(node))
    .reduce(
      (state, alias) => {
        const name = alias.name;
        const link = alias.link;

        if (isAliasValid(name, link) && !state.names.has(name)) {
          state.aliases.push({
            name,
            link
          });
          state.names.add(name);
          state.links.add(link);
        }

        return state;
      },
      {
        aliases: [] as Alias[],
        names: new Set(),
        links: new Set()
      }
    );
  return filterOutExistingAliases(aliases);
}
