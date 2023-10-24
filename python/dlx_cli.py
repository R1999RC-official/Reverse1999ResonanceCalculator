from reso_calc import create_matrix, solve
import sys
import demjson3

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("error")
        exit(-1)
    blocks_str, board_size_str = sys.argv[1:]
    blocks = demjson3.decode(blocks_str, encoding="utf-8")
    board_size = demjson3.decode(board_size_str, encoding="utf-8")
    dlx = create_matrix(*board_size, blocks)
    for sol in solve(dlx, -1):
        print(sol)
    pass
