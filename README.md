# 重返未来：1999 共鸣计算器

重返未来：1999 共鸣计算器，用来计算角色共鸣方案的工具。

## 使用方式

在左上选择要计算的角色（支持英文名、拼音与拼音首字母检索），在中间选择要计算的共鸣级别，最后点击 `开始` 按钮。

## 致谢

### npm 包以及库

- 主框架：[Quasar](https://quasar.dev/)
- UI 组件：[Element-Plus](https://element-plus.org/)
- APP 框架：[Electron](https://www.electronjs.org/)
- 拼音库：[Pinyin-pro](https://pinyin-pro.cn/)

### Python 库

- 舞蹈链算法库：[DLX](https://github.com/sraaphorst/dlx-python)
- 多重集数据结构：[multiset](https://github.com/wheerd/multiset)
- JSON 库：[demjson3](https://github.com/nielstron/demjson3/)

## 构建

1.  安装依赖：`npm i`
2.  构建：`npm run electron:build`
3.  调试：`npm run electron:dev`
