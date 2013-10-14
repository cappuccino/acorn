
# Objective-J Acorn

[acorn]: http://marijnhaverbeke.nl/acorn/
[objj]: http://www.cappuccino-project.org/learn/objective-j.html
[objj-compiler]: https://github.com/mrcarlberg/ObjJAcornCompiler
[range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678

A tiny, fast JavaScript and [Objective-J][objj] parser with a complete implementation of the GNU C preprocessor, written completely in JavaScript.

objj-acorn is an extension of the [acorn][acorn] JavaScript parser by Marijn Haverbeke, and is the foundation of the [Objective-J compiler][objj-compiler].

## Invoking

acorn can be invoked in several ways.

- From a node script.
- From the command line.
- From a browser script.

### Node script

To use acorn from a [Node](http://nodejs.org) script, install objj-acorn as a package as usual using npm:

```sh
npm install objj-acorn
```

Alternately, download the source and link to that:

```sh
git clone https://github.com/mrcarlberg/acorn.git
cd acorn
npm link
cd /path/to/project
npm link objj-acorn
```

Now you can `require` objj-acorn in your node scripts. The main entrypoint to acorn is the `parse` function, which returns an object with the AST nodes:

```javascript
var fs = require('fs'),
    acorn = require('objj-acorn');

try
{
    var options = {trackComments: true},
        code = fs.readFileSync(pathToFile, "utf8"),
        ast = acorn.parse(code, options);
}
catch(e)
{
    console.error(e.message);
    process.exit(1);
}
```

### Command line

To use acorn from the command line, use the `acorn` binary, which is installed when you use npm to install or link the objj-acorn package. Alternately, you can execute `bin/acorn` directly. The syntax is as follows:

```text
acorn [options] file

Parses <file> and outputs the AST in JSON format.

Options:
--ecma3|--ecma5     Sets the ECMAScript version to parse. Default is version 5.
--strictSemicolons  Prevents the parser from doing automatic semicolon insertion.
                    Statements that do not end in semicolons will generate an error.
--trackComments     Attaches an array of comments found before and after each expression node.
--trackSpaces       Attaches an array of whitespaces found before and after each expression node.
--locations         Attaches a "loc" object to each node with "start" and "end" subobjects,
                    each of which contains the one-based line and zero-based column numbers
                    in {line, column} form.
-Dmacro[([param, ...])][=definition]]
                    Defines a macro. A name with no parameters and no definition will be defined
                    with the value 1. To be safe from shell expansion, the values on either side
                    of the = should be enclosed in '', for example -D'PLUS_ONE(arg)'='arg + 1'.
                    May be used multiple times to define multiple macros.
--no-objj           Turns off Objective-J syntax parsing.
--no-preprocess     Turns off the preprocessor. Results in ~30% speed increase.
--compact           No whitespace is used in the AST output.
--silent            Do not output the AST, just return the exit status.
--help              Print this usage information and quit.
```

By default both Objective-J and the preprocessor are on.

### Browser script

To use acorn in the browser, load `acorn.js` with a `<script>` tag. If you are using the preprocessor, you must also load `util/walk.js` first:

```
<script src="util/walk.js" type="text/javascript"></script>
<script src="acorn.js" type="text/javascript"></script>
```

Acorn is compatible with [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), so you may also use loaders like [require.js](http://www.requirejs.org) to load acorn in the browser.

Once acorn is loaded, you may use acorn within your own scripts by calling `acorn.parse` as illustrated in the Node example above.

## Options

The optional second parameter to the `parse` function is an options object. Acorn supports a number of options that control its behavior and its output.

- **ecmaVersion**: Indicates the ECMAScript version to parse. Must be either 3 or 5. This influences support for strict mode, the set of reserved words, and support for getters and setter. *Default*: 5

- **strictSemicolons**: If `true`, prevents the parser from doing automatic semicolon insertion, and statements that do not end with a semicolon will generate an error. *Default*: `false`

- **allowTrailingCommas**: If `false`, the parser will not allow trailing commas in array and object literals.

- **forbidReserved**: If `true`, using a reserved word will generate an error. *Default*: `false`

- **trackComments**: If `true`, the parser attaches "commentsBefore" and "commentsAfter" properties, which contain an array of comments, to each AST node that has comments before or after. A single comment may appear in both "commentsBefore" and "commentsAfter". *Default*: `false`

- **trackCommentsIncludeLineBreak**: When `true`, the parser will include, if present, line breaks before comments and all
the whitespace in between. *Default*: `false`

- **trackSpaces**: If `true`, the parser attaches "spacesBefore" and "spacesAfter" properties, which contain an array of whitespace, to each AST node that has whitespace before or after. The same whitespace may appear in both "spacesBefore" and "spacesAfter". *Default*: `false`

- **locations**: When `true`, each node has a "loc" object attached with "start" and "end" subobjects, each of which contains the one-based line and zero-based column numbers in `{line, column}` form. *Default*: `false`

- **onComment**: If a function is passed for this option, whenever a comment is encountered the function will be called with the following parameters:
    - **block**: `true` if the comment is a block comment, false if it is a line comment.
    - **text**: The content of the comment.
    - **start**: Character offset of the start of the comment.
    - **end**: Character offset of the end of the comment.

    When the `locations` options is on, the `{line, column}` locations of the comment’s start and end are passed as two additional parameters. *Default*: `null`

- **range**: Nodes have their start and end characters offsets recorded in "start" and "end" properties (directly on the node, rather than the "loc" object, which holds line/column data. To also add a [semi-standardized][range] "range" property holding a `[start, end]` array with the same numbers, set the `ranges` option to `true`. *Default*: `false`

- **program**: It is possible to parse multiple files into a single AST by passing the tree produced by parsing the first file as the `program` option in subsequent parses. This will add the toplevel forms of the parsed file to the "Program" (top) node of an existing parse tree. *Default*: `null`

- **sourceFile**: When the `locations` option is `true`, you can pass this option to record the source
file in every node’s "loc" object. Note that the contents of this option are not examined or processed in any way; you are free to use whatever format you choose. When acorn is invoked via the command line, this option is set to the full path of the file being parsed. *Default*: `null`

- **objj**: When `true`, the parser recognizes and parses [Objective-J][objj] syntax. *Default*: `true`

- **preprocess**: When `true`, the parser recognizes and follows preprocessor directives. For more information, see the [Preprocessor](#preprocessor) section below. *Default*: true

- **macros**: When `preprocess` is `true`, you may pass an array of macro definitions in this option, which will create predefined macros with the given names. Definitions may be in one of three forms:

    - name
    - name=definition
    - name(parameter, ...)=definition

    The first form predefines `name` as a macro with the value `1`. The second form predefines the object macro `name`, and the contents of `definition` are tokenized and processed as if they appeared in a `#define` directive. The third form is similar to the second form, but predefines the function macro `name` with the given parameters and definition. *Default*: `null`

- **lineNoInErrorMessage**: When `true`, error messages are suffixed with `(line:column)`, where `line` is the one-based line number on which the error occurred, and `column` is the zero-based column within that line. *Default*: `true`

## <a name="preprocessor">Preprocessor</a>

When the `preprocess` option is `true` (the default), acorn recognizes preprocessor directives defined in the [GNU C 4.0 Preprocessor User Guide](http://gcc.gnu.org/onlinedocs/gcc-4.8.1/cpp/index.html#Top). Acorn offers a **complete** implementation of the following preprocessor features:

- [Macros](http://gcc.gnu.org/onlinedocs/gcc-4.8.1/cpp/Macros.html#Macros)
- [Conditionals](http://gcc.gnu.org/onlinedocs/gcc-4.8.1/cpp/Conditionals.html#Conditionals)
- [Diagnostics](http://gcc.gnu.org/onlinedocs/gcc-4.8.1/cpp/Diagnostics.html#Diagnostics)
- `#pragma` is recognized but remaining tokens on the line are not examined.

In conjunction with the `macros` option, there are many powerful uses of the preprocessor. For example, you can define a debug logging macro that will compile to nothing unless you pass `["DEBUG"]` in the `macros` option (or `-DDEBUG` from the command line):

```
#if DEBUG
#define LOG(format, args...) console.log(format, ##args)
#else
#define LOG()
#endif

LOG("(%d, %d)", x, y);
LOG("This is awesome!");
```

### Differences from the GNU C Preprocessor

For the supported features mentioned above, the acorn preprocessor implementation is identical in every detail to the GNU C preprocessor, with the following exceptions:

- Preprocessor directives may not be used within macro arguments.

- The only predefined macro is `__OBJJ__`. If the `objj` option is `true`, this macro is defined with the value `1`. If `objj` is `false`, the macro is undefined.

## Errors

When an error occurs, acorn throws a `SyntaxError` with the following attributes:

- **message**: A descriptive message of the error. If the `lineNoInErrorMessage` option is on, the error message will end with `(line:column)`, where `line` is the one-based line number on which the error occurred, and `column` is the zero-based column within that line.
- **line**: The one-based line number on which the error occurred.
- **column**: The zero-based column number within `line`.
- **lineStart**: The zero-based character position of the start of `line`.
- **lineEnd**: The zero-based character position of the end of `line`.
- **fileName**: The value of the `sourceFile` option passed in to acorn,
    or `null` if none was passed in.
