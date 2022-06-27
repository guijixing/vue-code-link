let projectBasePath = "";
try {
  projectBasePath = __dirname.substring(0, __dirname.search('node_modules'))
} catch (error) { 
}

module.exports = {
  projectBasePath: projectBasePath
}
