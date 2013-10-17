var fs = require("fs"),
    acorn = require("../acorn.js");

function getLoggingMacros(logLevel)
{
    var code = fs.readFileSync("logging-defines.js", "utf8");
    acorn.parse(code, {macros: ["LOG_LEVEL=" + logLevel]});
    return acorn.getMacros();
}

function testLogging(code, logLevel)
{
    var macros = getLoggingMacros(logLevel);
    var ast = acorn.parse(code, {macros: macros});

    console.log("\nLOG_LEVEL == " + logLevel);
    console.log(JSON.stringify(ast, null, 2));
}

try
{
    code = fs.readFileSync("logging-test.js", "utf8");
    testLogging(code, 0);
    testLogging(code, 1);
    testLogging(code, 2);
    testLogging(code, 3);
}
catch (e)
{
    console.log(e.message);
    process.exit(1);
}
