// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// Objective-J extensions written by Martin Carlberg. Preprocessor written by Aparajita Fishman.
//
// Git repository for Acorn with Objective-J and preprocessor support is available at
//
//     https://github.com/cappuccino/acorn.git
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports, require("./util/walk")); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports", "./util/walk"], mod); // AMD
  mod(root.acorn || (root.acorn = {}), root.acorn.walk || (root.acorn.walk = {})); // Plain browser env
})(this, function(exports, walk) {
  "use strict";

  exports.version = "0.5.0";

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api], with the caveat that the SpiderMonkey-specific syntax
  // (`let`, `yield`, inline XML, etc) is not recognized.
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  var options, input, inputLen, sourceFile;

  // When preprocessing, these key functions are routed first to the source versions,
  // which read from the input. On the second pass, they are routed to the postprocess
  // versions, which read tokens from the preprocess token list.

  var readToken, skipSpace, setStrict;

  exports.parse = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    setOptions(opts);
    // By default, we read from source (input)
    readToken = sourceReadToken;
    skipSpace = sourceSkipSpace;
    setStrict = sourceSetStrict;
    if (options.preprocess)
      initPreprocessor(inpt, opts);
    initTokenState();
    return parseTopLevel(options.program);
  };

  // A second optional argument can be given to further configure
  // the parser process. These options are recognized:

  var defaultOptions = exports.defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must
    // be either 3 or 5. This
    // influences support for strict mode, the set of reserved words, and
    // support for getters and setter.
    ecmaVersion: 5,
    // Turn on `strictSemicolons` to prevent the parser from doing
    // automatic semicolon insertion.
    strictSemicolons: false,
    // When `allowTrailingCommas` is false, the parser will not allow
    // trailing commas in array and object literals.
    allowTrailingCommas: true,
    // By default, reserved words are not enforced. Enable
    // `forbidReserved` to enforce them.
    forbidReserved: false,
    // When `trackComments` is turned on, the parser will attach
    // `commentsBefore` and `commentsAfter` properties to AST nodes
    // holding arrays of strings. A single comment may appear in both
    // a `commentsBefore` and `commentsAfter` array (of the nodes
    // after and before it), but never twice in the before (or after)
    // array of different nodes.
    trackComments: false,
    // When `trackCommentsIncludeLineBreak` is turned on, the parser will
    // include, if present, the line break before the comment and all
    // the whitespace in between.
    trackCommentsIncludeLineBreak: false,
    // When `trackSpaces` is turned on, the parser will attach
    // `spacesBefore` and `spacesAfter` properties to AST nodes
    // holding arrays of strings. The same spaces may appear in both
    // a `spacesBefore` and `spacesAfter` array (of the nodes
    // after and before it), but never twice in the before (or after)
    // array of different nodes.
    trackSpaces: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // Turn on objj to allow Objective-J syntax
    objj: true,
    // Turn on the preprocessor.
    preprocess: true,
    // An array of macro objects and/or text definitions may be passed in.
    // Definitions may be in one of two forms:
    //    macro
    //    macro=body
    macros: null,
    // Turn off lineNoInErrorMessage to exclude line number in error messages
    // Needs to be on to run test cases
    lineNoInErrorMessage: true
  };

  function setOptions(opts) {
    options = opts || {};
    for (var opt in defaultOptions) if (!Object.prototype.hasOwnProperty.call(options, opt))
      options[opt] = defaultOptions[opt];
    sourceFile = options.sourceFile || null;
  }

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  var getLineInfo = exports.getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return {line: line, column: offset - cur, lineStart: cur, lineEnd: (match ? match.index + match[0].length : input.length)};
  };

  // Builds a (line:column) string from input & offset or from a token object.

  var makeLineColumnDisplay = exports.makeLineColumnDisplay = function(tokenOrInput, offset) {
    var lineInput, inputOffset;
    if (typeof(tokenOrInput) === "string") {
      lineInput = tokenOrInput;
      inputOffset = offset;
    } else {
      lineInput = tokenOrInput.input;
      inputOffset = tokenOrInput.start;
    }
    var pos = getLineInfo(lineInput, inputOffset);
    return "(" + pos.line + ":" + pos.column + ")";
  }

  // A utility method on Array that clears all of the elements of an existing array.
  // This is currently the fastest way of doing it. For reference: http://jsperf.com/array-destroy/32
  Array.prototype.clear = function() {
    while (this.length > 0) {
      this.shift();
    }
  }

  // Utility method to get the last element of an array
  Array.prototype.last = function() {
    return this[this.length - 1];
  }

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenize` export provides an interface to the tokenizer.
  // Because the tokenizer is optimized for being efficiently used by
  // the Acorn parser itself, this interface is somewhat crude and not
  // very modular. Performing another parse or call to `tokenize` will
  // reset the internal state, and invalidate existing tokenizers.

  function makeToken() {
    var t = {
      input: input,
      start: tokStart,
      end: tokEnd,
      pos: tokPos,
      type: tokType,
      value: tokVal,
      regexpAllowed: tokRegexpAllowed,
      firstTokenOnLine: firstTokenOnLine
    };
    if (options.locations) {
      t.startLoc = tokStartLoc;
      t.endLoc = tokEndLoc;
      t.curLine = tokCurLine;
      t.lineStart = tokLineStart;
    }
    if (options.trackComments) {
      t.comments = tokComments;
      t.commentsBefore = tokCommentsBefore;
      t.commentsAfter = tokCommentsAfter;
      t.lastCommentsAfter = lastTokCommentsAfter;
    }
    if (options.trackSpaces) {
      t.spaces = tokSpaces;
      t.spacesBefore = tokSpacesBefore;
      t.spacesAfter = tokSpacesAfter;
      t.lastSpacesAfter = lastTokSpacesAfter;
    }
    return t;
  }

  exports.tokenize = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    setOptions(opts);
    initTokenState();

    function getToken(forceRegexp) {
      readToken(forceRegexp);
      return makeToken();
    }
    getToken.jumpTo = function(pos, reAllowed) {
      tokPos = pos;
      if (options.locations) {
        tokCurLine = 1;
        tokLineStart = lineBreak.lastIndex = 0;
        var match;
        while ((match = lineBreak.exec(input)) && match.index < pos) {
          ++tokCurLine;
          tokLineStart = match.index + match[0].length;
        }
      }
      tokRegexpAllowed = reAllowed;
      skipSpace();
    };
    return getToken;
  };

  // State is kept in (closure-)global variables. We already saw the
  // `options`, `input`, and `inputLen` variables above.

  // The current position of the tokenizer in the input.

  var tokPos;

  // The start and end offsets of the current token.

  var tokStart, tokEnd;

  // When `options.locations` is true, these hold objects
  // containing the tokens start and end line/column pairs.

  var tokStartLoc, tokEndLoc;

  // The type and value of the current token. Token types are objects,
  // named by variables against which they can be compared, and
  // holding properties that describe them (indicating, for example,
  // the precedence of an infix operator, and the original name of a
  // keyword token). The kind of value that's held in `tokVal` depends
  // on the type of the token. For literals, it is the literal value,
  // for operators, the operator name, and so on.

  var tokType, tokVal;

  // Token input can come from several sources: source code, macros passed
  // on the command line, and synthesized tokens (token pasting, stringification).
  // This variable holds the source to which tokStart and tokEnd point.

  var tokInput;

  // These are used to hold arrays of comments when
  // `options.trackComments` is true.

  var tokCommentsBefore, tokCommentsAfter, lastTokCommentsAfter;

  // These are used to hold arrays of spaces when
  // `options.trackSpaces` is true.

  var tokSpacesBefore, tokSpacesAfter, lastTokSpacesAfter;

  // Interal state for the tokenizer. To distinguish between division
  // operators and regular expressions, it remembers whether the last
  // token was one that is allowed to be followed by an expression.
  // (If it is, a slash is probably a regexp, if it isn't it's a
  // division operator. See the `parseStatement` function for a
  // caveat.)

  var tokRegexpAllowed, tokComments, tokSpaces;

  // When `options.locations` is true, these are used to keep
  // track of the current line, and know when a new line has been
  // entered.

  var tokCurLine, tokLineStart;

  // These store the position of the previous token, which is useful
  // when finishing a node and assigning its `end` position.

  var lastStart, lastEnd, lastEndLoc;

  // This is the tokenizer's state for Objective-J. 'nodeMessageSendObjectExpression'
  // is used to store the expression that is already parsed when a subscript was
  // not really a subscript.

  var nodeMessageSendObjectExpression;

  // This is the parser's state. `inFunction` is used to reject
  // `return` statements outside of functions, `labels` to verify that
  // `break` and `continue` have somewhere to jump to, and `strict`
  // indicates whether strict mode is on.

  var inFunction, labels, strict;

  // This function is used to raise exceptions on parse errors. It
  // takes either a `{line, column}` object or an offset integer (into
  // the current `input`) as `pos` argument. It attaches the position
  // to the end of the error message, and then raises a `SyntaxError`
  // with that message.

  function raise(pos, message) {
    if (typeof pos == "number") pos = getLineInfo(input, pos);
    if (options.lineNoInErrorMessage)
      message += " (" + pos.line + ":" + pos.column + ")";
    var syntaxError = new SyntaxError(message);
    syntaxError.line = pos.line;
    syntaxError.column = pos.column;
    syntaxError.lineStart = pos.lineStart;
    syntaxError.lineEnd = pos.lineEnd;
    syntaxError.fileName = sourceFile;

    throw syntaxError;
  }

  // Reused empty array added for node fields that are always empty.

  var empty = [];

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // These are the general types. The `type` property is only used to
  // make them recognizeable when debugging.

  var _num = {type: "num", preprocess: true}, _regexp = {type: "regexp"}, _string = {type: "string", preprocess: true};
  var _name = {type: "name", preprocess: true}, _eof = {type: "eof"}, _eol = {type: "eol", preprocess: true};

  // Keyword tokens. The `keyword` property (also used in keyword-like
  // operators) indicates that the token originated from an
  // identifier-like word, which is used when parsing property names.
  //
  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true}, _catch = {keyword: "catch"};
  var _continue = {keyword: "continue"}, _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
  var _do = {keyword: "do", isLoop: true}, _else = {keyword: "else", beforeExpr: true};
  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true}, _function = {keyword: "function"};
  var _if = {keyword: "if"}, _return = {keyword: "return", beforeExpr: true}, _switch = {keyword: "switch"};
  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"}, _var = {keyword: "var"};
  var _while = {keyword: "while", isLoop: true}, _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
  var _this = {keyword: "this"};
  var _void = {keyword: "void", prefix: true, beforeExpr: true};

  // The keywords that denote values.

  var _null = {keyword: "null", atomValue: null}, _true = {keyword: "true", atomValue: true, preprocess: true};
  var _false = {keyword: "false", atomValue: false, preprocess: true};

  // Some keywords are treated as regular operators. `in` sometimes
  // (when parsing `for`) needs to be tested against specifically, so
  // we assign a variable name to it for quick comparing.

  var _in = {keyword: "in", binop: 7, beforeExpr: true};

  // Objective-J @ keywords

  var _implementation = {keyword: "implementation"}, _outlet = {keyword: "outlet"}, _accessors = {keyword: "accessors"};
  var _end = {keyword: "end"}, _import = {keyword: "import"};
  var _action = {keyword: "action"}, _selector = {keyword: "selector"}, _class = {keyword: "class"}, _global = {keyword: "global"};
  var _dictionaryLiteral = {keyword: "{"}, _arrayLiteral = {keyword: "["};
  var _ref = {keyword: "ref"}, _deref = {keyword: "deref"};
  var _protocol = {keyword: "protocol"}, _optional = {keyword: "optional"}, _required = {keyword: "required"};
  var _interface = {keyword: "interface"};

  // Objective-J keywords

  var _filename = {keyword: "filename"}, _unsigned = {keyword: "unsigned", okAsIdent: true}, _signed = {keyword: "signed", okAsIdent: true};
  var _byte = {keyword: "byte", okAsIdent: true}, _char = {keyword: "char", okAsIdent: true}, _short = {keyword: "short", okAsIdent: true};
  var _int = {keyword: "int", okAsIdent: true}, _long = {keyword: "long", okAsIdent: true}, _id = {keyword: "id", okAsIdent: true};
  var _preprocess = {keyword: "#"};

  // Preprocessor keywords

  var _preDefine = {keyword: "define"};
  var _preUndef = {keyword: "undef"};
  var _preIfDef = {keyword: "ifdef"};
  var _preIfNdef = {keyword: "ifndef"};
  var _preIf = {keyword: "if"};
  var _preElse = {keyword: "else"};
  var _preEndif = {keyword: "endif"};
  var _preElif = {keyword: "elif"};
  var _prePragma = {keyword: "pragma"};
  var _preError = {keyword: "error"};
  var _preWarning = {keyword: "warning"};

  // Special tokens used within a macro body only

  var _preTokenPaste = {type: "##"};
  var _stringifiedName = {type: "stringified name"};

  // Map keyword names to token types.

  var keywordTypes = {"break": _break, "case": _case, "catch": _catch,
                      "continue": _continue, "debugger": _debugger, "default": _default,
                      "do": _do, "else": _else, "finally": _finally, "for": _for,
                      "function": _function, "if": _if, "return": _return, "switch": _switch,
                      "throw": _throw, "try": _try, "var": _var, "while": _while, "with": _with,
                      "null": _null, "true": _true, "false": _false, "new": _new, "in": _in,
                      "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: true}, "this": _this,
                      "typeof": {keyword: "typeof", prefix: true, beforeExpr: true},
                      "void": _void,
                      "delete": {keyword: "delete", prefix: true, beforeExpr: true} };

  // Map Objective-J keyword names to token types.

  var keywordTypesObjJ = {"IBAction": _action, "IBOutlet": _outlet, "unsigned": _unsigned, "signed": _signed, "byte": _byte, "char": _char,
                          "short": _short, "int": _int, "long": _long, "id": _id };

  // Map Objective-J "@" keyword names to token types.

  var objJAtKeywordTypes = {"implementation": _implementation, "outlet": _outlet, "accessors": _accessors, "end": _end,
                            "import": _import, "action": _action, "selector": _selector, "class": _class, "global": _global,
                            "ref": _ref, "deref": _deref, "protocol": _protocol, "optional": _optional, "required": _required,
                            "interface": _interface};

  // Map Preprocessor keyword names to token types.

  var keywordTypesPreprocessor = {"define": _preDefine, "pragma": _prePragma, "ifdef": _preIfDef,
                                  "ifndef": _preIfNdef, "undef": _preUndef, "if": _preIf, "endif": _preEndif,
                                  "else": _preElse, "elif": _preElif, "error": _preError, "warning": _preWarning};

  // Punctuation token types. Again, the `type` property is purely for debugging.

  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true};
  var _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true, preprocess: true}, _parenR = {type: ")", preprocess: true};
  var _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true};
  var _colon = {type: ":", beforeExpr: true}, _dot = {type: "."}, _question = {type: "?", beforeExpr: true};

  // Objective-J token types

  var _at = {type: "@"}, _dotdotdot = {type: "..."}, _numberSign = {type: "#"};

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator. `isUpdate` specifies that the node produced by
  // the operator should be of type UpdateExpression rather than
  // simply UnaryExpression (`++` and `--`).
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  //
  // `preprocess` marks operators that allowed in #if expressions.

  var _slash = {binop: 10, beforeExpr: true, preprocess: true}, _eq = {isAssign: true, beforeExpr: true};
  var _assign = {isAssign: true, beforeExpr: true};
  var _incDec = {postfix: true, prefix: true, isUpdate: true}, _prefix = {prefix: true, beforeExpr: true, preprocess: true};
  var _logicalOR = {binop: 1, beforeExpr: true, preprocess: true};
  var _logicalAND = {binop: 2, beforeExpr: true, preprocess: true};
  var _bitwiseOR = {binop: 3, beforeExpr: true, preprocess: true};
  var _bitwiseXOR = {binop: 4, beforeExpr: true, preprocess: true};
  var _bitwiseAND = {binop: 5, beforeExpr: true, preprocess: true};
  var _equality = {binop: 6, beforeExpr: true, preprocess: true};
  var _relational = {binop: 7, beforeExpr: true, preprocess: true};
  var _bitShift = {binop: 8, beforeExpr: true, preprocess: true};
  var _plusMin = {binop: 9, prefix: true, beforeExpr: true, preprocess: true};
  var _multiplyModulo = {binop: 10, beforeExpr: true, preprocess: true};

  // Provide access to the token types for external users of the
  // tokenizer.

  exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
                      parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon,
                      dot: _dot, question: _question, slash: _slash, eq: _eq, name: _name, eof: _eof,
                      num: _num, regexp: _regexp, string: _string};
  for (var kw in keywordTypes) exports.tokTypes["_" + kw] = keywordTypes[kw];

  // This is a trick taken from Esprima. It turns out that, on
  // non-Chrome browsers, to check whether a string is in a set, a
  // predicate containing a big ugly `switch` statement is faster than
  // a regular expression, and on Chrome the two are about on par.
  // This function uses `eval` (non-lexical) to produce such a
  // predicate from a space-separated string of words.
  //
  // It starts by sorting the words by length.

  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [];
    out: for (var i = 0; i < words.length; ++i) {
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          continue out;
        }
      cats.push([words[i]]);
    }
    function compareTo(arr) {
      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.

    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";

    // Otherwise, simply generate a flat `switch` statement.

    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }

  exports.makePredicate = makePredicate;

  // The ECMAScript 3 reserved word list.

  var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");

  // ECMAScript 5 reserved words.

  var isReservedWord5 = makePredicate("class enum extends super const export import");

  // The additional reserved words in strict mode.

  var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");

  // The forbidden variable names in strict mode.

  var isStrictBadIdWord = makePredicate("eval arguments");

  // And the keywords.

  var isKeyword = makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this");

  // The Objective-J keywords.

  var isKeywordObjJ = makePredicate("IBAction IBOutlet byte char short int long unsigned signed id");

  // The preprocessor keywords and tokens.

  var isKeywordPreprocessor = makePredicate("define undef pragma if ifdef ifndef else elif endif error warning");

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // Whether a single character denotes a newline.

  var newline = /[\n\r\u2028\u2029]/;

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

  // Test whether a given character code starts an identifier.

  var isIdentifierStart = exports.isIdentifierStart = function(code) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  };

  // Test whether a given character is part of an identifier.

  var isIdentifierChar = exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  };

  // ## Tokenizer

  // These are used when `options.locations` is on, for the
  // `tokStartLoc` and `tokEndLoc` properties.

  function line_loc_t() {
    this.line = tokCurLine;
    this.column = tokPos - tokLineStart;
  }

  // Reset the token state. Used at the start of a parse.

  function initTokenState() {
    tokInput = input;
    tokCurLine = 1;
    tokPos = tokLineStart = 0;
    tokRegexpAllowed = true;
    tokComments = null;
    tokCommentsBefore = null;
    tokCommentsAfter = null;
    lastTokCommentsAfter = null;
    tokSpaces = null;
    preprocessorState = options.preprocess ? preprocessorState_default : 0;
    skipSpace();
    firstTokenOnLine = true;
  }

  // Called at the end of every token. Sets `tokEnd`, `tokVal`,
  // `tokCommentsAfter`, `tokSpacesAfter`, and `tokRegexpAllowed`, and skips the space
  // after the token, so that the next one's `tokStart` will point at
  // the right position.

  function finishToken(type, val) {
    tokEnd = tokPos;
    if (options.locations) tokEndLoc = new line_loc_t;
    tokType = type;
    tokVal = val;
    tokRegexpAllowed = type.beforeExpr;
    skipSpace();
    lastTokCommentsAfter = tokCommentsAfter;
    lastTokSpacesAfter = tokSpacesAfter;
    tokCommentsAfter = tokComments;
    tokSpacesAfter = tokSpaces;
  }

  function skipBlockComment(lastIsNewlinePos) {
    var startLoc = options.onComment && options.locations && new line_loc_t;
    var start = tokPos, end = tokInput.indexOf("*/", tokPos += 2);
    if (end === -1) raise(tokPos - 2, "Unterminated comment");
    tokPos = end + 2;
    if (options.locations) {
      lineBreak.lastIndex = start;
      var match;
      while ((match = lineBreak.exec(input)) && match.index < tokPos) {
        ++tokCurLine;
        tokLineStart = match.index + match[0].length;
      }
    }
    if (options.onComment)
      options.onComment(true, tokInput.slice(start + 2, end), start, tokPos,
                        startLoc, options.locations && new line_loc_t);
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(tokInput.slice(lastIsNewlinePos != null && options.trackCommentsIncludeLineBreak ? lastIsNewlinePos : start, tokPos));
  }

  function skipLineComment(lastIsNewlinePos) {
    var start = tokPos;
    var startLoc = options.onComment && options.locations && new line_loc_t;
    var ch = tokInput.charCodeAt(tokPos+=2);
    while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
      ++tokPos;
      ch = tokInput.charCodeAt(tokPos);
    }
    if (options.onComment)
      options.onComment(false, tokInput.slice(start + 2, tokPos), start, tokPos,
                        startLoc, options.locations && new line_loc_t);
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(tokInput.slice(lastIsNewlinePos != null && options.trackCommentsIncludeLineBreak ? lastIsNewlinePos : start, tokPos));
  }

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and, if `options.trackComments` is on,
  // will store all skipped comments in `tokComments`. If
  // `options.trackSpaces` is on, will store the last skipped spaces in
  // `tokSpaces`.

  function sourceSkipSpace() {
    tokComments = null;
    tokSpaces = null;
    firstTokenOnLine = false;
    var spaceStart = tokPos,
        lastIsNewlinePos;
    for(;;) {
      var ch = tokInput.charCodeAt(tokPos);
      if (ch === 32) { // ' '
        ++tokPos;
      } else if (ch === 13) {
        if ((preprocessorState & preprocessorState_directive) !== 0)
          break;
        lastIsNewlinePos = tokPos;
        ++tokPos;
        var next = tokInput.charCodeAt(tokPos);
        if (next === 10) {
          ++tokPos;
        }
        if (options.locations) {
          ++tokCurLine;
          tokLineStart = tokPos;
        }
        // Inform the preprocessor that we saw eol
        firstTokenOnLine = true;
      } else if (ch === 10 || ch === 8232 || ch === 8233) {
        if ((preprocessorState & preprocessorState_directive) !== 0)
          break;
        lastIsNewlinePos = tokPos;
        ++tokPos;
        if (options.locations) {
          ++tokCurLine;
          tokLineStart = tokPos;
        }
        // Inform the preprocessor that we saw eol
        firstTokenOnLine = true;
      } else if (ch > 8 && ch < 14) {
        ++tokPos;
      } else if (ch === 47) { // '/'
        var next = tokInput.charCodeAt(tokPos + 1);
        if (next === 42) { // '*'
          if (options.trackSpaces)
            (tokSpaces || (tokSpaces = [])).push(tokInput.slice(spaceStart, tokPos));
          skipBlockComment(lastIsNewlinePos);
          spaceStart = tokPos;
        } else if (next === 47) { // '/'
          if (options.trackSpaces)
            (tokSpaces || (tokSpaces = [])).push(tokInput.slice(spaceStart, tokPos));
          skipLineComment(lastIsNewlinePos);
          spaceStart = tokPos;
        } else break;
      } else if (ch === 92 && (preprocessorState & preprocessorState_directive) !== 0) { // '\'
        // The gcc docs say that newline must immediately follow
        ++tokPos;
        var haveNewline = false;
        ch = tokInput.charCodeAt(tokPos);
        lastIsNewlinePos = tokPos;
        if (ch === 10) {
          haveNewline = true;
          ++tokPos;
        }
        else if (ch === 13) {
          haveNewline = true;
          ++tokPos;
          if (tokInput.charCodeAt(tokPos + 1) === 10)
            ++tokPos;
        }
        if (!haveNewline)
          raise(tokPos, "Expected EOL after '\\'");
        if (options.locations) {
          ++tokCurLine;
          tokLineStart = tokPos;
        }
        // Keep reading, the '\' is treated as whitespace
      } else if (ch === 160) { // '\xa0'
        ++tokPos;
      } else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++tokPos;
      } else {
        break;
      }
    }
  }

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  // The `forceRegexp` parameter is used in the one case where the
  // `tokRegexpAllowed` trick does not work. See `parseStatement`.

  function readToken_dot(code) {
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next >= 48 && next <= 57) return readNumber(String.fromCharCode(code));
    if (next === 46 && options.objj && tokInput.charCodeAt(tokPos + 2) === 46) { //'.'
      tokPos += 3;
      return finishToken(_dotdotdot);
    }
    ++tokPos;
    return finishToken(_dot);
  }

  function readToken_slash() { // '/'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (tokRegexpAllowed) {++tokPos; return readRegexp();}
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_slash, 1);
  }

  function readToken_mult_modulo() { // '%*'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_multiplyModulo, 1);
  }

  function readToken_pipe_amp(code) { // '|&'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next === code) return finishOp(code === 124 ? _logicalOR : _logicalAND, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
  }

  function readToken_caret() { // '^'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_bitwiseXOR, 1);
  }

  function readToken_plus_min(code) { // '+-'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next === code) {
      if (next == 45 && tokInput.charCodeAt(tokPos + 2) == 62 &&
          newline.test(tokInput.slice(lastEnd, tokPos))) {
        // A `-->` line comment
        tokPos += 3;
        skipLineComment();
        skipSpace();
        return readToken();
      }
      return finishOp(_incDec, 2);
    }
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_plusMin, 1);
  }

  function readToken_lt_gt(code) { // '<>'
    if (tokType === _import && options.objj && code === 60) {  // '<'
      for (var start = tokPos + 1;;) {
        var ch = tokInput.charCodeAt(++tokPos);
        if (ch === 62)  // '>'
          return finishToken(_filename, tokInput.slice(start, tokPos++));
        if (tokPos >= inputLen || ch === 13 || ch === 10 || ch === 8232 || ch === 8233)
          raise(tokStart, "Unterminated import statement");
      }
    }
    var next = tokInput.charCodeAt(tokPos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && tokInput.charCodeAt(tokPos + 2) === 62 ? 3 : 2;
      if (tokInput.charCodeAt(tokPos + size) === 61) return finishOp(_assign, size + 1);
      return finishOp(_bitShift, size);
    }
    if (next == 33 && code == 60 && tokInput.charCodeAt(tokPos + 2) == 45 &&
        tokInput.charCodeAt(tokPos + 3) == 45) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      tokPos += 4;
      skipLineComment();
      skipSpace();
      return readToken();
    }
    if (next === 61)
      size = tokInput.charCodeAt(tokPos + 2) === 61 ? 3 : 2;
    return finishOp(_relational, size);
  }

  function readToken_eq_excl(code) { // '=!'
    var next = tokInput.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_equality, tokInput.charCodeAt(tokPos + 2) === 61 ? 3 : 2);
    return finishOp(code === 61 ? _eq : _prefix, 1);
  }

  function readToken_at(code) { // '@'
    var next = tokInput.charCodeAt(++tokPos);
    if (next === 34 || next === 39)  // Read string if "'" or '"'
      return readString(next);
    if (next === 123) // Read dictionary literal if "{"
      return finishToken(_dictionaryLiteral);
    if (next === 91) // Read array literal if "["
      return finishToken(_arrayLiteral);

    var word = readWord1(),
        token = objJAtKeywordTypes[word];
    if (!token) raise(tokStart, "Unrecognized Objective-J keyword '@" + word + "'");
    return finishToken(token);
  }

  function getTokenFromCode(code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit.
    case 46: // '.'
      return readToken_dot(code);

      // Punctuation tokens.
    case 40: ++tokPos; return finishToken(_parenL);
    case 41: ++tokPos; return finishToken(_parenR);
    case 59: ++tokPos; return finishToken(_semi);
    case 44: ++tokPos; return finishToken(_comma);
    case 91: ++tokPos; return finishToken(_bracketL);
    case 93: ++tokPos; return finishToken(_bracketR);
    case 123: ++tokPos; return finishToken(_braceL);
    case 125: ++tokPos; return finishToken(_braceR);
    case 58: ++tokPos; return finishToken(_colon);
    case 63: ++tokPos; return finishToken(_question);

      // '0x' is a hexadecimal number.
    case 48: // '0'
      var next = tokInput.charCodeAt(tokPos + 1);
      if (next === 120 || next === 88) return readHexNumber();
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return readNumber(false);

      // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47: // '/'
      return readToken_slash();

    case 37: case 42: // '%*'
      return readToken_mult_modulo();

    case 124: case 38: // '|&'
      return readToken_pipe_amp(code);

    case 94: // '^'
      return readToken_caret();

    case 43: case 45: // '+-'
      return readToken_plus_min(code);

    case 60: case 62: // '<>'
      return readToken_lt_gt(code);

    case 61: case 33: // '=!'
      return readToken_eq_excl(code);

    case 126: // '~'
      return finishOp(_prefix, 1);

    case 64: // '@'
      if (options.objj)
        return readToken_at(code);
      return false;

    case 35: // '#'
      ++tokPos;
      if (options.preprocess) {
        // # within a macro body might be a stringification or it might be ##
        if ((preprocessorState & preprocessorState_directive) !== 0) {
          code = tokInput.charCodeAt(tokPos);
          if (code === 35) {
            ++tokPos;
            return finishToken(_preTokenPaste);
          }
          else
            return readToken_stringify();
        }
        // Preprocessor directives are only valid at the beginning of the line
        if (!firstTokenOnLine)
          raise(--tokPos, "Preprocessor directives may only be used at the beginning of a line");
        return finishToken(_preprocess);
      }
      return false;

    case 10:
    case 13:
    case 8232:
    case 8233:
      if ((preprocessorState & preprocessorState_directive) !== 0) {
        preprocessorState ^= preprocessorState_directive;
        // Inform the preprocessor that we saw eol
        finishToken(_eol);
        return;
      }
    }

    return false;
  }

  function sourceReadToken(forceRegexp) {
    tokCommentsBefore = tokComments;
    tokSpacesBefore = tokSpaces;
    if (!forceRegexp) tokStart = tokPos;
    else tokPos = tokStart + 1;
    if (options.locations) tokStartLoc = new line_loc_t;
    if (forceRegexp) return readRegexp();
    if (tokPos >= inputLen) return finishToken(_eof);

    var code = tokInput.charCodeAt(tokPos);
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code) || (code === 92 /* '\' */ && tokInput.charCodeAt(tokPos + 1) === 117 /* 'u' */)) return readWord();

    var tok = getTokenFromCode(code);

    if (tok === false) {
      // If we are here, we either found a non-ASCII identifier
      // character, or something that's entirely disallowed.
      var ch = String.fromCharCode(code);
      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord();
      raise(tokPos, "Unexpected character '" + ch + "'");
    }
    return tok;
  }

  function finishOp(type, size) {
    var str = tokInput.slice(tokPos, tokPos + size);
    tokPos += size;
    finishToken(type, str);
  }

  // Parse a regular expression. Some context-awareness is necessary,
  // since a '/' inside a '[]' set does not end the expression.

  function readRegexp() {
    var content = "", escaped, inClass, start = tokPos;
    for (;;) {
      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
      var ch = tokInput.charAt(tokPos);
      if (newline.test(ch)) raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++tokPos;
    }
    var content = tokInput.slice(start, tokPos);
    ++tokPos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = readWord1();
    if (mods && !/^[gmsiy]*$/.test(mods)) raise(start, "Invalid regexp flag");
    return finishToken(_regexp, new RegExp(content, mods));
  }

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  function readInt(radix, len) {
    var start = tokPos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = tokInput.charCodeAt(tokPos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++tokPos;
      total = total * radix + val;
    }
    if (tokPos === start || len != null && tokPos - start !== len) return null;

    return total;
  }

  function readHexNumber() {
    tokPos += 2; // 0x
    var val = readInt(16);
    if (val == null) raise(tokStart + 2, "Expected hexadecimal number");
    if (isIdentifierStart(tokInput.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");
    return finishToken(_num, val);
  }

  // Read an integer, octal integer, or floating-point number.

  function readNumber(startsWithDot) {
    var start = tokPos, isFloat = false, octal = tokInput.charCodeAt(tokPos) === 48;
    if (!startsWithDot && readInt(10) === null) raise(start, "Invalid number");
    if (tokInput.charCodeAt(tokPos) === 46) {
      ++tokPos;
      readInt(10);
      isFloat = true;
    }
    var next = tokInput.charCodeAt(tokPos);
    if (next === 69 || next === 101) { // 'eE'
      next = tokInput.charCodeAt(++tokPos);
      if (next === 43 || next === 45) ++tokPos; // '+-'
      if (readInt(10) === null) raise(start, "Invalid number");
      isFloat = true;
    }
    if (isIdentifierStart(tokInput.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");

    var str = tokInput.slice(start, tokPos), val;
    if (isFloat) val = parseFloat(str);
    else if (!octal || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return finishToken(_num, val);
  }

  // Read a string value, interpreting backslash-escapes.

  var rs_str = [];

  function readString(quote) {
    tokPos++;
    var out = "";
    for (;;) {
      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
      var ch = tokInput.charCodeAt(tokPos);
      if (ch === quote) {
        ++tokPos;
        return finishToken(_string, out);
      }
      if (ch === 92) { // '\'
        ch = tokInput.charCodeAt(++tokPos);
        var octal = /^[0-7]+/.exec(tokInput.slice(tokPos, tokPos + 3));
        if (octal) octal = octal[0];
        while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
        if (octal === "0") octal = null;
        ++tokPos;
        if (octal) {
          if (strict) raise(tokPos - 2, "Octal literal in strict mode");
          out += String.fromCharCode(parseInt(octal, 8));
          tokPos += octal.length - 1;
        } else {
          switch (ch) {
          case 110: out += "\n"; break; // 'n' -> '\n'
          case 114: out += "\r"; break; // 'r' -> '\r'
          case 120: out += String.fromCharCode(readHexChar(2)); break; // 'x'
          case 117: out += String.fromCharCode(readHexChar(4)); break; // 'u'
          case 85: out += String.fromCharCode(readHexChar(8)); break; // 'U'
          case 116: out += "\t"; break; // 't' -> '\t'
          case 98: out += "\b"; break; // 'b' -> '\b'
          case 118: out += "\u000b"; break; // 'v' -> '\u000b'
          case 102: out += "\f"; break; // 'f' -> '\f'
          case 48: out += "\0"; break; // 0 -> '\0'
          case 13: if (tokInput.charCodeAt(tokPos) === 10) ++tokPos; // '\r\n'
          case 10: // ' \n'
            if (options.locations) { tokLineStart = tokPos; ++tokCurLine; }
            break;
          default: out += String.fromCharCode(ch); break;
          }
        }
      } else {
        if (ch === 13 || ch === 10 || ch === 8232 || ch === 8233) raise(tokStart, "Unterminated string constant");
        out += String.fromCharCode(ch); // '\'
        ++tokPos;
      }
    }
  }

  // Used to read character escape sequences ('\x', '\u', '\U').

  function readHexChar(len) {
    var n = readInt(16, len);
    if (n === null) raise(tokStart, "Bad character escape sequence");
    return n;
  }

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.

  var containsEsc;

  // Read an identifier, and return it as a string. Sets `containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Only builds up the word character-by-character when it actually
  // containeds an escape, as a micro-optimization.

  function readWord1() {
    containsEsc = false;
    var word, first = true, start = tokPos;
    for (;;) {
      var ch = tokInput.charCodeAt(tokPos);
      if (isIdentifierChar(ch)) {
        if (containsEsc) word += tokInput.charAt(tokPos);
        ++tokPos;
      } else if (ch === 92) { // "\"
        // If we are in a directive, "\" is a line continuation
        if ((preprocessorState & preprocessorState_directive) !== 0)
          break;
        if (!containsEsc) word = tokInput.slice(start, tokPos);
        containsEsc = true;
        if (tokInput.charCodeAt(++tokPos) != 117) // "u"
          raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
        ++tokPos;
        var esc = readHexChar(4);
        var escStr = String.fromCharCode(esc);
        if (!escStr) raise(tokPos - 1, "Invalid Unicode escape");
        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
          raise(tokPos - 4, "Invalid Unicode escape");
        word += escStr;
      } else {
        break;
      }
      first = false;
    }
    return containsEsc ? word : tokInput.slice(start, tokPos);
  }

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary. Argument preReadWord is used to concatenate
  // The word is then passed in from caller.

  function readWord(preReadWord) {
    var word = preReadWord || readWord1();
    var type = _name;
    if (!containsEsc) {
      if (options.preprocess) {
        if (tokType === _preprocess && isKeywordPreprocessor(word)) {
          preprocessorState |= preprocessorState_directive;
          return finishToken(keywordTypesPreprocessor[word], word);
        }
        else if (!preSkipping && (preprocessorState & preprocessorState_expandMacros) !== 0) {
          var macro;
          if ((macro = getMacro(word)) != null)
            return expandMacro(macro, tokenStream);
        }
      }
      if (isKeyword(word)) type = keywordTypes[word];
      else if (options.objj && isKeywordObjJ(word)) type = keywordTypesObjJ[word];
      else if (options.forbidReserved &&
               (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(word) ||
               strict && isStrictReservedWord(word))
        raise(tokStart, "The keyword '" + word + "' is reserved");
    }
    return finishToken(type, word);
  }

  // ## Preprocessor

  // We need to keep track of what state the preprocessor is in. The following are bit flags
  // that indicate various states we use to control the behavior of the lexer/parser.

  var preprocessorState;
  var preprocessorState_expandMacros   = 1 << 0;  // Determines whether macro names are looked up and expanded
  var preprocessorState_directive      = 1 << 1;  // Within a preprocessor directive
  var preprocessorState_macroExpansion = 1 << 2;  // Expanding a macro call

  // Default state when not handling preprocessor directives

  var preprocessorState_default = preprocessorState_expandMacros;

  // When expanding a macro, the tokens are stored in this array.
  // It is switched to point to macro arguments and macro body token streams
  // at various points during expansion.

  var tokenStream;

  // When reading from a token stream, this index points to the next
  // token that will be returned from the current token stream.

  var tokenStreamIndex;

  // Preprocessor directives may only occur as the first token on a line.
  // We use this to track whether the next token is the first on the line.

  var firstTokenOnLine;

  // When a macro is expanded, this stack stores state information.

  var macroStack;

  // When a macro is expanded, the generated tokens go into this array.

  var macroTokens;

  // The preprocessor uses this function pointer returned by exports.tokenize
  // in several places to get the next token.

  var preprocessorGetToken;

  // We use these to track orphaned comments/spaces that occur before/after preprocessor directives.

  var orphanedComments, orphanedSpaces;

  // Definitions for predefined macros.

  var predefinedMacros = {
    "__OBJJ__": function() { return options.objj ? "1" : undefined},
    "__BROWSER__": function() { return (typeof(window) !== "undefined") ? "1" : undefined}
  };

  // Contains a hash of macro names to Macro objects.

  var macros;

  // Used to track the nesting of #if/#ifdef/#ifndef directives. Each element stores state info:
  //    pos: position of # in the #if, for error reporting if an unbalanced #else/#endif is found
  //    state: preIf or preElse
  //    skipping: true if the #if expression evaluated to false

  var preIfStack;

  // When skipping to #else/#endif, we set this flag.

  var preSkipping;

  // The state of an #if. When an #if is waiting for an #else or #endif, it is preIf.
  // When there was an #else, it's preElse.

  var preIf = 0;
  var preElse = 1;

  // A macro object. Note that a macro can have no parameters but still
  // be a function macro if it is defined with an empty parameter list.

  var Macro = exports.Macro = function Macro(name, parameters, parameterMap, isFunction, isVariadic, tokens) {
    this.name = name;
    // Tell the parameter its index, so when we lookup a parameter by name, we know its positional index
    for (var i = 0; i < parameters.length; ++i)
      parameters[i].index = i;
    this.parameters = parameters;
    this.parameterMap = parameterMap;
    this.isFunction = isFunction;
    this.isVariadic = isVariadic;
    this.tokens = tokens;
  }

  Macro.prototype.isParameter = function(name) {
    return this.parameterMap[name] !== undefined;
  }

  Macro.prototype.getParameterByName = function(name) {
    return this.parameterMap[name];
  }

  Macro.prototype.getName = function() {
    return this.name;
  }

  function initPreprocessor(inpt, opts) {
    macros = Object.create(null);
    macroStack = [];
    macroTokens = [];
    tokenStream = macroTokens;
    tokenStreamIndex = 0;
    orphanedComments = null;
    orphanedSpaces = null;
    preIfStack = [];
    preSkipping = false;
    preprocessorGetToken = exports.tokenize(inpt, opts);
    if (options.macros == null)
      options.macros = [];
    addPredefinedMacros();
    defineMacros(options.macros, false);
  }

  function addPredefinedMacros() {
    var names = Object.keys(predefinedMacros);
    var definitions = [];
    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      var definition = predefinedMacros[name];
      if (definition) {
        if (typeof(definition) === "function") {
          definition = definition();
          if (definition == null)
            continue;
        }
        definitions.push(name + "=" + definition);
      }
      else
        definitions.push(name);
    }
    defineMacros(definitions, true);
  }

  /*
    Defines a macro from an array of macro objects and/or text definitions in one of two formats:

    macro
    macro=body

    In the first case, the macro is defined with the value 1.
    In the second case, it must pass the normal parsing rules for macros.
  */
  function defineMacros(definitions, predefined) {
    for (var i = 0; i < definitions.length; ++i) {
      var macro = definitions[i];
      if (typeof(macro) === "string") {
        defineMacro(macro, predefined);
      }
      else {
        if (!predefined && predefinedMacros.hasOwnProperty(macro.name))
          raise(0, "'" + macro.name + "' is a predefined macro name");
        else
          macros[macro.name] = macro;
      }
    }
  }

  function defineMacro(definition, predefined) {
    var savedInput = input;
    definition = definition.trim();
    var pos = definition.indexOf("=");
    if (pos === 0)
      raise(0, "Invalid macro definition: '" + definition + "'");
    // If there is no macro body, define the name with the value 1
    var name, body;
    if (pos > 0) {
      name = definition.slice(0, pos);
      body = definition.slice(pos + 1);
    }
    else {
      name = definition;
      body = "1";
    }
    if (!predefined && predefinedMacros.hasOwnProperty(name))
      raise(0, "'" + name + "' is a predefined macro name");
    // Construct a definition that parseDefine can digest
    input = name + " " + body;
    inputLen = input.length;
    initTokenState();
    parseDefine();
    input = savedInput;
    inputLen = input.length;
  }

  function addMacro(macro) {
    var old = macros[macro.name];
    if (old != null) {
      // GCC preprocessor docs section 3.8 say that macros are effectively the same if:
      // - Both are the same type (object/function)
      // - All of the tokens are the same
      // - Parameters (if any) are the same
      var same = true;
      if (old.isFunction === macro.isFunction &&
          old.isVariadic === macro.isVariadic &&
          old.parameters.length === macro.parameters.length &&
          old.tokens.length === macro.tokens.length)
      {
        // Check parameters first if they are function macros
        if (old.isFunction) {
          for (var i = 0; i < old.parameters.length; ++i) {
            if (old.parameters[i].type !== macro.parameters[i].type ||
                old.parameters[i].value !== macro.parameters[i].value)
            {
              same = false;
              break;
            }
          }
        }
        // Now check the body if necessary
        if (same) {
          for (var i = 0; i < old.tokens.length; ++i) {
            if (old.tokens[i].type !== macro.tokens[i].type ||
                old.tokens[i].value !== macro.tokens[i].value)
            {
              same = false;
              break;
            }
          }
        }
      }
      else
        same = false;
      if (!same)
        console.warn("Warning: redefining the macro \"" + macro.name + "\"");
    }
    macros[macro.name] = macro;
  }

  function getMacro(name) {
    return macros[name];
  }

  function undefineMacro(name) {
    delete macros[name];
  }

  function isMacro(name) {
    return macros[name] !== undefined;
  }

  // Returns an array of the non-predefined Macro objects

  exports.getMacros = function() {
    var list = [];
    if (macros !== null) {
      for (var name in macros)
        if (!predefinedMacros.hasOwnProperty(name))
          list.push(macros[name]);
    }
    return list;
  }

  function setToken(t) {
    tokInput = t.input;
    tokStart = t.start;
    tokEnd = t.end;
    tokPos = t.pos;
    tokType = t.type;
    tokVal = t.value;
    tokRegexpAllowed = t.regexpAllowed;
    firstTokenOnLine = t.firstTokenOnLine;
    if (options.locations) {
      tokStartLoc = t.startLoc;
      tokEndLoc = t.endLoc;
      tokCurLine = t.curLine;
      tokLineStart = t.lineStart;
    }
    if (options.trackComments) {
      tokComments = t.comments;
      tokCommentsBefore = t.commentsBefore
      tokCommentsAfter = t.commentsAfter;
      lastTokCommentsAfter = t.lastCommentsAfter;
    }
    if (options.trackSpaces) {
      tokSpaces = t.spaces;
      tokSpacesBefore = t.spacesBefore;
      tokSpacesAfter = t.spacesAfter;
      lastTokSpacesAfter = t.lastSpacesAfter;
    }
  }

  function streamReadToken() {
    if (tokenStreamIndex < tokenStream.length) {
      setToken(tokenStream[tokenStreamIndex++]);
      // If we exhaust the tokens and we are reading from the macro tokens,
      // it's time to go back to reading from source and advance.
      if (tokenStreamIndex === tokenStream.length && tokenStream === macroTokens) {
        readToken = sourceReadToken;
        skipSpace = sourceSkipSpace;
        setStrict = sourceSetStrict;
      }
    }
    else
      finishToken(_eof);
  }

  function streamSkipSpace() { }

  function streamSetStrict(strct) {
    strict = strct;
  }

  // Parses a macro definition following #define and returns a Macro object

  function parseDefine() {
    next();
    var nameStart = tokStart;
    var nameEnd = tokEnd;
    var name = tokVal;
    expect(_name, "Expected a name after #define");
    if (name === "__VA_ARGS__")
      raise(nameStart, "__VA_ARGS__ may only be used within the body of a variadic macro");
    else if (name === "defined")
      raise(nameStart, "'defined' may not be used as a macro name");
    var parameters = [];
    var parameterMap = Object.create(null);  // Don't inherit from Object
    var isFunction = false;
    var isVariadic = false;
    var variadicParameterName = "__VA_ARGS__";
    // '(' Must follow directly after identifier to be a valid macro with parameters
    if (tokInput.charCodeAt(nameEnd) === 40) { // '('
      // Read macro parameters
      expect(_parenL);
      isFunction = true;
      var expectComma = false;
      scanParameters:
      while (tokType !== _parenR) {
        if (expectComma) {
          expect(_comma, "Expected ',' between macro parameters");
          expectComma = false;
        }
        else {
          switch (tokType) {
            case _name:
              var argName = tokVal;
              if (argName === "__VA_ARGS__")
                raise(tokStart, "__VA_ARGS__ may only be used within the body of a variadic macro");
              if (parameterMap[argName] !== undefined)
                raise(tokStart, "'" + argName + "' has already been used as a parameter name");
              next();
              // If a name is followed by ..., it means the variadic args are named
              if (tokType === _dotdotdot) {
                variadicParameterName = argName;
                continue;
              }
              else {
                var parameter = {
                  name: argName,
                  expand: false,
                  stringify: false,
                  variadic: false
                };
                parameters.push(parameter);
                parameterMap[parameter.name] = parameter;
                expectComma = true;
                break;
              }

            case _dotdotdot:
              isVariadic = true;
              var parameter = {
                name: variadicParameterName,
                expand: false,
                stringify: false,
                variadic: true
              };
              parameters.push(parameter);
              parameterMap[parameter.name] = parameter;
              next();
              if (tokType !== _parenR)
                raise(tokStart, "Expect ')' after ... in a macro parameter list");
              break scanParameters;

            default:
              raise(tokStart, "Unexpected token in macro parameters");
          }
        }
      }
      next();
    }
    var tokens = [];
    // Read macro body tokens until eof or eol that is not preceded by '\'
    scanBody:
    for (;;) {
      var token = makeToken();
      switch (tokType) {
        case _name:
        case _stringifiedName:
          if (isVariadic) {
            var lastName = parameters.last().name;
            if (lastName !== "__VA_ARGS__" && tokVal === "__VA_ARGS__")
              raise(tokStart, "__VA_ARGS__ may not be used when there are named variadic parameters");
            // If the previous tokens were some value, a comma, and ##, and this token is the variadic
            // parameter name, remove the ## token and mark this token as deleting a previous comma
            // if no variadic args are passed.
            if (lastName === variadicParameterName && parameters.length > 1 &&
                tokens.length >= 3 &&
                tokens.last().type === _preTokenPaste &&
                tokens[tokens.length - 2].type === _comma)
            {
              tokens.pop();
              token.deletePreviousComma = true;
            }
          }
          else if (tokVal === "__VA_ARGS__")
            raise(tokStart, "__VA_ARGS__ may only be used within the body of a variadic macro");
          break;

        case _eol:
        case _eof:
          break scanBody;
      }
      tokens.push(token);
      next();
    }
    // ## cannot be at the beginning or end
    if (tokens.length > 0) {
      if (tokens[0].type === _preTokenPaste)
        raise(tokens[0].start, "## may not be at the beginning of a macro");
      else if (tokens.last().type === _preTokenPaste)
        raise(tokens.last().start, "## may not be at the end of a macro");
    }
    addMacro(new Macro(name, parameters, parameterMap, isFunction, isVariadic, tokens));
  }

  function expectedPreEndif(pos, ifState, saw) {
    raise(pos, "Expected #endif for #" + ifState.type.keyword + " at " + makeLineColumnDisplay(ifState.input, ifState.pos) + ", saw #" + saw);
  }

  function parsePreIf() {
    var startPos = tokStart;
    var type = tokType;
    var state;
    if (type === _preElif) {
      if (preIfStack.length === 0)
        raise(startPos, "#elif with unmatched #if");
      state = preIfStack.last();
      if (state.phase === preElse)
        expectedPreEndif(startPos, state, "elif");
      // If we were skipping, don't skip until we evaluate the expression.
      // If we were not skipping, we will skip now.
      preSkipping = state.skipping = !state.skipping;
    }
    else {
      state = {type: type, input: tokInput, pos: startPos, phase: preIf, skipping: false};
      preIfStack.push(state);
    }
    if (preSkipping) {
      skipToEOL();
      return;
    }
    var value;
    if (type === _preIf || type === _preElif) {
      var expr = parsePreprocessExpression();
      value = preprocessEvalExpression(expr);
    }
    else if (type === _preIfDef || type === _preIfNdef) {
      next();
      if (tokType !== _name)
        raise(tokStart, "Expected a name after #" + type.keyword);
      value = isMacro(tokVal);
      if (type === _preIfNdef)
        value = !value;
      next();
    }
    if (tokType !== _eol)
      raise(startPos, "#" + type.keyword + " expressions must be followed by the token EOL");
    preSkipping = state.skipping = !value;
  }

  function parsePreElse() {
    var startPos = tokStart;
    next();
    if (tokType !== _eol)
      raise(startPos, "#else must be followed by the token EOL");
    if (preIfStack.length > 0) {
      var state = preIfStack.last();
      if (state.phase === preElse)
        expectedPreEndif(startPos, state, "else");
      state.phase = preElse;
      preSkipping = state.skipping = !state.skipping;
    }
    else
      raise(startPos, "#else without matching #if");
  }

  function parsePreEndif() {
    var startPos = tokStart;
    next();
    if (tokType !== _eol)
      raise(startPos, "#endif must be followed by the token EOL");
    if (preIfStack.length > 0) {
      preIfStack.pop();
      // If this ended a nested #if, we resume the skipping state
      // of the next #if up the stack.
      preSkipping = preIfStack.length > 0 ? preIfStack.last().skipping : false;
    }
    else
      raise(startPos, "#endif without matching #if");
  }

  function parsePreDiagnostic(type) {
    var startPos = tokStart;
    var expr = parsePreprocessExpression();
    if (tokType !== _eol)
      raise(startPos, "#" + type.keyword + " expressions must be followed by the token EOL");
    var message = String(preprocessEvalExpression(expr));
    if (type === _preError)
      raise(startPos, "Error: " + message);
    else
      console.warn("Warning: " + message);
  }

  function parsePreprocess() { // '#'
    /*
      If there are lastTokCommentsAfter at this point, it means one of two things:

      1. There was a statement before this preprocessor directive in the same block,
         and lastTokCommentsAfter belong to that statement's node.
      2. There was no statement before this directive.

      In the case of #2, the comments have to be accumulated so they can be attached
      to the next node that comes along.
    */
    if (lastTokCommentsAfter != null) {
      if (!preSkipping && orphanedComments == null && (lastFinishedNode == null || lastFinishedNode.commentsAfter == null))
        Array.prototype.push.apply(orphanedComments = [], lastTokCommentsAfter);
    }
    else
      orphanedComments = null;

    // Same as above, but for spaces
    if (lastTokSpacesAfter != null) {
      if (!preSkipping && orphanedSpaces == null && (lastFinishedNode == null || lastFinishedNode.spacesAfter == null))
        Array.prototype.push.apply(orphanedSpaces = [], lastTokSpacesAfter);
    }
    else
      orphanedSpaces = null;
    // By default, macro expansion is off when processing preprocessor directives
    preprocessorState &= ~preprocessorState_expandMacros;
    preprocessorState |= preprocessorState_directive;
    next();
    var directive = tokType;
    switch (directive) {
      case _preDefine:
        if (preSkipping)
          skipToEOL();
        else
          parseDefine();
        break;

      case _preUndef:
        if (preSkipping)
          skipToEOL();
        else {
          next();
          var name = tokVal;
          expect(_name, "Expected a name after #undef");
          undefineMacro(name);
        }
        break;

      case _preIf:
      case _preIfDef:
      case _preIfNdef:
      case _preElif:
        parsePreIf();
        break;

      case _preElse:
        parsePreElse();
        break;

      case _preEndif:
        parsePreEndif();
        break;

      case _prePragma:
        skipToEOL();
        break;

      case _preError:
      case _preWarning:
        if (preSkipping)
          skipToEOL();
        else
          parsePreDiagnostic(directive);
        break;

      default:
        raise(tokStart, "Invalid preprocessing directive: '" + tokVal + "'");
    }

    // If we are EOF at this point and something is left on the if stack, it was unterminated.
    if (tokType === _eof && preIfStack.length > 0)
      raise(preIfStack[0].pos, "Unterminated #" + preIfStack[0].type.keyword + " at EOF");

    preprocessorState = preprocessorState_default;

    // Eat the EOL that should terminate every directive. We have to wait until this point
    // to do it so that the preprocessorState will allow a directive on the next line to be recognized.
    next();

    if (preSkipping)
      skipToNextPreDirective();

    if (options.trackComments && !preSkipping) {
      /*
        If there are orphaned comments, there are a few states we could be in:

        1. tokCommentsBefore != null, which means there is another orphan comment,
           so append it to the orphans.
        2. The lastFinishedNode has no commentsAfter, which means there are no more
           orphans to accumulate, and they will be attached to the next node.
        3. The last finished node has commentsAfter, which means the orphanedComments
           actually belong to that previous node.
      */
      if (orphanedComments != null) {
        if (tokCommentsBefore != null)
          Array.prototype.push.apply(orphanedComments, tokCommentsBefore);
        if (lastFinishedNode == null || lastFinishedNode.commentsAfter == null)
          tokCommentsBefore = orphanedComments;
        else {
          Array.prototype.push.apply(lastFinishedNode.commentsAfter, orphanedComments);
          tokCommentsBefore = lastFinishedNode.commentsAfter;
        }
      }
      /*
        If we were not skipping and there are no orphaned comments and there is a lastFinishedNode:

        If there were comments after the preprocessor directive,
        then append those comments to the lastFinishedNode's commentsAfter.

        Then set tokCommentsBefore to the lastFinishedNode's commentsAfter, so that
        the next node will pick them up as commentsBefore.
      */
      else if (lastFinishedNode != null) {
        if (tokCommentsBefore != null)
          Array.prototype.push.apply(lastFinishedNode.commentsAfter || (lastFinishedNode.commentsAfter = []), tokCommentsBefore);
        tokCommentsBefore = lastFinishedNode.commentsAfter;
      }
    }

    // Same as above, but for spaces
    if (options.trackSpaces && !preSkipping) {
      if (orphanedSpaces != null) {
        if (tokSpacesBefore != null)
          Array.prototype.push.apply(orphanedSpaces, tokSpacesBefore);
        if (lastFinishedNode == null || lastFinishedNode.spacesAfter == null)
          tokSpacesBefore = orphanedSpaces;
        else {
          Array.prototype.push.apply(lastFinishedNode.spacesAfter, orphanedSpaces);
          tokSpacesBefore = lastFinishedNode.spacesAfter;
        }
      }
      else if (lastFinishedNode != null) {
        if (tokSpacesBefore != null)
          Array.prototype.push.apply(lastFinishedNode.spacesAfter || (lastFinishedNode.spacesAfter = []), tokSpacesBefore);
        tokSpacesBefore = lastFinishedNode.spacesAfter;
      }
    }

    if (tokType === _name) {
      // If the current token at this point is a name, it could be a macro because macro names
      // are not looked up during directive handling. We have to wait until now to expand the macro
      // to ensure it is defined and that comments/spaces before it are handled correctly.
      var macro;
      if ((macro = getMacro(tokVal)) != null)
        expandMacro(macro, tokenStream);
    }
  }

  function skipToEOL() {
    for (;;) {
      readToken();
      if (tokType === _eol || tokType === _eof)
        return;
    }
  }

  function skipToNextPreDirective() {
    preSkipping = true;
    for (;;) {
      if (tokType === _preprocess || tokType === _eof)
          return;
      readToken();
    }
  }

  /*
    #if expression parser. The GCC docs state that the expression is of integer
    (which in C is also boolean) type and may contain:

    - Integer constants.

    - Arithmetic operators for addition, subtraction, multiplication, division,
      bitwise operations, shifts, comparisons, and logical operations (&& and ||).
      The latter two obey the usual short-circuiting rules of standard C.

    - Macros. All macros in the expression are expanded before actual computation
      of the expression's value begins.

    - Uses of the `defined` operator, which lets you check whether macros are defined
      in the middle of an `#if'.

    - Identifiers that are not macros, which are all considered to be the number zero.
      This allows you to write #if MACRO instead of #ifdef MACRO, if you know that MACRO,
      when defined, will always have a nonzero value. Function-like macros used without
      their function call parentheses are also treated as zero.

    We extend this syntax to allow:

    - String literals.

    The functions below are analogous to their parseX equivalents, but with the
    syntax restrictions mentioned above.
  */

  function parsePreprocessExpression() {
    // When parsing the expression, we want macro expansion
    preprocessorState |= preprocessorState_expandMacros;
    // During preprocessor expression parsing, we don't want finishNode to do
    // comment or space tracking, so we point it to our own specialized version.
    var savedFinishNode = finishNode;
    finishNode = preprocessFinishNode;

    next();
    var expr = preprocessParseExpression();

    finishNode = savedFinishNode;
    preprocessorState &= ~preprocessorState_expandMacros;
    return expr;
  }

  function preprocessFinishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    return node;
  }

  function preprocessParseExpression() {
    return preprocessParseExprOps();
  }

  function preprocessParseExprOps() {
    return preprocessParseExprOp(preprocessParseMaybeUnary(), -1);
  }

  function preprocessParseExprOp(left, minPrec) {
    var prec = tokType.binop;
    if (prec) {
      // Only operators marked with a preprocessor attribute are allowed
      if (tokType.preprocess == null)
        raise(tokStart, "Invalid #if expression operator: '" + tokVal + "'");
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = tokVal;
        var op = tokType;
        next();
        node.right = preprocessParseExprOp(preprocessParseMaybeUnary(), prec);
        finishNode(node, (op === _logicalAND || op === _logicalOR) ? "LogicalExpression" : "BinaryExpression");
        return preprocessParseExprOp(node, minPrec);
      }
    }
    return left;
  }

  function preprocessParseMaybeUnary() {
    if (tokType.preprocess && tokType.prefix) {
      var node = startNode();
      node.operator = tokVal;
      node.prefix = true;
      next();
      node.argument = preprocessParseMaybeUnary();
      return finishNode(node, "UnaryExpression");
    }
    return preprocessParseExprAtom();
  }

  function preprocessParseExprAtom() {
    var node;
    switch (tokType) {
      case _name:
        // We have to temporarily turn macro expansion off when we call parseIdent(),
        // because it does next(), and if the name is "defined", the name after that
        // should be a macro, and we don't want that to be expanded.
        preprocessorState &= ~preprocessorState_expandMacros;
        node = parseIdent();
        if (isMacro(node.name)) {
          // If we have a name which is a macro name, that means it was a function
          // macro that had no arguments, and it is treated as the literal 0.
          node.type = "Literal";
          node.value = 0;
          node.raw = "0";
        }
        else if (node.name === "defined")
          node = preprocessParseDefined(node);
        else if (node.name === "undefined")
          raise(node.start, "Invalid #if expression token: '" + node.name + "'");
        // We can resume macro expansion now
        preprocessorState |= preprocessorState_expandMacros;
        break;

      case _num:
        // Only integer values are allowed
        if (/^\d+$/.test(tokVal.toString()))
          node = parseStringNumRegExpLiteral();
        else
          raise(tokStart, "Non-integer number in #if expression");
        break;

      case _string:
        node = parseStringNumRegExpLiteral();
        break;

      case _true:
      case _false:
        var node = startNode();
        node.value = tokType.atomValue;
        node.raw = tokType.keyword;
        next();
        return finishNode(node, "Literal");

      case _parenL:
        var tokStart1 = tokStart;
        next();
        node = preprocessParseExpression();
        node.start = tokStart1;
        node.end = tokEnd;
        expect(_parenR, "Expected closing ')' in #if expression");
        break;

      default:
        raise(tokStart, "Invalid #if expression token: '" + tokVal + "'");
    }
    return node;
  }

  function preprocessParseDefined(node) {
    var newNode = startNodeFrom(node);
    var haveParens = tokType === _parenL;
    if (haveParens)
      next();
    if (tokType !== _name)
      raise(tokStart, "Expected a name following 'defined'");
    newNode.name = tokVal;
    next();
    if (haveParens)
      expect(_parenR, "')' expected after macro name");
    return finishNode(newNode, "DefinedExpression");
  }

  function preprocessEvalExpression(expr) {
    return walk.recursive(expr, {}, {
      UnaryExpression: function(node, st, c) {
        switch (node.operator) {
          case "-":
            return -c(node.argument, st);

          case "+":
            return +c(node.argument, st);

          case "!":
            return !c(node.argument, st);

          case "~":
            return ~c(node.argument, st);
        }
      },
      BinaryExpression: function(node, st, c) {
        var left = node.left, right = node.right;
        switch (node.operator) {
          case "+":
            return c(left, st) + c(right, st);

          case "-":
            return c(left, st) - c(right, st);

          case "*":
            return c(left, st) * c(right, st);

          case "/":
            return c(left, st) / c(right, st);

          case "%":
            return c(left, st) % c(right, st);

          case ">>":
            return c(left, st) >> c(right, st);

          case ">>>":
            return c(left, st) >>> c(right, st);

          case "<<":
            return c(left, st) << c(right, st);

          case "<":
            return c(left, st) < c(right, st);

          case ">":
            return c(left, st) > c(right, st);

          case "==":
            return c(left, st) == c(right, st);

          case "===":
            return c(left, st) === c(right, st);

          case "!=":
            return c(left, st) != c(right, st);

          case "!==":
            return c(left, st) !== c(right, st);

          case "<=":
            return c(left, st) <= c(right, st);

          case ">=":
            return c(left, st) >= c(right, st);

          case "&":
            return c(left, st) & c(right, st);

          case "|":
            return c(left, st) | c(right, st);

          case "^":
            return c(left, st) ^ c(right, st);
        }
      },
      LogicalExpression: function(node, st, c) {
        var left = node.left, right = node.right;
        switch (node.operator) {
          case "||":
            return c(left, st) || c(right, st);

          case "&&":
            return c(left, st) && c(right, st);
        }
      },
      Literal: function(node, st, c) {
        return node.value;
      },
      Identifier: function(node, st, c) {
        return isMacro(node.name) ? 1 : 0;
      },
      DefinedExpression: function(node, st, c) {
        return isMacro(node.name);
      }
    }, {});
  }

  function pushMacro(macro, context) {
    var state;
    if (context == null) {
      // If we are reading from source, clear macroTokens to receive a new expansion
      macroTokens.clear();
      tokenStreamIndex = 0;
      state = {
        macro: macro,
        lastStart: lastStart,
        lastEnd: lastEnd
      };
    } else {
      state = {
        macro: macro,
        readToken: readToken,
        skipSpace: skipSpace,
        setStrict: setStrict,
        tokenStream: tokenStream,
        tokenStreamIndex: tokenStreamIndex
      };
      tokenStream = context.tokens;
      tokenStreamIndex = context.tokenIndex;
    }
    macroStack.push(state);
    // If we are nested, we are reading from a token stream, not input
    if (macroStack.length === 2) {
      readToken = streamReadToken;
      skipSpace = streamSkipSpace;
      setStrict = streamSetStrict;
    }
  }

  function popMacro(context) {
    var state = macroStack.pop();
    if (context != null) {
      // Communicate to the macro caller where we stopped parsing its token stream.
      context.tokenIndex = tokenStreamIndex - 1;
      readToken = state.readToken;
      skipSpace = state.skipSpace;
      setStrict = state.setStrict;
      tokenStream = state.tokenStream;
      tokenStreamIndex = state.tokenStreamIndex;
    }
  }

  // Check to see if a macro reference in a macro body is recursive.
  // Note that macro calls during argument expansion are not included in the check.

  function isMacroSelfReference(macro) {
    var count = macroStack.length;
    while (count--) {
      if (macroStack[count].macro === macro)
        return true;
    }
    return false;
  }

  /*
    When we expand a macro from source, we have to stitch replace the macro invocation tokens
    with the tokens generated by expanding the macro. So here is the strategy:

    - When we get to here, the state is as follows:

      tokPos: end of the macro name
      tokType: type of the previous token
      lastStart, lastEnd: start/end of the previous token

    - Save lastStart, lastEnd.
    - Call finishToken() and save the state of the macro name token.
    - Parse the macro's args (if any). At that point we will have reached the token
      after the last token in the macro call:

      tokPos: end of the token
      tokType: type of the token
      lastStart, lastEnd: start/end of the last token in the macro call

    - If the macro is a function macro but did not have any arguments, it will be inserted
      as a regular name, in which case we don't do anything special.
    - Otherwise, for the purposes of generating positions in the AST, we want to ignore the tokens
      in the macro call. So we set lastStart/lastEnd to tokStart/tokEnd to that of the token
      *before* the macro call, then save that state as a token.
    - Expand the macro call into an array of tokens.
    - Append the adjusted token after the macro call to the token array.
    - Point readToken, skipSpace, and setStrict to the streamX functions.
    - Call next() to load the first generated token.
    - When readToken() exhausts the macro token array, set readToken,
      skipSpace and setStrict to the sourceX functions so the next token
      will come from the source.

    Note that no attempt is made to capture comments or space before or after a macro call.
  */

  function expandMacro(macro, expandedTokens, context) {
    // We actually do not want to expand macros automatically here, it is done explicitly
    var oldExpand = preprocessorState & preprocessorState_expandMacros;
    preprocessorState &= ~preprocessorState_expandMacros;
    pushMacro(macro, context);
    // Save the macro name as a token in case it is a function macro which has no arguments
    finishToken(_name, macro.name);
    var nameToken = makeToken();
    var savedState = preprocessorState;
    next();
    var isMacroCall = true;
    var args = null;
    var tokenAfterMacro;
    if (macro.isFunction) {
      // A function macro that has no arguments is treated as a name
      if (eat(_parenL))
        args = parseMacroArguments(macro, context);
      else
        isMacroCall = false;
    }
    // We are now pointing at the token after the last one in the macro call.
    // If the macro will be expanded, save some state.
    if (context == null) {
      if (isMacroCall) {
        // Save an adjusted version of the current token as outlined above
        var stateBefore = macroStack[0];
        lastStart = stateBefore.lastStart;
        lastEnd = stateBefore.lastEnd;
        tokenAfterMacro = makeToken();
      }
    }
    else if (args == null) {
      // If the macro has no args and is nested and we have not reached the end of
      // the token stream, the next() above pushed us past the token *after* the macro call,
      // which the caller will want to read again. So we back up one token in the stream.
      if (tokType !== _eof)
        --tokenStreamIndex;
      else if (!isMacroCall)
        // On the other hand, if we have reached eof and the macro is not being called,
        // we have to append it as a name.
        expandedTokens.push(nameToken);
    }
    if (isMacroCall)
      expandMacroBody(macro, nameToken, args, expandedTokens);
    preprocessorState = savedState;
    popMacro(context);
    if (context == null) {
      if (isMacroCall) {
        macroTokens.push(tokenAfterMacro);
        readToken = streamReadToken;
        skipSpace = streamSkipSpace;
        setStrict = streamSetStrict;
        next();
      } else {
        setToken(nameToken);
        skipSpace();
      }
    }
    preprocessorState |= oldExpand;
    return isMacroCall;
  }

  function parseMacroArguments(macro, context) {
    var arg = {tokens: []};
    var argStart = tokStart;  // For error reporting, so we can point to the offending argument
    var args = [];
    // Start with a parenLevel of 1, which represents the open parens of the macro call.
    // We stop scanning arguments when the level reaches zero.
    var parenLevel = 1;
    // This label allows us to break out of the loop within the inner switch statement
    scanArguments:
    for (;;) {
      switch (tokType) {
        case _parenL:
          ++parenLevel;
          break;

        case _parenR:
          if (--parenLevel === 0) {
            // If there are no args so far and this one is empty, that means no args were passed.
            // If there were args previously and this one is empty, it's an empty arg.
            if (args.length > 0 || arg.tokens.length > 0)
              args.push(arg);
            // Don't go to the next token if we are nested, because we are already pointing
            // just past the first token after the macro args.
            if (context == null) {
              skipSpace();
              next();
            }
            break scanArguments;
          }
          break;

        case _comma:
          // Commas are valid within an argument, if they are within parens.
          // If parenLevel === 1, the comma is an argument separator.
          if (parenLevel === 1) {
            args.push(arg);
            // If we have exceeded the formal parameters, no point in going further
            if (!macro.isVariadic && args.length > macro.parameters.length)
              break scanArguments;
            arg = {tokens: []};
            skipSpace();
            next();
            argStart = tokStart;
            continue;
          }
          break;

        case _eol:
          skipSpace();
          next();
          argStart = tokStart;
          continue;

        case _eof:
          raise(tokPos, "Unexpected EOF in macro call");
      }
      arg.tokens.push(makeToken());
      skipSpace();
      next();
    }
    // If the macro is not variadic, argument count must equal the parameter count.
    // Variadic macros have no restrictions on the argument count.
    if (!macro.isVariadic && args.length !== macro.parameters.length)
      raise(argStart, "Macro defines " + macro.parameters.length + " parameter" + (macro.parameters.length === 1 ? "" : "s") + ", called with " + args.length + " argument" + (args.length === 1 ? "" : "s"));
    return args;
  }

  function escapeNonPrintingChar(c) {
    switch (c) {
      case '"': return '\\"';
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\t": return "\\t";
      case "\\": return "\\\\";
      case "\b": return "\\b";
      case "\v": return "\\v";
      case "\u00A0": return "\\u00A0";
      case "\u2028": return "\\u2028";
      case "\u2029": return "\\u2029";
      default: return c;
    }
  }

  var whitespaceRegex = /\s+/g;
  var stringRegex = /(['"])((?:[^\\\"]+|\\.)*)\1/g;

  function readToken_stringify() {
    skipSpace();
    next();
    // The next token should be a name
    if (tokType === _name)
      return finishToken(_stringifiedName, tokVal);
    else
      raise(tokStart, "# (stringify) must be followed by a name");
  }

  function stringifyTokens(tokens) {
    var result = '"';
    var start, end;
    if (tokens.length === 0) {
      start = end = 0;
    } else {
      start = tokens[0].start;
      end = tokens.last().end;
      // gcc spec says leading and trailing whitespace is trimmed
      var str = tokens[0].input.slice(start, end).trim();
      var i = 0;
      while (i < str.length) {
        var c = str.charAt(i);
        // gcc spec says any sequence of whitespace is converted to a single space
        var match = whitespaceRegex.exec(c);
        if (match) {
          whitespaceRegex.lastIndex = i;
          match = whitespaceRegex.exec(str);
          result += " ";
          i = whitespaceRegex.lastIndex;
          whitespaceRegex.lastIndex = 0;
        }
        else if (c === '"' || c === "'") {
          stringRegex.lastIndex = i;
          var match = stringRegex.exec(str);
          if (match == null) {
            // If the regex fails, the string was unterminated, so take whatever is left and stop
            result += str.slice(i);
            break;
          } else {
            i = stringRegex.lastIndex;
            // A literal string has to escape double quotes, non-printing characters and backslashes
            var escaped = match[2].replace(/["\n\r\t\\\b\v\f\u00A0\u2028\u2029]/g, escapeNonPrintingChar);
            // Finally enclose the result in backslashed quotes
            var quote = c === '"' ? '\\"' : "'";
            result += quote + escaped + quote;
          }
        }
        else {
          result += c;
          ++i;
        }
      }
    }
    result += '"';
    // Construct a new string token
    var token = {
      input: result,
      start: 0,
      end: result.length,
      type: _string,
      value: result.slice(1, -1)
    };
    return token;
  }

  function expandMacroBody(macro, nameToken, args, expandedTokens) {
    // Expansion requires two passes. The first pass does argument substitution.
    var bodyTokens = [];
    if (macro.parameters.length > 0 || macro.isVariadic)
      substituteMacroArguments(macro, args, bodyTokens);
    else
      // If the macro has no parameters, we can just iterate through its tokens.
      bodyTokens = macro.tokens;
    // Second pass: expand macro calls.
    if (bodyTokens.length !== 0) {
      // The first token of the body needs to get the comments before the macro name
      if (options.trackComments)
        bodyTokens[0].commentsBefore = nameToken.commentsBefore;
      if (options.trackSpaces)
        bodyTokens[0].spacesBefore = nameToken.spacesBefore;
      for (var i = 0; i < bodyTokens.length; ++i) {
        var token = bodyTokens[i];
        if (token.type === _name) {
          var nestedMacro;
          if ((nestedMacro = lookupMacro(token.value)) != null) {
            // tokenIndex: i + 1 because the index points to the macro name, we want to start parsing after that
            var context = {
              tokens: bodyTokens,
              tokenIndex: i + 1
            };
            if (expandMacro(nestedMacro, expandedTokens, context))
              i = context.tokenIndex;
            continue;
          }
        }
        expandedTokens.push(token);
      }
    }
  }

  function substituteMacroArguments(macro, args, bodyTokens) {
    if (macro.isVariadic)
      var variadicArgsName = macro.parameters.last().name;
    // The last possible token that can be pasted is the 3rd from last
    for (var i = 0, lastPasteIndex = macro.tokens.length - 3; i < macro.tokens.length; ++i) {
      var token = macro.tokens[i];
      if (token.type === _name || token.type === _stringifiedName) {
        // First handle pasting, because pasted args are not macro expanded.
        // If there are at least two more tokens, and the next one is ##,
        // do the paste thing.
        if (i <= lastPasteIndex && macro.tokens[i + 1].type === _preTokenPaste) {
          var index;
          if ((index = pasteTokenSeries(macro, args, bodyTokens, i, lastPasteIndex)) !== 0) {
            i = index;
            continue;
          }
        }
        if (lookupMacroParameter(macro, token)) {
          var argTokens;
          if (token.type === _name) {
            if (token.macroParameter.variadic) {
              argTokens = [];
              // Variadic arg receives all of the args after the last non-variadic parameter declared.
              // If no variadic args are passed, and the token is marked deletePreviousComma,
              // delete the comma.
              if (args.length < macro.parameters.length && token.deletePreviousComma === true)
                bodyTokens.pop();
              else {
                for (var vi = macro.parameters.length - 1; vi < args.length; ++vi) {
                  Array.prototype.push.apply(argTokens, expandMacroArgument(args[vi]));
                  if (vi < args.length - 1)
                    argTokens.push({input: ",", start: 0, end: 2, type: _comma, value: ","});
                }
              }
            }
            else
              argTokens = expandMacroArgument(args[token.macroParameter.index]);
          }
          else
            argTokens = [stringifyMacroArgument(args[token.macroParameter.index])];
          if (argTokens.length !== 0) {
            // Add the arg token's comments/spaces before/after
            // to the first/last tokens of the expanded result.
            if (options.trackComments) {
              argTokens[0].commentsBefore = token.commentsBefore;
              argTokens.last().commentsAfter = token.commentsAfter;
            }
            if (options.trackSpaces) {
              argTokens[0].spacesBefore = token.spacesBefore;
              argTokens.last().spacesAfter = token.spacesAfter;
            }
            Array.prototype.push.apply(bodyTokens, argTokens);
          }
          continue;
        }
      }
      bodyTokens.push(token);
    }
  }

  function pasteTokenSeries(macro, args, bodyTokens, i, lastPasteIndex) {
    // When we enter this function, it has already been established that there
    // is a valid paste in the next two tokens, so no need to check until the
    // end of the loop.
    var pastedTokens = [];
    do {
      // If there was a previous paste, the left token is the last token of the result,
      // otherwise it's the current macro token. The right token will always be the macro token
      // after ##.
      var leftToken = pastedTokens.length === 0 ? macro.tokens[i] : pastedTokens.last();
      pasteTokens(leftToken, macro, i, args, pastedTokens);
      // Continue from the right token
      i += 2;
    }
    while (i <= lastPasteIndex && macro.tokens[i + 1].type === _preTokenPaste);
    if (pastedTokens.length > 0) {
      Array.prototype.push.apply(bodyTokens, pastedTokens);
      return i;
    }
    else
      return 0;
  }

  function pasteTokens(leftToken, macro, index, args, pastedTokens) {
    var rightToken = macro.tokens[index + 2];
    var toks = [leftToken, rightToken];
    var tokensToPaste = [null, null];
    for (var i = 0; i < toks.length; ++i) {
      if (lookupMacroParameter(macro, toks[i])) {
        var arg = args[toks[i].macroParameter.index];
        if (arg.tokens.length > 0) {
          // When pasting, arguments are *not* expanded, but they can be stringified
          if (toks[i].type === _name)
            tokensToPaste[i] = arg.tokens.slice(0);
          else // type === _stringifiedName
            tokensToPaste[i] = [stringifyMacroArgument(arg)];
        }
      }
      else
        tokensToPaste[i] = [toks[i]];
    }
    // Only paste if both tokens are non-empty.
    var doPaste = tokensToPaste[0] != null && tokensToPaste[1] != null;
    if (doPaste) {
      // Take the last token from the left side and first from the right,
      // they will be pasted together if possible. Everything else is
      // appended as is.
      leftToken = tokensToPaste[0].pop();
      rightToken = tokensToPaste[1].shift();
      // If we are going to paste, and there are tokens from a previous paste
      // in the series, then we have to replace the last token with the pasted one.
      if (pastedTokens.length > 0)
        pastedTokens.pop();
    }
    Array.prototype.push.apply(pastedTokens, tokensToPaste[0]);
    if (doPaste) {
      var tokenText = leftToken.input.slice(leftToken.start, leftToken.end) + rightToken.input.slice(rightToken.start, rightToken.end);
      var pastedToken = lexToken(tokenText);
      if (pastedToken != null)
        pastedTokens.push(pastedToken);
      else {
        console.warn("Warning: preprocessor token pasting formed '" + tokenText + "', an invalid token " + makeLineColumnDisplay(macro.tokens[index + 1]));
        pastedTokens.push(leftToken, rightToken);
      }
    }
    Array.prototype.push.apply(pastedTokens, tokensToPaste[1]);
  }

  function expandMacroArgument(arg) {
    if (arg.expandedTokens == null) {
      arg.expandedTokens = [];
      for (var i = 0; i < arg.tokens.length; ++i) {
        var token = arg.tokens[i];
        if (token.type === _name) {
          // true means this is a macro argument, which may be self-referential
          var nestedMacro = lookupMacro(token.value, true);
          if (nestedMacro != null) {
            var context = {
              tokens: arg.tokens,
              tokenIndex: i + 1
            };
            if (expandMacro(nestedMacro, arg.expandedTokens, context))
              i = context.tokenIndex;
            continue;
          }
        }
        arg.expandedTokens.push(token);
      }
    }
    return arg.expandedTokens;
  }

  function stringifyMacroArgument(arg) {
    if (arg.stringifiedTokens == null)
      arg.stringifiedTokens = stringifyTokens(arg.tokens);
    return arg.stringifiedTokens;
  }

  function lookupMacroParameter(macro, token) {
    if (token.type === _name || token.type === _stringifiedName) {
      if (token.macroParameter == null)
        token.macroParameter = macro.getParameterByName(token.value);
      return token.macroParameter != null;
    }
    return false;
  }

  // Return the macro with the given name, but only if it is not self-referential.

  function lookupMacro(name, isArg) {
    var macro;
    macro = getMacro(name);
    // Comparing isArg !== true is faster than !isArg, because testing a non-boolean
    // for falseness is very slow.
    if (macro != null && isArg !== true && isMacroSelfReference(macro))
      macro = undefined;
    return macro;
  }

  function lexToken(text) {
    var context = {
      input: input,
      inputLen: inputLen,
      readToken: readToken,
      skipSpace: skipSpace,
      setStrict: setStrict
    };
    var currentToken = makeToken();
    readToken = sourceReadToken;
    skipSpace = sourceSkipSpace;
    setStrict = sourceSetStrict;
    input = text;
    inputLen = text.length;
    initTokenState();
    var token = null;
    try {
      token = preprocessorGetToken();
      // If tokEnd did not reach the end of the text,
      // the entire text was not a single token and thus is invalid.
      if (token != null && token.end < text.length)
        token = null;
    }
    catch (e) {
      // Nothing to do, null token is what we want
    }
    input = context.input;
    inputLen = context.inputLen;
    readToken = context.readToken;
    skipSpace = context.skipSpace;
    setStrict = context.setStrict;
    setToken(currentToken);
    return token;
  }

  // ## Parser

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

  // ### Parser utilities

  // Continue to the next token.

  function next() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    lastEndLoc = tokEndLoc;
    nodeMessageSendObjectExpression = null;
    readToken();
  }

  // Enter strict mode. Re-reads the next token to please pedantic
  // tests ("use strict"; 010; -- should fail).

  function sourceSetStrict(strct) {
    strict = strct;
    tokPos = lastEnd;
    while (tokPos < tokLineStart) {
      tokLineStart = tokInput.lastIndexOf("\n", tokLineStart - 2) + 1;
      --tokCurLine;
    }
    skipSpace();
    readToken();
  }

  // Start an AST node, attaching a start offset and optionally a
  // `commentsBefore` property to it.

  function node_t() {
    this.type = null;
    this.start = tokStart;
    this.end = null;
  }

  function node_loc_t() {
    this.start = tokStartLoc;
    this.end = null;
    if (sourceFile != null) this.source = sourceFile;
  }

  function startNode() {
    var node = new node_t();
    if (options.trackComments && tokCommentsBefore) {
      node.commentsBefore = tokCommentsBefore;
      tokCommentsBefore = null;
    }
    if (options.trackSpaces && tokSpacesBefore) {
      node.spacesBefore = tokSpacesBefore;
      tokSpacesBefore = null;
    }
    if (options.locations)
      node.loc = new node_loc_t();
    if (options.ranges)
      node.range = [tokStart, 0];
    return node;
  }

  // Start a node whose start offset/comments information should be
  // based on the start of another node. For example, a binary
  // operator node is only started after its left-hand side has
  // already been parsed.

  function startNodeFrom(other) {
    var node = new node_t();
    node.start = other.start;
    if (other.commentsBefore) {
      node.commentsBefore = other.commentsBefore;
      delete other.commentsBefore;
    }
    if (other.spacesBefore) {
      node.spacesBefore = other.spacesBefore;
      delete other.spacesBefore;
    }
    if (options.locations) {
      node.loc = new node_loc_t();
      node.loc.start = other.loc.start;
    }
    if (options.ranges)
      node.range = [other.range[0], 0];

    return node;
  }

  // Finish an AST node, adding `type`, `end`, and `commentsAfter`
  // properties.
  //
  // We keep track of the last node that we finished, in order
  // 'bubble' `commentsAfter` properties up to the biggest node. I.e.
  // in '`1 + 1 // foo', the comment should be attached to the binary
  // operator node, not the second literal node. The same is done on
  // `spacesAfter`

  var lastFinishedNode;

  function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    if (options.trackComments) {
      if (lastTokCommentsAfter) {
        node.commentsAfter = lastTokCommentsAfter;
        lastTokCommentsAfter = null;
      } else if (lastFinishedNode && lastFinishedNode.end === lastEnd &&
                 lastFinishedNode.commentsAfter) {
        node.commentsAfter = lastFinishedNode.commentsAfter;
        delete lastFinishedNode.commentsAfter;
      }
      if (!options.trackSpaces)
        lastFinishedNode = node;
    }
    if (options.trackSpaces) {
      if (lastTokSpacesAfter) {
        node.spacesAfter = lastTokSpacesAfter;
        lastTokSpacesAfter = null;
      } else if (lastFinishedNode && lastFinishedNode.end === lastEnd &&
                 lastFinishedNode.spacesAfter) {
        node.spacesAfter = lastFinishedNode.spacesAfter;
        delete lastFinishedNode.spacesAfter;
      }
      lastFinishedNode = node;
    }
    if (options.locations)
      node.loc.end = lastEndLoc;
    if (options.ranges)
      node.range[1] = lastEnd;
    return node;
  }

  // Test whether a statement node is the string literal `"use strict"`.

  function isUseStrict(stmt) {
    return options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
  }

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  function eat(type) {
    if (tokType === type) {
      next();
      return true;
    }
  }

  // Test whether a semicolon can be inserted at the current position.

  function canInsertSemicolon() {
    return !options.strictSemicolons &&
      (tokType === _eof || tokType === _braceR || newline.test(tokInput.slice(lastEnd, tokStart)) ||
        (nodeMessageSendObjectExpression && options.objj));
  }

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  function semicolon() {
    if (!eat(_semi) && !canInsertSemicolon()) raise(tokStart, "Expected a semicolon");
  }

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise with errorMessage or an unexpected token error.

  function expect(type, errorMessage) {
    if (tokType === type) next();
    else errorMessage ? raise(tokStart, errorMessage) : unexpected();
  }

  // Raise an unexpected token error.

  function unexpected() {
    raise(tokStart, "Unexpected token");
  }

  // Verify that a node is an lval — something that can be assigned
  // to.

  function checkLVal(expr) {
    if (expr.type !== "Identifier" && expr.type !== "MemberExpression" && expr.type !== "Dereference")
      raise(expr.start, "Assigning to rvalue");
    if (strict && expr.type === "Identifier" && isStrictBadIdWord(expr.name))
      raise(expr.start, "Assigning to " + expr.name + " in strict mode");
  }

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  function parseTopLevel(program) {
    lastStart = lastEnd = tokPos;
    if (options.locations) lastEndLoc = new line_loc_t();
    inFunction = strict = null;
    labels = [];
    readToken();

    var node = program || startNode(), first = true;
    if (!program) node.body = [];
    while (tokType !== _eof) {
      var stmt = parseStatement();
      if (stmt != null) {
        node.body.push(stmt);
        if (first && isUseStrict(stmt)) setStrict(true);
        first = false;
      }
    }
    // If we are EOF at this point and something is left on the if stack, it was unterminated.
    if (options.preprocess && tokType === _eof && preIfStack.length > 0)
      raise(preIfStack[0].pos, "Unterminated #" + preIfStack[0].type.keyword + " at EOF");
    return finishNode(node, "Program");
  }

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
  // does not help.

  function parseStatement(terminator) {
    do {
      if (tokType === _slash || tokType === _assign && tokVal == "/=")
        readToken(true);

      var starttype = tokType, node = startNode();

      // This is a special case when trying figure out if this is a subscript to the former line or a new send message statement on this line...
      if (nodeMessageSendObjectExpression) {
          node.expression = parseMessageSendExpression(nodeMessageSendObjectExpression, nodeMessageSendObjectExpression.object);
          semicolon();
          return finishNode(node, "ExpressionStatement");
      }

      // Most types of statements are recognized by the keyword they
      // start with. Many are trivial to parse, some require a bit of
      // complexity.

      switch (starttype) {
      case _break: case _continue:
        next();
        var isBreak = starttype === _break;
        if (eat(_semi) || canInsertSemicolon()) node.label = null;
        else if (tokType !== _name) unexpected();
        else {
          node.label = parseIdent();
          semicolon();
        }

        // Verify that there is an actual destination to break or
        // continue to.
        for (var i = 0; i < labels.length; ++i) {
          var lab = labels[i];
          if (node.label == null || lab.name === node.label.name) {
            if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
            if (node.label && isBreak) break;
          }
        }
        if (i === labels.length) raise(node.start, "Unsyntactic " + starttype.keyword);
        return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

      case _debugger:
        next();
        semicolon();
        return finishNode(node, "DebuggerStatement");

      case _do:
        next();
        labels.push(loopLabel);
        node.body = parseStatement();
        labels.pop();
        expect(_while, "Expected 'while' at end of do statement");
        node.test = parseParenExpression();
        semicolon();
        return finishNode(node, "DoWhileStatement");

        // Disambiguating between a `for` and a `for`/`in` loop is
        // non-trivial. Basically, we have to parse the init `var`
        // statement or expression, disallowing the `in` operator (see
        // the second parameter to `parseExpression`), and then check
        // whether the next token is `in`. When there is no init part
        // (semicolon immediately after the opening parenthesis), it is
        // a regular `for` loop.

      case _for:
        next();
        labels.push(loopLabel);
        expect(_parenL, "Expected '(' after 'for'");
        if (tokType === _semi) return parseFor(node, null);
        if (tokType === _var) {
          var init = startNode();
          next();
          parseVar(init, true);
          finishNode(init, "VariableDeclaration");
          if (init.declarations.length === 1 && eat(_in))
            return parseForIn(node, init);
          return parseFor(node, init);
        }
        var init = parseExpression(false, true);
        if (eat(_in)) {checkLVal(init); return parseForIn(node, init);}
        return parseFor(node, init);

      case _function:
        next();
        return parseFunction(node, true);

      case _if:
        next();
        node.test = parseParenExpression();
        node.consequent = parseStatement();
        node.alternate = eat(_else) ? parseStatement() : null;
        return finishNode(node, "IfStatement");

      case _return:
        if (!inFunction) raise(tokStart, "'return' outside of function");
        next();

        // In `return` (and `break`/`continue`), the keywords with
        // optional arguments, we eagerly look for a semicolon or the
        // possibility to insert one.

        if (eat(_semi) || canInsertSemicolon()) node.argument = null;
        else { node.argument = parseExpression(); semicolon(); }
        return finishNode(node, "ReturnStatement");

      case _switch:
        next();
        node.discriminant = parseParenExpression();
        node.cases = [];
        expect(_braceL, "Expected '{' in switch statement");
        labels.push(switchLabel);

        // Statements under must be grouped (by label) in SwitchCase
        // nodes. `cur` is used to keep the node that we are currently
        // adding statements to.

        for (var cur, sawDefault; tokType != _braceR;) {
          if (tokType === _case || tokType === _default) {
            var isCase = tokType === _case;
            if (cur) finishNode(cur, "SwitchCase");
            node.cases.push(cur = startNode());
            cur.consequent = [];
            next();
            if (isCase) cur.test = parseExpression();
            else {
              if (sawDefault) raise(lastStart, "Multiple default clauses"); sawDefault = true;
              cur.test = null;
            }
            expect(_colon, "Expected ':' after case clause");
          } else {
            if (!cur) unexpected();
            cur.consequent.push(parseStatement());
          }
        }
        if (cur) finishNode(cur, "SwitchCase");
        next(); // Closing brace
        labels.pop();
        return finishNode(node, "SwitchStatement");

      case _throw:
        next();
        if (newline.test(tokInput.slice(lastEnd, tokStart)))
          raise(lastEnd, "Illegal newline after throw");
        node.argument = parseExpression();
        semicolon();
        return finishNode(node, "ThrowStatement");

      case _try:
        next();
        node.block = parseBlock();
        node.handler = null;
        if (tokType === _catch) {
          var clause = startNode();
          next();
          expect(_parenL, "Expected '(' after 'catch'");
          clause.param = parseIdent();
          if (strict && isStrictBadIdWord(clause.param.name))
            raise(clause.param.start, "Binding " + clause.param.name + " in strict mode");
          expect(_parenR, "Expected closing ')' after catch");
          clause.guard = null;
          clause.body = parseBlock();
          node.handler = finishNode(clause, "CatchClause");
        }
        node.guardedHandlers = empty;
        node.finalizer = eat(_finally) ? parseBlock() : null;
        if (!node.handler && !node.finalizer)
          raise(node.start, "Missing catch or finally clause");
        return finishNode(node, "TryStatement");

      case _var:
        next();
        parseVar(node);
        semicolon();
        return finishNode(node, "VariableDeclaration");;

      case _while:
        next();
        node.test = parseParenExpression();
        labels.push(loopLabel);
        node.body = parseStatement();
        labels.pop();
        return finishNode(node, "WhileStatement");

      case _with:
        if (strict) raise(tokStart, "'with' in strict mode");
        next();
        node.object = parseParenExpression();
        node.body = parseStatement();
        return finishNode(node, "WithStatement");

      case _braceL:
        return parseBlock();

      case _semi:
        next();
        return finishNode(node, "EmptyStatement");

      // Objective-J
      case _interface:
        if (options.objj) {
          next();
          node.classname = parseIdent(true);
          if (eat(_colon))
            node.superclassname = parseIdent(true);
          else if (eat(_parenL)) {
            node.categoryname = parseIdent(true);
            expect(_parenR, "Expected closing ')' after category name");
          }
          if (tokVal === '<') {
            next();
            var protocols = [],
                first = true;
            node.protocols = protocols;
            while (tokVal !== '>') {
              if (!first)
                expect(_comma, "Expected ',' between protocol names");
              else first = false;
              protocols.push(parseIdent(true));
            }
            next();
          }
          if (eat(_braceL)) {
            node.ivardeclarations = [];
            for (;;) {
              if (eat(_braceR)) break;
              parseIvarDeclaration(node);
            }
            node.endOfIvars = tokStart;
          }
          node.body = [];
          while(!eat(_end)) {
            if (tokType === _eof) raise(tokPos, "Expected '@end' after '@interface'");
            node.body.push(parseClassElement());
          }
          return finishNode(node, "InterfaceDeclarationStatement");
        }
        break;

      // Objective-J
      case _implementation:
        if (options.objj) {
          next();
          node.classname = parseIdent(true);
          if (eat(_colon))
            node.superclassname = parseIdent(true);
          else if (eat(_parenL)) {
            node.categoryname = parseIdent(true);
            expect(_parenR, "Expected closing ')' after category name");
          }
          if (tokVal === '<') {
            next();
            var protocols = [],
                first = true;
            node.protocols = protocols;
            while (tokVal !== '>') {
              if (!first)
                expect(_comma, "Expected ',' between protocol names");
              else first = false;
              protocols.push(parseIdent(true));
            }
            next();
          }
          if (eat(_braceL)) {
            node.ivardeclarations = [];
            for (;;) {
              if (eat(_braceR)) break;
              parseIvarDeclaration(node);
            }
            node.endOfIvars = tokStart;
          }
          node.body = [];
          while(!eat(_end)) {
            if (tokType === _eof) raise(tokPos, "Expected '@end' after '@implementation'");
            node.body.push(parseClassElement());
          }
          return finishNode(node, "ClassDeclarationStatement");
        }
        break;

      // Objective-J
      case _protocol:
        // If next token is a left parenthesis it is a ProtocolLiteral expression so bail out
        if (options.objj && tokInput.charCodeAt(tokPos) !== 40) { // '('
          next();
          node.protocolname = parseIdent(true);
          if (tokVal === '<') {
            next();
            var protocols = [],
                first = true;
            node.protocols = protocols;
            while (tokVal !== '>') {
              if (!first)
                expect(_comma, "Expected ',' between protocol names");
              else first = false;
              protocols.push(parseIdent(true));
            }
            next();
          }
          while(!eat(_end)) {
            if (tokType === _eof) raise(tokPos, "Expected '@end' after '@protocol'");
            if (eat(_required)) continue;
            if (eat(_optional)) {
              while(!eat(_required) && tokType !== _end) {
                (node.optional || (node.optional = [])).push(parseProtocolClassElement());
              }
            } else {
              (node.required || (node.required = [])).push(parseProtocolClassElement());
            }
          }
          return finishNode(node, "ProtocolDeclarationStatement");
        }
        break;

      // Objective-J
      case _import:
        if (options.objj) {
          next();
          if (tokType === _string)
            node.isLocal = true;
          else if (tokType === _filename)
            node.isLocal = false;
          else
            unexpected();

          node.filename = parseStringNumRegExpLiteral();
          return finishNode(node, "ImportStatement");
        }
        break;

      // Objective-J
      case _class:
        if (options.objj) {
          next();
          node.id = parseIdent(false);
          return finishNode(node, "ClassStatement");
        }
        break;

      // Objective-J
      case _global:
        if (options.objj) {
          next();
          node.id = parseIdent(false);
          return finishNode(node, "GlobalStatement");
        }
        break;

      // Preprocessor
      case _preprocess:
        parsePreprocess();
        continue;
      }

      // The indentation is one step to the right here to make sure it
      // is the same as in the original acorn parser. Easier merge

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.

      var maybeName = tokVal, expr = parseExpression();
      if (starttype === _name && expr.type === "Identifier" && eat(_colon)) {
        for (var i = 0; i < labels.length; ++i)
          if (labels[i].name === maybeName) raise(expr.start, "Label '" + maybeName + "' is already declared");
        var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
        labels.push({name: maybeName, kind: kind});
        node.body = parseStatement();
        labels.pop();
        node.label = expr;
        return finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        semicolon();
        return finishNode(node, "ExpressionStatement");
      }
    }
    while (tokType !== _eof && tokType !== terminator);

    return null;
  }

  function parseIvarDeclaration(node) {
    var outlet;
    if (eat(_outlet))
      outlet = true;
    var type = parseObjectiveJType();
    if (strict && isStrictBadIdWord(type.name))
      raise(type.start, "Binding " + type.name + " in strict mode");
    for (;;) {
      var decl = startNode();
      if (outlet)
        decl.outlet = outlet;
      decl.ivartype = type;
      decl.id = parseIdent();
      if (strict && isStrictBadIdWord(decl.id.name))
        raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
      if (eat(_accessors)) {
        decl.accessors = {};
        if (eat(_parenL)) {
          if (!eat(_parenR)) {
            for (;;) {
              var config = parseIdent(true);
              switch (config.name) {
                case "property":
                case "getter":
                  expect(_eq, "Expected '=' after 'getter' accessor attribute");
                  decl.accessors[config.name] = parseIdent(true);
                  break;

                case "setter":
                  expect(_eq, "Expected '=' after 'setter' accessor attribute");
                  var setter = parseIdent(true);
                  decl.accessors[config.name] = setter;
                  if (eat(_colon))
                    setter.end = tokStart;
                  setter.name += ":"
                  break;

                case "readwrite":
                case "readonly":
                case "copy":
                  decl.accessors[config.name] = true;
                  break;

                default:
                  raise(config.start, "Unknown accessors attribute '" + config.name + "'");
              }
              if (!eat(_comma)) break;
            }
            expect(_parenR, "Expected closing ')' after accessor attributes");
          }
        }
      }
      finishNode(decl, "IvarDeclaration")
      node.ivardeclarations.push(decl);
      if (!eat(_comma)) break;
    }
    semicolon();
  }

  function parseMethodDeclaration(node) {
    node.methodtype = tokVal;
    expect(_plusMin, "Method declaration must start with '+' or '-'");
    // If we find a '(' we have a return type to parse
    if (eat(_parenL)) {
      var typeNode = startNode();
      if (eat(_action)) {
        node.action = finishNode(typeNode, "ObjectiveJActionType");
        typeNode = startNode();
      }
      if (!eat(_parenR)) {
        node.returntype = parseObjectiveJType(typeNode);
        expect(_parenR, "Expected closing ')' after method return type");
      }
    }
    // Now we parse the selector
    var first = true,
        selectors = [],
        args = [];
    node.selectors = selectors;
    node.arguments = args;
    for (;;) {
      if (tokType !== _colon) {
        selectors.push(parseIdent(true));
        if (first && tokType !== _colon) break;
      } else
        selectors.push(null);
      expect(_colon, "Expected ':' in selector");
      var argument = {};
      args.push(argument);
      if (eat(_parenL)) {
        argument.type = parseObjectiveJType();
        expect(_parenR, "Expected closing ')' after method argument type");
      }
      argument.identifier = parseIdent(false);
      if (tokType === _braceL || tokType === _semi) break;
      if (eat(_comma)) {
        expect(_dotdotdot, "Expected '...' after ',' in method declaration");
        node.parameters = true;
        break;
      }
      first = false;
    }
  }

  function parseClassElement() {
    var element = startNode();
    if (tokVal === '+' || tokVal === '-') {
      parseMethodDeclaration(element);
      eat(_semi);
      element.startOfBody = lastEnd;
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldInFunc = inFunction, oldLabels = labels;
      inFunction = true; labels = [];
      element.body = parseBlock(true);
      inFunction = oldInFunc; labels = oldLabels;
      return finishNode(element, "MethodDeclarationStatement");
    } else
      return parseStatement();
  }

  function parseProtocolClassElement() {
    var element = startNode();
    parseMethodDeclaration(element);
    semicolon();
    return finishNode(element, "MethodDeclarationStatement");
  }

  // Used for constructs like `switch` and `if` that insist on
  // parentheses around their expression.

  function parseParenExpression() {
    expect(_parenL, "Expected '(' before expression");
    var val = parseExpression();
    expect(_parenR, "Expected closing ')' after expression");
    return val;
  }

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  function parseBlock(allowStrict) {
    var node = startNode(), first = true, strict = false, oldStrict;
    node.body = [];
    expect(_braceL, "Expected '{' before block");
    while (!eat(_braceR)) {
      var stmt = parseStatement(_braceR);
      if (stmt != null) {
        node.body.push(stmt);
        if (first && allowStrict && isUseStrict(stmt)) {
          oldStrict = strict;
          setStrict(strict = true);
        }
        first = false;
      }
    }
    if (strict && !oldStrict) setStrict(false);
    return finishNode(node, "BlockStatement");
  }

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  function parseFor(node, init) {
    node.init = init;
    expect(_semi, "Expected ';' in for statement");
    node.test = tokType === _semi ? null : parseExpression();
    expect(_semi, "Expected ';' in for statement");
    node.update = tokType === _parenR ? null : parseExpression();
    expect(_parenR, "Expected closing ')' in for statement");
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForStatement");
  }

  // Parse a `for`/`in` loop.

  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    expect(_parenR, "Expected closing ')' in for statement");
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForInStatement");
  }

  // Parse a list of variable declarations.

  function parseVar(node, noIn) {
    node.declarations = [];
    node.kind = "var";
    for (;;) {
      var decl = startNode();
      decl.id = parseIdent();
      if (strict && isStrictBadIdWord(decl.id.name))
        raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
      decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
      node.declarations.push(finishNode(decl, "VariableDeclarator"));
      if (!eat(_comma)) break;
    }
    return node;
  }

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The arguments are used to forbid comma
  // sequences (in argument lists, array literals, or object literals)
  // or the `in` operator (in for loops initalization expressions).

  function parseExpression(noComma, noIn) {
    var expr = parseMaybeAssign(noIn);
    if (!noComma && tokType === _comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  function parseMaybeAssign(noIn) {
    var left = parseMaybeConditional(noIn);
    if (tokType.isAssign) {
      var node = startNodeFrom(left);
      node.operator = tokVal;
      node.left = left;
      next();
      node.right = parseMaybeAssign(noIn);
      checkLVal(left);
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  // Parse a ternary conditional (`?:`) operator.

  function parseMaybeConditional(noIn) {
    var expr = parseExprOps(noIn);
    if (eat(_question)) {
      var node = startNodeFrom(expr);
      node.test = expr;
      node.consequent = parseExpression(true);
      expect(_colon, "Expected ':' in conditional expression");
      node.alternate = parseExpression(true, noIn);
      return finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  // Start the precedence parser.

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(), -1, noIn);
  }

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  function parseExprOp(left, minPrec, noIn) {
    var prec = tokType.binop;
    if (prec != null && (!noIn || tokType !== _in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = tokVal;
        var op = tokType;
        next();
        node.right = parseExprOp(parseMaybeUnary(), prec, noIn);
        var exprNode = finishNode(node, (op === _logicalAND || op === _logicalOR) ? "LogicalExpression" : "BinaryExpression");
        return parseExprOp(exprNode, minPrec, noIn);
      }
    }
    return left;
  }

  // Parse unary operators, both prefix and postfix.

  function parseMaybeUnary() {
    if (tokType.prefix) {
      var node = startNode(), update = tokType.isUpdate;
      node.operator = tokVal;
      node.prefix = true;
      tokRegexpAllowed = true;
      next();
      node.argument = parseMaybeUnary();
      if (update) checkLVal(node.argument);
      else if (strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        raise(node.start, "Deleting local variable in strict mode");
      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var expr = parseExprSubscripts();
    while (tokType.postfix && !canInsertSemicolon()) {
      var node = startNodeFrom(expr);
      node.operator = tokVal;
      node.prefix = false;
      node.argument = expr;
      checkLVal(expr);
      next();
      expr = finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  // Parse call, dot, and `[]`-subscript expressions.

  function parseExprSubscripts() {
    return parseSubscripts(parseExprAtom());
  }

  function parseSubscripts(base, noCalls) {
    if (eat(_dot)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseIdent(true);
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else {
      if (options.objj) var messageSendNode = startNode();
      if (eat(_bracketL)) {
        var expr = parseExpression();
        if (options.objj && tokType !== _bracketR) {
          messageSendNode.object = expr;
          nodeMessageSendObjectExpression = messageSendNode;
          return base;
        }
        var node = startNodeFrom(base);
        node.object = base;
        node.property = expr;
        node.computed = true;
        expect(_bracketR, "Expected closing ']' in subscript");
        return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
      } else if (!noCalls && eat(_parenL)) {
        var node = startNodeFrom(base);
        node.callee = base;
        node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
        return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
      }
    }
    return base;
  }

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  function parseExprAtom() {
    switch (tokType) {
    case _this:
      var node = startNode();
      next();
      return finishNode(node, "ThisExpression");
    case _name:
      return parseIdent();
    case _num: case _string: case _regexp:
      return parseStringNumRegExpLiteral();

    case _null: case _true: case _false:
      var node = startNode();
      node.value = tokType.atomValue;
      node.raw = tokType.keyword;
      next();
      return finishNode(node, "Literal");

    case _parenL:
      var tokStartLoc1 = tokStartLoc, tokStart1 = tokStart;
      next();
      var val = parseExpression();
      val.start = tokStart1;
      val.end = tokEnd;
      if (options.locations) {
        val.loc.start = tokStartLoc1;
        val.loc.end = tokEndLoc;
      }
      if (options.ranges)
        val.range = [tokStart1, tokEnd];
      expect(_parenR, "Expected closing ')' in expression");
      return val;

    case _arrayLiteral:
      var node = startNode(),
          firstExpr = null;

      next();
      expect(_bracketL, "Expected '[' at beginning of array literal");

      if (tokType !== _bracketR)
        firstExpr = parseExpression(true, true);

      node.elements = parseExprList(_bracketR, firstExpr, true, true);
      return finishNode(node, "ArrayLiteral");

    case _bracketL:
      var node = startNode(),
          firstExpr = null;
      next();
      if (tokType !== _comma && tokType !== _bracketR) {
        firstExpr = parseExpression(true, true);
        if (tokType !== _comma && tokType !== _bracketR)
          return parseMessageSendExpression(node, firstExpr);
      }
      node.elements = parseExprList(_bracketR, firstExpr, true, true);
      return finishNode(node, "ArrayExpression");

    case _dictionaryLiteral:
      var node = startNode();
      next();

      var r = parseDictionary();
      node.keys = r[0];
      node.values = r[1];
      return finishNode(node, "DictionaryLiteral");

    case _braceL:
      return parseObj();

    case _function:
      var node = startNode();
      next();
      return parseFunction(node, false);

    case _new:
      return parseNew();

    case _selector:
      var node = startNode();
      next();
      expect(_parenL, "Expected '(' after '@selector'");
      parseSelector(node, _parenR);
      expect(_parenR, "Expected closing ')' after selector");
      return finishNode(node, "SelectorLiteralExpression");

    case _protocol:
      var node = startNode();
      next();
      expect(_parenL, "Expected '(' after '@protocol'");
      node.id = parseIdent(true);
      expect(_parenR, "Expected closing ')' after protocol name");
      return finishNode(node, "ProtocolLiteralExpression");

    case _ref:
      var node = startNode();
      next();
      expect(_parenL, "Expected '(' after '@ref'");
      node.element = parseIdent(node, _parenR);
      expect(_parenR, "Expected closing ')' after ref");
      return finishNode(node, "Reference");

    case _deref:
      var node = startNode();
      next();
      expect(_parenL, "Expected '(' after '@deref'");
      node.expr = parseExpression(true, true);
      expect(_parenR, "Expected closing ')' after deref");
      return finishNode(node, "Dereference");

    default:
      if (tokType.okAsIdent)
        return parseIdent();

      unexpected();
    }
  }

  function parseMessageSendExpression(node, firstExpr) {
    parseSelectorWithArguments(node, _bracketR);
    if (firstExpr.type === "Identifier" && firstExpr.name === "super")
      node.superObject = true;
    else
      node.object = firstExpr;
    return finishNode(node, "MessageSendExpression");
  }

  function parseSelector(node, close) {
      var first = true,
          selectors = [];
      for (;;) {
        if (tokType !== _colon) {
          selectors.push(parseIdent(true).name);
          if (first && tokType === close) break;
        }
        expect(_colon, "Expected ':' in selector");
        selectors.push(":");
        if (tokType === close) break;
        first = false;
      }
      node.selector = selectors.join("");
  }

  function parseSelectorWithArguments(node, close) {
      var first = true,
          selectors = [],
          args = [],
          parameters = [];
      node.selectors = selectors;
      node.arguments = args;
      for (;;) {
        if (tokType !== _colon) {
          selectors.push(parseIdent(true));
          if (first && eat(close))
            break;
        } else {
          selectors.push(null);
        }
        expect(_colon, "Expected ':' in selector");
        args.push(parseExpression(true, true));
        if (eat(close))
          break;
        if (tokType === _comma) {
          node.parameters = [];
          while(eat(_comma)) {
            node.parameters.push(parseExpression(true, true));
          }
          eat(close);
          break;
        }
        first = false;
      }
  }

  // New's precedence is slightly tricky. It must allow its argument
  // to be a `[]` or dot subscript expression, but not a call — at
  // least, not without wrapping it in parentheses. Thus, it uses the

  function parseNew() {
    var node = startNode();
    next();
    node.callee = parseSubscripts(parseExprAtom(false), true);
    if (eat(_parenL))
      node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
    else node.arguments = empty;
    return finishNode(node, "NewExpression");
  }

  // Parse an object literal.

  function parseObj() {
    var node = startNode(), first = true, sawGetSet = false;
    node.properties = [];
    next();
    while (!eat(_braceR)) {
      if (!first) {
        expect(_comma, "Expected ',' in object literal");
        if (options.allowTrailingCommas && eat(_braceR)) break;
      } else first = false;

      var prop = {key: parsePropertyName()}, isGetSet = false, kind;
      if (eat(_colon)) {
        prop.value = parseExpression(true);
        kind = prop.kind = "init";
      } else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set")) {
        isGetSet = sawGetSet = true;
        kind = prop.kind = prop.key.name;
        prop.key = parsePropertyName();
        if (tokType !== _parenL) unexpected();
        prop.value = parseFunction(startNode(), false);
      } else unexpected();

      // getters and setters are not allowed to clash — either with
      // each other or with an init property — and in strict mode,
      // init properties are also not allowed to be repeated.

      if (prop.key.type === "Identifier" && (strict || sawGetSet)) {
        for (var i = 0; i < node.properties.length; ++i) {
          var other = node.properties[i];
          if (other.key.name === prop.key.name) {
            var conflict = kind == other.kind || isGetSet && other.kind === "init" ||
              kind === "init" && (other.kind === "get" || other.kind === "set");
            if (conflict && !strict && kind === "init" && other.kind === "init") conflict = false;
            if (conflict) raise(prop.key.start, "Redefinition of property");
          }
        }
      }
      node.properties.push(prop);
    }
    return finishNode(node, "ObjectExpression");
  }

  function parsePropertyName() {
    if (tokType === _num || tokType === _string) return parseExprAtom();
    return parseIdent(true);
  }

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  function parseFunction(node, isStatement) {
    if (tokType === _name) node.id = parseIdent();
    else if (isStatement) unexpected();
    else node.id = null;
    node.params = [];
    var first = true;
    expect(_parenL, "Expected '(' before function parameters");
    while (!eat(_parenR)) {
      if (!first) expect(_comma, "Expected ',' between function parameters"); else first = false;
      node.params.push(parseIdent());
    }

    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldInFunc = inFunction, oldLabels = labels;
    inFunction = true; labels = [];
    node.body = parseBlock(true);
    inFunction = oldInFunc; labels = oldLabels;

    // If this is a strict mode function, verify that argument names
    // are not repeated, and it does not try to bind the words `eval`
    // or `arguments`.
    if (strict || node.body.body.length && isUseStrict(node.body.body[0])) {
      for (var i = node.id ? -1 : 0; i < node.params.length; ++i) {
        var id = i < 0 ? node.id : node.params[i];
        if (isStrictReservedWord(id.name) || isStrictBadIdWord(id.name))
          raise(id.start, "Defining '" + id.name + "' in strict mode");
        if (i >= 0) for (var j = 0; j < i; ++j) if (id.name === node.params[j].name)
          raise(id.start, "Argument name clash in strict mode");
      }
    }

    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  }

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).
  // This function is modified so the first expression is passed as a
  // parameter. This is nessesary cause we need to check if it is a Objective-J
  // message send expression ([expr mySelector:param1 withSecondParam:param2])

  function parseExprList(close, firstExpr, allowTrailingComma, allowEmpty) {
    if (firstExpr && eat(close))
      return [firstExpr];
    var elts = [], first = true;
    while (!eat(close)) {
      if (first) {
        first = false;
        if (allowEmpty && tokType === _comma && !firstExpr) elts.push(null);
        else elts.push(firstExpr);
      } else {
        expect(_comma, "Expected ',' between expressions");
        if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
        if (allowEmpty && tokType === _comma) elts.push(null);
        else elts.push(parseExpression(true));
      }
    }
    return elts;
  }

  // Parses a comma-separated list of <key>:<value> pairs and returns them as
  // [arrayOfKeyExpressions, arrayOfValueExpressions].
  function parseDictionary() {
    expect(_braceL, "Expected '{' before dictionary");

    var keys = [], values = [], first = true;
    while (!eat(_braceR)) {
      if (!first) {
        expect(_comma, "Expected ',' between expressions");
        if (options.allowTrailingCommas && eat(_braceR)) break;
      }

      keys.push(parseExpression(true, true));
      expect(_colon, "Expected ':' between dictionary key and value");
      values.push(parseExpression(true, true));
      first = false;
    }
    return [keys, values];
  }

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  function parseIdent(liberal) {
    var node = startNode();
    node.name = tokType === _name ? tokVal : (((liberal && !options.forbidReserved) || tokType.okAsIdent) && tokType.keyword) || unexpected();
    tokRegexpAllowed = false;
    next();
    return finishNode(node, "Identifier");
  }

  function parseStringNumRegExpLiteral() {
    var node = startNode();
    node.value = tokVal;
    node.raw = tokInput.slice(tokStart, tokEnd);
    next();
    return finishNode(node, "Literal");
  }

  // Parse the next token as an Objective-J typ.
  // It can be 'id' followed by a optional protocol '<CPKeyValueBinding, ...>'
  // It can be 'void' or 'id'
  // It can be 'signed' or 'unsigned' followed by an optional 'char', 'byte', 'short', 'int' or 'long'
  // It can be 'char', 'byte', 'short', 'int' or 'long'
  // 'int' can be followed by an optinal 'long'. 'long' can be followed by an optional extra 'long'

  function parseObjectiveJType(startFrom) {
    var node = startFrom ? startNodeFrom(startFrom) : startNode();
    if (tokType === _name) {
      // It should be a class name
      node.name = tokVal;
      node.typeisclass = true;
      next();
    } else {
      node.name = tokType.keyword;
      // Do nothing more if it is 'void'
      if (!eat(_void)) {
        if (eat(_id)) {
          // Is it 'id' followed by a '<' parse protocols. Do nothing more if it is only 'id'
          if (tokVal === '<') {
            var first = true,
                protocols = [];
            node.protocols = protocols;
            do {
              next();
              if (first)
                first = false;
              else
                eat(_comma);
              protocols.push(parseIdent(true));
            } while (tokVal !== '>');
            next();
          }
        } else {
          // Now check if it is some basic type or an approved combination of basic types
          var nextKeyWord;
          if (eat(_signed) || eat(_unsigned))
            nextKeyWord = tokType.keyword || true;
          if (eat(_char) || eat(_byte) || eat(_short)) {
            if (nextKeyWord)
              node.name += " " + nextKeyWord;
            nextKeyWord = tokType.keyword || true;
          } else {
            if (eat(_int)) {
              if (nextKeyWord)
                node.name += " " + nextKeyWord;
              nextKeyWord = tokType.keyword || true;
            }
            if (eat(_long)) {
              if (nextKeyWord)
                node.name += " " + nextKeyWord;
              nextKeyWord = tokType.keyword || true;
              if (eat(_long)) {
                node.name += " " + nextKeyWord;
              }
            }
          }
          if (!nextKeyWord) {
            // It must be a class name if it was not a basic type. // FIXME: This is not true
            node.name = (!options.forbidReserved && tokType.keyword) || unexpected();
            node.typeisclass = true;
            next();
          }
        }
      }
    }
   return finishNode(node, "ObjectiveJType");
  }

});
