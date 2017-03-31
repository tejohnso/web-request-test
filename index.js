const {app, BrowserWindow, session} = require("electron");
const path = require("path");

const browserPrefs = {
  frame: false,
  webPreferences: {
    nodeIntegration: false,
    webSecurity: false
  }
};

const localUrl = require("url").format({
  protocol: "file",
  slashes: true,
  pathname: path.resolve("./test.html")
});

console.log(process.versions);

app.on("ready", ()=>{
  session.defaultSession.webRequest.onBeforeRequest(interceptRequest);
  const win = new BrowserWindow(browserPrefs);

  win.loadURL("https://electron.atom.io/docs/");
});

function interceptRequest(details, cb) {
  cb({redirectURL: details.url.includes("electron") ? localUrl : null});
}

app.on("window-all-closed", app.quit);
