const hasOutput = cell => {
  if (cell.querySelector('div.results.dashboard')) return true;

  const output = cell.querySelector('div.ansiout');
  if (!output) return false;

  return output.textContent !== '';
};

const toggleDisplay = element => {
  const { display } = element.style;

  if ((display === '') | (display == 'block')) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const cells = document.querySelectorAll('div.command-with-number');
  const dividers = document.querySelectorAll('div.command.divider');

  cells.forEach((cell, idx) => {
    if (hasOutput(cell)) {
      const code = cell.querySelector('div.mainCommand div.command-input');
      toggleDisplay(code);
    } else {
      toggleDisplay(cell);
      toggleDisplay(dividers[idx]);
    }
  });
  sendResponse();
});
