from reso_calc import create_fake_solutions, solve, create_matrix
import sys
import demjson3
from concurrent.futures import ThreadPoolExecutor, as_completed, wait


def call_back(dlx, count):
    for sol in solve(dlx, count):
        print(sol)
        return
    print("unsolvable")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("error")
        exit(-1)

    # mode 0表示只计算方案，1表示计算具体摆法
    blocks_str, board_size_str, mode = sys.argv[1:]
    blocks = demjson3.decode(blocks_str, encoding="utf-8")
    board_size = demjson3.decode(board_size_str, encoding="utf-8")
    if int(mode) == 0:
        fake_solutions = create_fake_solutions(*board_size, blocks)
        for fake_solution in fake_solutions:
            print(fake_solution)
            break
    else:
        dlx = create_matrix(*board_size, blocks)
        for sol in solve(dlx, 1):
            print(sol)
    # pool = ThreadPoolExecutor(thread_name_prefix='test_thread')
    #
    # for dlx in matrices:
    #     pool.submit(call_back, dlx, 1)
    # pass
