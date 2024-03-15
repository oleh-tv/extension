import { HIGHLIGHTS_KEY, MENU_ITEMS } from "./constants";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ [HIGHLIGHTS_KEY]: {} });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === MENU_ITEMS.ADD) {
    chrome.storage.local.get([HIGHLIGHTS_KEY], (data) => {
      const highlights = data.highlights || {};

      const id = sender.tab.url;

      if (!highlights[id]) {
        highlights[id] = [];
      }

      highlights[id].push({
        text: message.text,
        title: sender.tab.title,
      });

      chrome.storage.local.set({ highlights });

      chrome.action.setBadgeText({
        text: highlights[id].length.toString(),
        tabId: sender.tab.id,
      });
    });
  }
});
