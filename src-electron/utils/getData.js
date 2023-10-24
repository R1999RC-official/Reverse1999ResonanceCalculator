import { ipcMain } from "electron";
import { readJson } from "fs-extra";
import { pinyin } from "pinyin-pro";
const path = require("path");

import { isDev } from "./commonUtils";

let db = null;
let character_list;
let character_name_list;
let board;

const loadDB = async () => {
  if (db === null) {
    db = await readJson(
      path.join(isDev ? "" : "resources", "character_db.json")
    );

    character_list = db.chara;

    character_list.forEach((i) => {
      i.pinyin_name = `${pinyin(i.ch_name, {
        toneType: "none",
        separator: "",
      })} ${pinyin(i.ch_name, {
        toneType: "none",
        separator: "",
        pattern: "first",
      })}`;
    });

    character_name_list = character_list.map((i) => i.ch_name);
    board = db.size;
  }
};

const getCharacterList = async () => {
  await loadDB();
  return character_list;
};

const getCharacterData = async (event, name) => {
  await loadDB();
  return character_list.filter((i) => i.ch_name == name)[0];
};

const getBoardSize = async (event, level) => {
  await loadDB();
  return board[level];
};

ipcMain.handle("GET_CHARACTER_LIST", getCharacterList);

ipcMain.handle("GET_CHARACTER_DATA", getCharacterData);

ipcMain.handle("GET_BOARD_SIZE", getBoardSize);

//loadDB();
