const nearley = require("nearley");
const grammar = require("./grammar.js");
// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const print = (x) => { console.log(x); return x; }
const printJson = (x) => { console.log(JSON.stringify(x)); return x; }

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
        return !(y === "arrow" || y === "block")
    })
}

const parse = (x) => { parser.feed(x); return parser.results; }
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
// Parse something!
// parser.feed("input=>|fn0=>|=>output");
// parser.feed("input=>|fn0=>|fn0=>|fn0=>|=>output");
// parser.feed("input=>|fn0=>fn1=>|fn2=>|=>output");

// parser.results is an array of possible parsings.
// console.log(JSON.stringify(parser.results[0]));

let p = [["input", ["block", [["fn0", "arrow"]]], ["block", [["fn0", "arrow"]]], "output"]]

// let ouput = pipe(p[0],(x)=>{

// })

// const res = flattener(p)//p.flat(3)
// console.log(JSON.stringify(res));
const input = "input+"
const fn0 = (x) => { console.log(x + " fn0"); return x + " fnWORKS" }
const fn1 = (x) => x + " fn1"
const fn2 = (x) => x + " fnawesome"
// const fn0 =(x)=>x +"fn0"
let output = ""
// pipe("input=>|fn0=>fn1=>|fn2=>|=>output", parse, filtertypes, printJson)
// pipe("input=>|fn0=>fn1=>|fn2=>|=>output", [asciiPipe, [input, fn0, fn1, fn2, output]], printJson)
// pipe(matchFunctionNames(['input', 'fn0','fn1', 'fn1', 'fn2', 'output'],[input, fn0, fn1, fn2, output]), printJson)
// pipe([input, fn0, fn1, fn2, output], fnsToDict, printJson)["fn0"]("w9w");
// pipe(matchFunctionNames(['fn0', 'fn1', 'fn1', 'fn2'], [fn0, fn1, fn2]), printJson)

// test = [fn1, fn2, fn2]
// ouput = pipe(input, ...test, printJson)


a = ['fn0', 'fn1', 'fn1', 'fn2']
b = [fn0, fn1, fn2]

// bDict = fnsToDict(b)

// console.log(bDict)
// console.log(bDict[a[0]]("hello"))
// console.log(matchFns(a,b))
let results = matchFns(a, b)
ouput = pipe(input, ...results, printJson)

// asciiPipe("input=>|fn0=>|fn1=>|fn2=>|=>output", [fn0, fn1, fn2])
