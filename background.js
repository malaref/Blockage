'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({
    pages: {
      'http://www.example.com/bad_page/': 'http://www.example.com/good_page/',
      'http://www.example.com/another_bad_page/': 'http://www.example.com/another_good_page/'
    }});
});

chrome.webNavigation.onBeforeNavigate.addListener(function(navigationData) {
  chrome.storage.local.get('pages', function(storedData) {
    if(navigationData.frameId === 0 && navigationData.url in storedData.pages) {
      chrome.tabs.update(navigationData.tabId, {url: storedData.pages[navigationData.url]});
    }
  });
});
