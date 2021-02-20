const asciidocPlugin = require('../src/rollup-plugin-asciidoc')
const rollup = require('rollup')
const path = require('path')
const Module = require('module')

function requireFromString(code) {
  const opts = {}
  const filename = 'test_require_from_string.js'

  opts.appendPaths = opts.appendPaths || []
  opts.prependPaths = opts.prependPaths || []

  if (typeof code !== 'string') {
    throw new Error('code must be a string, not ' + typeof code)
  }

  var paths = Module._nodeModulePaths(path.dirname(filename))

  var parent = module.parent
  var m = new Module(filename, parent)
  m.filename = filename
  m._compile(code, filename)

  var exports = m.exports
  parent &&
    parent.children &&
    parent.children.splice(parent.children.indexOf(m), 1)

  return exports
}

process.chdir(__dirname)

const bundleFileAndGetCode = async rollupConfig => {
  const bundle = await rollup.rollup(rollupConfig)

  const { output } = await bundle.generate({ format: 'cjs' })

  const [{ code }] = output
  return code
}

it('returns a module for the asciidoc file', async () => {
  const code = await bundleFileAndGetCode({
    input: 'fixtures/test.adoc',
    plugins: [asciidocPlugin()],
  })

  const requiredModule = requireFromString(code)
  requiredModule.metadata.localdate = undefined
  requiredModule.metadata.localdatetime = undefined
  requiredModule.metadata.localyear = undefined
  requiredModule.metadata.localtime = undefined
  requiredModule.metadata.docdate = undefined
  requiredModule.metadata.docdatetime = undefined
  requiredModule.metadata.doctime = undefined
  requiredModule.metadata.docyear = undefined
  
  expect(requiredModule).toMatchSnapshot()
  
  expect(requiredModule.filename).toEqual('test.adoc')
  expect(requiredModule.path).toEqual(path.resolve(path.join(__dirname, 'fixtures/test.adoc')))
})
