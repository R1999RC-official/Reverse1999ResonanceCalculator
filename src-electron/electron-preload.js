/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  getCharacterList: () => ipcRenderer.invoke("GET_CHARACTER_LIST"),
  getCharacterData: (name) => ipcRenderer.invoke("GET_CHARACTER_DATA", name),
  getBoardSize: (level) => ipcRenderer.invoke("GET_BOARD_SIZE", level),
  startCalcFakeSol: (blocks, board_size) =>
    ipcRenderer.invoke("START_CALC_FAKE", blocks, board_size),
  stopCalcFakeSol: () => ipcRenderer.invoke("STOP_CALC_FAKE"),
  onFakeSol: (callback) => ipcRenderer.on("FAKE_SOLUTION", callback),
  onFakeSolStart: (callback) =>
    ipcRenderer.on("FAKE_SOLUTION_STARTED", callback),
  onFakeSolFinish: (callback) =>
    ipcRenderer.on("FAKE_SOLUTION_FINISHED", callback),
  startCalc: (blocks, board_size, id) =>
    ipcRenderer.invoke("START_CALC", blocks, board_size, id),
  onSolution: (callback) => ipcRenderer.on("SOLUTION", callback),
  // we can also expose variables, not just functions
});
