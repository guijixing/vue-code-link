
## 通过 shift+右键点击页面元素,快速在 vscode 中定位代码位置 Vite
![Animation](https://user-images.githubusercontent.com/22042837/177247094-17215a38-ddfa-4e7e-9758-47b2a052b263.gif)
## 引入
``` 
    // 引入只需如下三步
    //1、install package
    yarn add @guijixing/vue-code-link --dev
    //2、vite.config.js
    import { openCodeServer, addCodeLocation } from '@guijixing/vue-code-link';
    export default ({ command, mode }: ConfigEnv): UserConfig => {
        ...
        const isBuild = command === 'build';
        const codePlugins = !isBuild ? [openCodeServer(), addCodeLocation()] : [];
        return {
            base: VITE_PUBLIC_PATH,
            root,
            resolve: {
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
                },
                ...
            ],
            ...
            plugins:[...codePlugins,...],
            ...
            // vite版本全局中如获取不到process,可补充声明
            define:{
                'process.env': { NODE_ENV:process.env.VITE_USER_NODE_ENV }
            }
        }
    }

    //3、main.js
    import { openCodeClient } from '@guijixing/vue-code-link'
    openCodeClient.init()
```

## 编辑器命令加入环境变量 vscode
- 使用 command + shift + p (注意 window 下使用 ctrl + shift + p ) 然后搜索 code，选择 install 'code' command in path。

## 注意事项
- 插件会自动根据生成与开发环境决定是否启用,不会对生产环境造成任何影响
- 只支持 vue + vite + vscode ,[webpack版本](https://www.npmjs.com/package/@linzhinan/vue-code-link)
- 该项目看到了一位前端大佬的文章，[文章链接](https://mp.weixin.qq.com/s/AZQTK_lk8BxxWZCDU5P_Yg) 。文章里有详细的设计思路和代码片段。 网上查找到一个[webpack版本](https://www.npmjs.com/package/@linzhinan/vue-code-link)，整合后增加一个vite版
