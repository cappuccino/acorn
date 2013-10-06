/*
    Tests from the GNU C 4.0 Preprocessor User Guide
*/

// #define may be indented
    #define FOO 7
foo = FOO;
// foo = 7;

// # may be separated from directive by whitespace
#    undef FOO
# define FOO 13
foo = FOO;
// foo = 13;

/*
    3.1 Object-like Macros
*/

// Macros may span multiple lines
#define NUMBERS 1, \
                2, \
                3
var x = [NUMBERS];
// var x = [1, 2, 3];

// Macros only take effect from point of definition
foo = X;
#define X 4
bar = X;
// foo = X;
// bar = 4;

// Macros are evaluated when expanded
#define TABLESIZE BUFSIZE
#define BUFSIZE 1024
foo = TABLESIZE;
// foo = 1024;

// Macros can be redefined
#undef BUFSIZE
#define BUFSIZE 1020
#define TABLESIZE BUFSIZE
foo = TABLESIZE;
// foo = 1020;
#undef BUFSIZE
#define BUFSIZE 37
foo = TABLESIZE;
// foo = 37;

/*
    3.2 Function-like Macros
*/

// Macros can be called like functions
#define lang_init()  c_init()
lang_init();
// c_init();

// Function macros used without args are not expanded
function foobar() { console.log("out of line"); }
#define foobar()  console.log("inline");
foobar();
// console.log("inline");
funcptr = foobar;
// funcptr = foobar

// Macro parameters must immediately follow the name
#undef lang_init
#define lang_init (arg);    c_init()
lang_init();
// arg;
// c_init()();

/*
    3.3 Macro Arguments
*/

// Macros can take arguments
#define min(X, Y)  ((X) < (Y) ? (X) : (Y))
x = min(a, b);         // x = ((a) < (b) ? (a) : (b));
y = min(1, 2);         // y = ((1) < (2) ? (1) : (2));
z = min(a + 28, p);    // z = ((a + 28) < (*p) ? (a + 28) : (p));

// Leading and trailing whitespace is trimmed, whitespace between tokens is reduced to single space
x = min(  a   +   7,
         b
         -
         13  );
// x = a + 7 < b - 13 ? a + 7 : b + 13;

// Square braces do not have to balance
#define square_brackets(arg1, arg2)  arg1 ## arg2
a = square_brackets([x, y]);
// a = [xy];

// Commas may be within arguments
#define comma(arg)  arg;
comma((x = 0, y = 1));
// (x = 0, y = 1);

// Arguments are macro-expanded before substitution
#define DOUBLE(arg)  (arg) * 2
x = min(DOUBLE(a), 10);
// x = a * 2 < 10 ? a * 2 : 10;

// After substitution, the complete text is scanned again for macros
// to expand, including the arguments
#define QUADRUPLE(arg)  DOUBLE(arg) * 2
x = QUADRUPLE(7);
// ==> x = DOUBLE(7) * 2;
// x = 7 * 2 * 2;

#define paste_arg(arg1, arg2)  arg1 ## arg2
x = paste_arg(QUAD, RUPLE(7));
// ==> x = QUAD ## RUPLE(7);
// ==> x = QUADRUPLE(7);
// x = 7 * 2 * 2;

// Arguments may be empty
#define ARGS(arg, arg2)  arg arg2
ARGS(,);   // <empty>
ARGS(, 2);  // 2;
ARGS(1,);  // 1;

// Macro parameters appearing inside string literals are not replaced by their corresponding actual arguments
#define literal(arg)  arg; "arg"
literal(test);
// test;
// "arg";

/*
    3.4 Stringification
*/

// The preprocessor backslash-escapes the quotes surrounding embedded string constants,
// and all backslashes within string and character constants
#define stringify(arg)  #arg
x = stringify(p = "foo\n");
x = stringify(p = 'foo\n');
// x = "p = \"foo\\n\"";
// x = "p = 'foo\n'";

