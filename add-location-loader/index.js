// 引入fs模块
var fs = require('fs');
const pathUtil = require("../utils/pathUtil.js")
module.exports = function (source) {
  // webpack
  if (source) {
    const {
      resourcePath
    } = this;
    return sourceCodeChange(source, resourcePath);
  } else {
    return {
      name: 'add-code-location',
      transform(code, id) {
        try {
          if (id.toString().endsWith(".vue")) {
            return sourceCodeChange(code, id)
          }
        } catch (error) {
          console.log(error)
        }

      }
    }
  }

};

function sourceCodeChange(source, resourcePath) {
  resourcePath = resourcePath.substring(pathUtil.projectBasePath.length) // vue代码相对路径 
  return codeLineTrack(source, resourcePath);
}

function codeLineTrack(str, resourcePath) {
  let lineList = str.split("\n");
  let newList = [];
  //template标识，用于判断代码是否在template内，限制只处理template下的代码，不处理transition>keep-alive内数据
  let templateIndex = {
    index: 0,
    transition: 0
  };
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, resourcePath, templateIndex)); // 添加位置属性，index+1为具体的代码行号
  });
  return newList.join("\n");
}

function addLineAttr(lineStr, line, resourcePath, templateIndex) {
  let reg = /(<[^\d][\w-]+)|(<\/template)/g;
  let leftTagList = lineStr.match(reg);
  if (leftTagList) {
    leftTagList = Array.from(new Set(leftTagList));
    leftTagList.forEach((item) => {
      if (item && item.indexOf("<template") !== -1) {
        templateIndex.index += 1;
      }
      if (item && item.indexOf("</template") !== -1) {
        templateIndex.index -= 1;
      }
      if (item && item.indexOf("<transition") !== -1) {
        templateIndex.transition = 1;
      }
      if (item && item.indexOf("</transition") !== -1) {
        templateIndex.transition -= 1;
      }
      if (templateIndex.index > 0 && templateIndex.transition <= 0 && item && item.indexOf("template") == -1 && item.indexOf("transition") == -1 && !['<slot', '<script', '<RouterView', '<keep-alive'].includes(item)) {
        let regx = new RegExp(`${item}`, "g");
        let location = `${item} code-location="${resourcePath}:${line}"`;
        lineStr = lineStr.replace(regx, location);
      }
    });
  }

  return lineStr;
}
