

const nearley = require("nearley");
const grammar = require("./grammar.js");
// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const print = (x) => { console.log(x); return x; }
// const printJson = (x) => { console.log(JSON.stringify(x)); return x; }
const printJson = (x) => {
    if (typeof (x) === "object") { console.log(JSON.stringify(x, null, 2)) } else {
        console.log(x)
    }
    ; return x;
}

function flatten(ary) {
    return ary.reduce(function (a, b) {
        if (Array.isArray(b)) {
            return a.concat(flatten(b))
        }
        return a.concat(b)
    }, [])
}

const filtertypes = (x) => {
    return flatten(x).filter((y) => {
        return !(y.type === "arrow" || y.type === "block")
    })
}

const parse = (x) => { parser.feed(x); return parser.results[0]; }
const uneque = (x) => { return [... new Set(x)] }
const fnsToDict = (fns) => {
    let result = {}
    fns.map(fn => {
        if (typeof (fn) === "function") {
            result[fn.name] = fn
        }
    })
    return result
}
// [fn1,fn2], {fn: fn1}
const matchFunctionNames = (x, fns) => {
    const functionDictonary = fnsToDict(fns)
    console.log(functionDictonary)
    return x.map((y) => {
        print(y)
        printJson(functionDictonary[y])

        return functionDictonary[y]
    })
}
const asciiPipe = (dslString, functions) => {
    let parsed = pipe(dslString, parse, filtertypes, printJson, [matchFns, functions], printJson)
    ouput = pipe(input, ...parsed, printJson)
    return ouput
}
const matchFns = (fnNames, fns) => {
    let fnDict = fnsToDict(fns)
    let results = []

    fnNames.map((x) => {
        results.push(fnDict[x])
    })
    return results
}

const combindOutput = (input) => input.join(", ")
const astToStandardArrayFormat = (ast) => {

    fnNames = ast.slice(1,-1)

    let result = [ast[0], fnNames, ast[ast.length - 1]]
    return result
}
waitfn = (fn) => {
    return new Promise((resolve, reject) => {
        console.log("prom 1");
        resolve(pipe(...fn))
    },
    )
}
// wait for all functions within the waitforarry to complete befoer returning
// argument format
// pipes = [
//   [<input value>,name of function called no args>,....],
//   [<input value>,[<name of function>, <arg1>,......],....],
///  [...],.....
//]
block = async (pipes) => {
    let waitForPipes = pipes.map((__pipe__) => {
        return waitfn(__pipe__)
    });

    const all = Promise.all(waitForPipes)
        .catch(err => console.log('Promise was rejected!', err));
    return all
}




run = async (input) => {

    let subPipe = () => pipe(input, fn1, fn8)

    let result = await block([
        [input, fn5],
        [input, fn6],
        [input, subPipe],
        [input, fn7, [fn4, true]]
    ]);
    console.log(result)
    pipe(result, combindOutput, printJson);
};


// run("<markdown doc data>")

// eval("console.log(fn5('eval'))")
// usecase for race, api endpoint that is unrelable and you need to make 100 calls to it to get any headway
// improvement/fix need a way to split hat input into variants to be usefull

//like split array into 1 function for each element in the array, or a pool of 10
//there is not much use for .race its kinda rare, add it as a future feature



let parsed = [
    {
        type: "function_name", value: "input"
    },
    {
        type: "block", value: 1
    },
    [
        {
            type: "function_name",
            value: "fn5"
        },
        {
            type: "function_name",
            value: "fn1"
        }
    ],
    {
        type: "block", value: 2
    },
    {
        type: "function_name",
        value: "output"
    }
]

let astToPipeArgs = (ast) => {
    let inputName = ast[0].value//first index has is object containing "input" variable name\
    let outputName = ast[ast.length - 1].value


    let fns = ast[1].map((fn) => {
        return fn.value
    })
    return [inputName, fns, outputName]
}

let convertToAsciiPipe = (formatedAst) => {
    let evalString = ""
    input = formatedAst[0]
    fns = formatedAst[1]
    output = formatedAst[2]
    // let { input, __, output } = formatedAst


    evalString = `
    asciipipe =async()=>{
       // ${output} = "wowks"
        console.log(${output})

    ${output} = await block([
        [${input}, ${fns.join(",")}]
    ]);

    // console.log(${output})
        return output
     }
 
    `
    return evalString
}
// let subPipe = () => pipe(input, fn1, fn8)

// let result = await block([
//     [input, fn5],
//     [input, fn6], 
//     [input, subPipe],
//     [input, fn7, [fn4, true]]
// ]);
// console.log(result)
// pipe(result, combindOutput, printJson);

run2 = async () => {

    let fn1 = (x) => x + "<a>fn1</a>"
    let fn5 = (x) => x + "<a>fn5</a>"
    let fn6 = (x) => x + "<a>fn6</a>"
    let fn8 = (x) => x + "<a>fn8</a>"
    let fn7 = (x) => x + "<a>fn7</a>"

    //example of options for a function
    const fn4 = (x, argument = false) => {
        if (argument) {
            return x + " harry"
        } else {
            return x + " ron"

        }
    }

    let input = "<markdown doc data>"
    let output = "what?"
    let result = pipe(parsed, astToPipeArgs, printJson, convertToAsciiPipe, print)
    eval(result)

    console.log(await asciipipe())
    console.log(output)
}
// run2()





run3 = async () => {

    let fn1 = (x) => x + "<a>fn1</a>"
    let fn5 = (x) => x + "<a>fn5</a>"
    let fn6 = (x) => x + "<a>fn6</a>"
    let fn8 = (x) => x + "<a>fn8</a>"
    let fn7 = (x) => x + "<a>fn7</a>"

    //example of options for a function
    const fn4 = (x, argument = false) => {
        if (argument) {
            return x + " harry"
        } else {
            return x + " ron"

        }
    }

    let input = "<markdown doc data>"
    let output = "what?"

    let DSLString = "input=>|fn5=>|=>output"
 

    let result = pipe(DSLString, parse, printJson, filtertypes, printJson,astToStandardArrayFormat,printJson, astToPipeArgs, printJson, convertToAsciiPipe, print)
    eval(result)

    console.log(await asciipipe())
    console.log(output)
}

run3()