// Backslashes that are not inside string or character constants are not duplicated
x = stringify("foo	bar");
// x = "\"foo\tbar\"";

// All leading and trailing whitespace in text being stringified is ignored.
// Any sequence of whitespace in the middle of the text is converted to a single space
// in the stringified result.
x = stringify(   foo  =
                '  b a r  '   );
// x = "foo = '  b a r '";

// If you want to stringify the result of expansion of a macro argument,
// you have to use two levels of macros.
#define xstr(s) str(s)
#define str(s) #s
#define foo 4
str (foo);
// "foo";
xstr (foo);
// "4";

// Empty arg becomes empty string
#define stringify2(arg1, arg2)  #arg2
x = stringify2(foo,);
// x = "";

/*
    3.5 Concatenation
*/

// As with stringification, the actual argument is not macro-expanded first.
#define concatenate(arg1, arg2)  arg1 + arg1 ## arg2 ## 7
x = concatenate(foo, bar);
// x = 4 + foobar7;

// If the argument is empty, that `##' has no effect.
x = concatenate(foo, );
// x = 4 + foo7;

// Only the leading and trailing tokens are pasted
x = concatenate(foo + 1, 7 + foo);
// x = 4 + 1 + 17 + foo7;

#define COMMAND(NAME)  { name: #NAME, command: NAME ## _command }
x = COMMAND(foo);
// x = {name: "foo", command: foo_command};

// If the pasted token is invalid, a warning is issued and the two tokens are left as is
#define paste_fail(arg1, arg2)  arg1 ## arg2
x = paste_fail("paste", + "me");
// x = "paste" + "me";

/*
    3.6 Variadic Macros
*/

// Variadic macros may also have named parameters
#define variadic(arg, ...)  arg __VA_ARGS__
x = variadic(7);
// x = 7;

// The named parameter may be empty in the arguments, args are macro-expanded
#define ignore_arg(arg, ...)  arg someFunction(__VA_ARGS__)
#define increment(arg)  arg + 1
ignore_arg(, "foo", increment(7), 13);
// someFunction("foo", 7 + 1, 13);

// Using both named and variadic parameters
#define debuglog(format, ...)  if (debugging) console.log(format, __VA_ARGS__)
debuglog("%s: (%d, %d)", "foo", 13.27, 31.7);
// if (debugging)
//     console.log("%s: (%d, %d)", "foo", 13.27, 31.7);

#define variadic2(...)  __VA_ARGS__
variadic2();
// <compiles to nothing>
variadic2(var x = 1, y = 2, z = 3);
// var x = 1,
//     y = 2,
//     z = 3;

/*
    3.8 Undefining and Redefining Macros

    NOTE: Equivalence between macro definitions follows the GCC docs
    except for whitespace checking.
*/

// Redefining equivalent macros does not warn
#define redefine1 1
#define redefine1 1

// If number of parameters is different, they are not equivalent
#define redefine2(arg)  arg
#define redefine2(arg, arg2)  arg  // warns

// If type (object/function) is different, they are not equivalent
#define redefine3()  7
#define redefine3    7  // warns

// If the tokens of the macro are not the same, they are not equivalent
#define redefine4  "one" + 1
#define redefine4  "ones" + 1  // warns
#define redefine4  "one" + 2   // warns
#define redefine4  ("one" + 1) // warns

/*
    3.7.1 Standard Predefined Macros

    Only __OBJJ__ is defined at this point.
*/

objj = __OBJJ__;
// If options.objj is on:
// objj = 1;
// Else:
// objj = __OBJJ__;

/*
    3.10.6 Argument Prescan
*/

#define AFTERX(x) X_ ## x
#define XAFTERX(x) AFTERX(x)
#define TABLESIZE 1024
#define BUFSIZE TABLESIZE

var a = AFTERX(BUFSIZE),
    b = XAFTERX(BUFSIZE);
// var a = X_BUFSIZE,
//     b = X_1024;
