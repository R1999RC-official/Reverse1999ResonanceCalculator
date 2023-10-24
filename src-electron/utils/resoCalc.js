import { ipcMain } from "electron";

import { spawn } from "node:child_process";

import path from "path";
import { app } from "electron";

import { isDev } from "./commonUtils";

let childProcess;

const start_calculate = (event, blocks, board_size) => {
  console.log("start calculating");
  childProcess = spawn(
    path.join(isDev ? "" : "resources", "python/python_env/python"),
    //"python",
    [
      path.join(isDev ? "" : "resources", "python/dlx_cli.py"),
      JSON.stringify(blocks),
      JSON.stringify(board_size),
    ]
  );
  childProcess.stdout.on("data", (data) => {
    data
      .toString()
      .trim()
      .split("\n")
      .forEach((sol) => {
        app.mainWindow.send("SOLUTION", eval(sol));
      });
  });
  childProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  childProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const stop_calc_reso = () => {
  console.log("stop calculating");
  childProcess?.kill();
};

ipcMain.handle("START_CALC", start_calculate);

ipcMain.handle("STOP_CALC", stop_calc_reso);

//ipcMain.invoke("RESO_RESULT");
