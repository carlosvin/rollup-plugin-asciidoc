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

      const html = adoc.convert(code,  { 'safe': 'safe', 'attributes': { 'linkcss': true } })
      const doc = adoc.loadFile(id)
      // console.log('file: ', adoc.convertFile(id,  { 'safe': 'safe', 'attributes': { 'linkcss': true } }))

      const exportFromModule = JSON.stringify({
        html,
        filename: path.basename(id),
        path: id,
        metadata: doc.getAttributes(),
      })

      return {
        code: `export default ${exportFromModule}`,
        map: { mappings: '' },
      }
    },
  }
}

module.exports = asciidocPlugin;


