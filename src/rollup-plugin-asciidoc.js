const utils = require('@rollup/pluginutils');

const path = require('path')
const Asciidoctor = require('asciidoctor')
const adoc = Asciidoctor()


const asciidocPlugin = (options = {}) => {
  const filter = utils.createFilter(options.include, options.exclude)

  return {
    name: 'rollup-plugin-asciidoc',
    transform(code, id) {
      if (!filter(id) === -1) return

      const extension = path.extname(id)

      if (extension !== '.adoc') return

      const conversion = adoc.convert(code)
      console.log(conversion)

      const exportFromModule = JSON.stringify({
        html,
        metadata: matterResult.data,
        filename: path.basename(id),
        path: id,
      })

      return {
        code: `export default ${exportFromModule}`,
        map: { mappings: '' },
      }
    },
  }
}

module.exports = asciidocPlugin;


