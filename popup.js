chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  const pattern = /https:\/\/.*\.databricks.com\/.*#notebook\/.*/;
  if (url.match(pattern)) {
    chrome.tabs.sendMessage(tabs[0].id, 'makeTOC', () => {});
  } else {
    const message = document.getElementById('message');
    message.textContent = 'This page is not a Databricks notebook';
    message.style.color = 'red';
  }
});
