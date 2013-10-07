# Atma.js TodoMVC Example

This is a todo application created with [Atma.js](http://atmajs.com/). GitHub <a href='http://github.com/atmajs'>link</a>

## Project

Atma.js Project consists of stand-alone libraries, so that you can peek only what you need, but best to use
all together, and this application demonstrates, how this all works. _Everything could be
also executed in node.js environment (MaskJS renders HTML for the client, and in ClassJS use MongoDB Store instead of
LocalStorage)._

#### ClassJS 
— is a class-model implementation. This will be a business logic layer. It does not depend on any further
library and is a good starting point for an application.

#### MaskJS
— stands for the MVC Presentation. 

- Mask Markup are parsed into MaskDOM(AST) first, and then DOM Builder creates DOM Nodes. This approach
allows controllers to be blazingly fast, as at the  application start, the work goes mainly with MaskDOM,
and then it is mapped into Live DOM
- Component controllers are the custom tag handlers, all dependencies and nesting are nice declared in templates
- DOM events could be transformed into signals and sent to the template owner and upper in a controllers tree
- Single/Two way data-bindings consumes any Javascript object, so you can use even raw data-centric models, or
some other library you like instead of ClassJS
- Best used with jQuery or other compatible DOM Library, like Zepto. But does not depend on it, so can be
used without.

#### IncludeJS
— is a resource loader.

- designed for simple and complex cases
- loads javascript / coffeescript / css / less / json / raw data 
- any further custom loaders can be simply implemented
- resources and dependencies are declared in-place without the need of any additional configuration files
- has flexible routing based on namespaces
- has no pre-requests for a module definition, but supports module exporting in CommonJS manner or using ```include.exports```
- does not need the application to be built, but when your scripts amount is over 70 files (js / css / templates / ..),
it worth to build the app before production. Builder can be found in Atma.Toolkit
- works same in browser and node.js

These where, may be, the core points and unfortunately not everything was mentioned.

## Implementation

There are, as usual, no strict rules, how you must structure the app, but we could, may be, give some advices.
You should definitely split an Application into components hierarchy, and so the application structure will
consist of a Component and an Application Layer. Any component has the resources (that are component specific),
like styles / templates and other nested components, in the same folder and sub-. These makes it easer to
**reuse** it in other applications and makes it easer to test it. The Components itself, beyond domain model,
belongs to application layer, which is structured according design patterns you will use.

## Run

To run the main example, file access should be allowed in browser, as includejs loads templates with
```XMLHttpRequest```. But you can also start a built-in local server:

```bash
$ npm install -g atma # install atma.toolkit
$ atma server
```

navigate to ``` http://localhost:5777/ ```

## Build

To build the application for release run ``` $ atma ```. We provide also a compiled version in 'build/' directory, so you
can view how the application looks like for production.