const { pruneAndCopyAllFilesOnce, watchFiles } = require('web-utils')

const dependencyConfig = [
  {
    label: 'tools',
    source: './node_modules/web-utils/tools/',
    destination: './src/external/tools/'
  },
  {
    label: 'types',
    source: './node_modules/web-utils/types/',
    destination: './src/external/types/'
  },
  {
    label: 'classes',
    source: './node_modules/web-utils/classes',
    destination: './src/external/classes/'
  },
  {
    label: 'constants',
    source: './node_modules/web-utils/constants',
    destination: './src/external/constants/'
  }
]

module.exports.copy = () => {
  pruneAndCopyAllFilesOnce(dependencyConfig)
}

module.exports.watch = () => {
  setTimeout(() => {
    watchFiles(dependencyConfig)
  }, 3000)
}
