# vue2.0-practices

> A Vue.js project

部分功能的外卖系统，使用了vue2.0, vue2.0 单页面应用。

##技术栈

vue2.0 + Express + webpack + stylus + ES6 + vuex

##目录结构

--build 打包配置文件和express服务文件
--config 项目环境配置
--resource 物料
--src 源码
  -- assets 项目资源文件
  -- components 组件
  -- router 路由
  -- main.js 入口文件

-- static 静态资源
-- test 测试用例

## 下载

```bash
git clone https://github.com/webkong/elem-practices.git
cd elem-practices
npm install
```
## 运行

``` bash
# 开发环境，起一个服务localhost:8080
npm run dev

# 上线打包压缩
npm run build

# 构建生产包并查报告
npm run build --report

# 单元测试
npm run unit

# e2e 测试
npm run e2e

# 所有测试
npm test
```

## 说明
>本项目主要是理解vue2.0 和 vuex 的原理和使用方式，以及配合使用方式
>使用了相关的vue-router + vue-resource等
>感觉可以的话可以点“Star”支持
>或者follow以下
>有什么问题可以在issues中提，或者发现更好的解决方案
>开发环境 MacOS + Chrome56 + nodejs 6.10.2