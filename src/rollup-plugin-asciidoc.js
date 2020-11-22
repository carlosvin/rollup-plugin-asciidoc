const utils = require('@rollup/pluginutils');

const path = require('path')
const Asciidoctor = require('asciidoctor')
const highlightJsExt = require('asciidoctor-highlight.js')
const prismExtension = require('asciidoctor-prism-extension');

const asciidocPlugin = (options = {}) => {
  const adoc = Asciidoctor()
  highlightJsExt.register(adoc.Extensions)
  adoc.SyntaxHighlighter.register('prism', prismExtension);

  const filter = utils.createFilter(options.include, options.exclude)

  return {
    name: 'rollup-plugin-asciidoc',
    transform(code, id) {
      if (!filter(id)) return

      const extension = path.extname(id)

      if (extension !== '.adoc') return

      const html = adoc
        .convert(code, { 
          mkdirs: true,
          base_dir: path.dirname(id),
          safe: 'unsafe',
          'attributes': { 
            'source-highlighter': 'prism',
            'prism-languages': 'bash,json,python,typescript,javascript,java,go,cpp,rust,java'
          }
        })
        .split('<pre ').join('<pre tabindex="0" ')

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


