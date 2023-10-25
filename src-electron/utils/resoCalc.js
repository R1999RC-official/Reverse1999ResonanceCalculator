import { ipcMain } from "electron";

import { spawn } from "node:child_process";

import path from "path";
import { app } from "electron";

import { isDev } from "./commonUtils";

let childProcess;

const start_calculate_fake = (event, blocks, board_size) => {
  console.log("start calculating");
  childProcess = spawn(
    path.join(isDev ? "" : "resources", "python/python_env/python"),
    //"python",
    [
      path.join(isDev ? "" : "resources", "python/dlx_cli.py"),
      JSON.stringify(blocks),
      JSON.stringify(board_size),
      0,
    ]
  );
  childProcess.stdout.on("data", (data) => {
    data
      .toString()
      .trim()
      .split("\n")
      .forEach((sol) => {
        app.mainWindow.send(
          "FAKE_SOLUTION",
          JSON.parse(sol.replaceAll("'", '"'))
        );
      });
  });
  childProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  childProcess.on("spawn", () => {
    app.mainWindow.send("FAKE_SOLUTION_STARTED");
  });
  childProcess.on("close", (code) => {
    app.mainWindow.send("FAKE_SOLUTION_FINISHED");
    console.log(`child process exited with code ${code}`);
  });
  //childProcess.on()
};

const stop_calc_fake = () => {
  console.log("stop calculating");
  childProcess?.kill();
};

const start_calc = (event, blocks, board_size, id) => {
  console.log("start calculating");
  childProcess2 = spawn(
    path.join(isDev ? "" : "resources", "python/python_env/python"),
    //"python",
    [
      path.join(isDev ? "" : "resources", "python/dlx_cli.py"),
      JSON.stringify(blocks),
      JSON.stringify(board_size),
      1,
    ]
  );
  childProcess2.stdout.on("data", (data) => {
    data
      .toString()
      .trim()
      .split("\n")
      .forEach((sol) => {
        app.mainWindow.send("SOLUTION", eval(sol), id);
      });
  });
  childProcess2.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  childProcess2.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

ipcMain.handle("START_CALC_FAKE", start_calculate_fake);

ipcMain.handle("STOP_CALC_FAKE", stop_calc_fake);

ipcMain.handle("START_CALC", start_calc);

//ipcMain.invoke("RESO_RESULT");
