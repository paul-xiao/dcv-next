# dcv-next

> vue3 based component lib

## build lib

```sh

pnpm install && pnpm build

```

## 本地测试

```sh
# 将当前工作目录或通过 --dir 参数指定的目录下的软件包链接到全局环境下的 node_modules 目录下
pnpm link --global


# 将全局环境下的 node_modules 目录中的指定的软件包（<pkg>）链接到当前工作目录下（或通过 --dir 参数指定的目录下）的 node_nodules 目录下。
cd project-path

pnpm link --global dcv

# 删除link

pnpm unlink dcv
```

## 生产发布

```sh
# 将lib推送到release分支
# notes: lib目录必须先commit，否则无法push
# commits: git commit -m 'build:version'
git subtree push -P lib origin release

# 项目使用
pnpm add git+http://10.1.191.15:13480/fed/dcv#release
```

## get started

```bash
pnpm add dcv-next
```

## useage

### md-viewer

| Name  | Type   | Default | Description         |
| ----- | ------ | ------- | ------------------- |
| value | string | null    | contents to preview |

```vue
<DcEditorViewer :value="contents" />
```
