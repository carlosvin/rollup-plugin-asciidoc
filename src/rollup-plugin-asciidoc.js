const utils = require('@rollup/pluginutils');

const path = require('path')
const Asciidoctor = require('asciidoctor')
const highlightJsExt = require('asciidoctor-highlight.js')


const asciidocPlugin = (options = {}) => {
  const adoc = Asciidoctor()
  highlightJsExt.register(adoc.Extensions)

  const filter = utils.createFilter(options.include, options.exclude)

  return {
    name: 'rollup-plugin-asciidoc',
    transform(code, id) {
      if (!filter(id) === -1) return

      const extension = path.extname(id)

      if (extension !== '.adoc') return

      const html = adoc.convert(
        code, { 'attributes': { 'source-highlighter': 'highlightjs-ext' } })

      const doc = adoc.loadFile(id)

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


