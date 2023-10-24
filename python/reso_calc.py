# -*- coding:utf-8 -*-

import json
from itertools import *
from collections import Counter
from multiset import *
from dlx import DLX
from threading import Semaphore

block_dict = {
    "o": "11/11",
    "l": "1/1/1/1",
    "S": "011/110",
    "z": "110/011",
    "L": "10/10/11",
    "J": "01/01/11",
    "t": "010/111",
    "d_diam": "1",
    "d_tri": "1",
    "i": "11",
    "x": "010/111/010",
    "Z": "110/010/011",
    "v": "11/10",
    "T": "111/010/010",
    "U": "101/111",
}


def create_block_rows(
    board_row: int,
    board_col: int,
    current_reso_block: dict,
    current_reso_block_idx: int,
):
    block_shape = block_dict[current_reso_block].split("/")
    block_width, block_height = len(block_shape[0]), len(block_shape)
    coords = [
        (idx_x, idx_y)
        for idx_x, i in enumerate(block_shape)
        for idx_y, j in enumerate(i)
        if block_shape[idx_x][idx_y] == "1"
    ]
    _1_count = len(coords)
    coords_x, coords_y = zip(*coords)

    rows = []
    rows_name = []
    rows_set = set()

    for i in range(board_row - block_height + 1):
        for j in range(board_col - block_width + 1):
            # (行坐标+偏移量)*列数+列坐标+偏移量
            row = sorted(
                (
                    *(
                        (i + coords_x[k]) * board_col + j + coords_y[k]
                        for k in range(_1_count)
                    ),
                    board_row * board_col + current_reso_block_idx,
                )
            )
            row = tuple(row)
            if row not in rows_set:
                rows.append(row)
                rows_name.append((current_reso_block, i, j, 0, current_reso_block_idx))
                rows_set.add(row)
            # 180°
            # (块宽度-行坐标-1 + 偏移量)*列数+块高度-列坐标-1+偏移量
            row = sorted(
                (
                    *(
                        (i + block_height - coords_x[k] - 1) * board_col
                        + j
                        + block_width
                        - 1
                        - coords_y[k]
                        for k in range(_1_count)
                    ),
                    board_row * board_col + current_reso_block_idx,
                )
            )
            row = tuple(row)
            if row not in rows_set:
                rows.append(row)
                rows_name.append(
                    (current_reso_block, i, j, 180, current_reso_block_idx)
                )
                rows_set.add(row)
            pass
    for i in range(board_row - block_width + 1):
        for j in range(board_col - block_height + 1):
            # 90
            # c`=h-r-1 r`=c
            #
            row = sorted(
                (
                    *(
                        (i + coords_y[k]) * board_col
                        + j
                        + block_height
                        - coords_x[k]
                        - 1
                        for k in range(_1_count)
                    ),
                    board_row * board_col + current_reso_block_idx,
                )
            )
            row = tuple(row)
            if row not in rows_set:
                rows.append(row)
                rows_name.append((current_reso_block, i, j, 90, current_reso_block_idx))
                rows_set.add(row)

            # 270
            # c`=r r`=w-c-1
            # (列坐标 + 偏移量)*列数+ 块高度 - 行坐标 - 1+偏移量
            row = sorted(
                (
                    *(
                        (i + block_width - coords_y[k] - 1) * board_col
                        + j
                        + coords_x[k]
                        for k in range(_1_count)
                    ),
                    board_row * board_col + current_reso_block_idx,
                )
            )
            row = tuple(row)
            if row not in rows_set:
                rows.append(row)
                rows_name.append(
                    (current_reso_block, i, j, 270, current_reso_block_idx)
                )
                rows_set.add(row)
            pass
    return rows, rows_name


def create_matrix(board_row: int, board_col: int, reso_blocks: list):
    block_list_uncompressed = [
        i for i in reso_blocks for j in range(int(reso_blocks[i]))
    ]

    cols = []
    ctr = 0

    # create cols for board
    cols += [
        (("e", i, j), ctr + i * board_col + j)
        for i in range(board_row)
        for j in range(board_col)
    ]
    ctr += board_row * board_col

    # create cols for blocks
    cols += [(("b", i), ctr + idx) for idx, i in enumerate(block_list_uncompressed)]

    dlx = DLX(
        [
            (colname[0], DLX.PRIMARY if colname[0][0] == "e" else DLX.SECONDARY)
            for colname in cols
        ]
    )
    # rows
    for idx, i in enumerate(block_list_uncompressed):
        current_rows, current_rows_name = create_block_rows(
            board_row, board_col, i, idx
        )
        dlx.appendRows(current_rows, current_rows_name)
        pass
    dlx.stop = False
    dlx.s = Semaphore()
    return dlx


def solve(dlx, count):
    sol_set = {}

    for sol_idx in dlx.solve():
        dlx.s.acquire()
        if dlx.stop:
            return
        dlx.s.release()
        sol = [list(dlx.N[i]) for i in sol_idx]
        sol_blocks = FrozenMultiset(i[0] for i in sol)
        if sol_blocks not in sol_set:
            sol_set[sol_blocks] = 1
            yield sol

        else:
            sol_set[sol_blocks] += 1

    pass
