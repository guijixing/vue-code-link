function sendRequestToOpenFileInEditor(filePath) {
  const protocol = window.location.protocol ? window.location.protocol : 'http:';
  const hostname = window.location.hostname ? window.location.hostname : 'localhost';
  const port = window.location.port ? window.location.port : '80';
  fetch(`${protocol}//${hostname}:${port}/code?filePath=${filePath}`).catch((error) => {
    console.log(error);
  });
}

function getFilePath(element) {
  if (!element || !element.getAttribute) return null;
  if (element.getAttribute('code-location')) {
    return element.getAttribute('code-location');
  }
  return getFilePath(element.parentNode);
}

function openFileInEditor(e) {
  if (e.shiftKey && e.button === 2) {
    e.preventDefault();
    const filePath = getFilePath(e.target);
    sendRequestToOpenFileInEditor(filePath);
  }
}

function init() {
  if (process.env.NODE_ENV === 'development') {
    document.oncontextmenu = function (e) {
      if (e.shiftKey && e.button === 2) {
        return false;
      }
    };
    document.onmousedown = function (e) {
      if (e.shiftKey && e.button === 2) {
        e.preventDefault();
        openFileInEditor(e);
      }
    };
  }
}
module.exports = {
  init
};
