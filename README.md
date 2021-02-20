Plugin to import Asciidoctor files using Rollup.

# Quickstart

    $ yarn add rollup-plugin-asciidoc --dev

Add the plugin to Rollup configuration.

<div class="formalpara-title" markdown="1">

**rollup.config.js**

</div>

``` javascript
import asciidoc from 'rollup-plugin-asciidoc' 

// ...

plugins: [ 
            asciidoc(),
]
```

-   Import Asciidoc plugin

-   Plugins section in Rollup configuration

Import an Asciidoc file in your source code.

<div class="formalpara-title" markdown="1">

**example.js**

</div>

``` javascript
import post from 'post.adoc' 

console.log(post) 
```

-   Import Asciidoc file.

-   Log the content.

It will output something like:

``` javascript
{
  meta: {
    title: "Post title",
    date: "2019-11-11"
  },
  html: "<p>Such a post!</p>"
}
```
