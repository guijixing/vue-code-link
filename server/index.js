const child_process = require('child_process')
const pathUtil = require("../utils/pathUtil.js")

function openCodeFile(path) {
  let filePath = pathUtil.projectBasePath + path
  child_process.exec(`code -r -g ${filePath}`)
}
module.exports = function (app) {
  //webpack
  if (app) {
    if (process.env.NODE_ENV === "development") {
      app.get("/code", function (req, res) {
        if (req.query.filePath) {
          // 执行vscode定位代码行命令
          openCodeFile(req.query.filePath);
        }
        res.end();
      });
    }
  } else {
    return {
      name: 'open-code-vite-server',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {

          if (req.url.indexOf('/code?') === 0) {
            let filePath = decodeURIComponent(req.url.substring(req.url.indexOf("filePath=")).replace("filePath=", ''))
            if (filePath) {
              openCodeFile(filePath) // 执行vscode定位代码行命令 
            }
            return res.end();
          }
          next()

        })
      }
    }
  }

}
