// main code 
const moo = require("moo");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));


const lexer = moo.compile({
    newline: { match: /(?:\r\n?|\n)+/, lineBreaks: true },
    blank: /[\t ]+/,//includes tabs and spaces
    arrow: /(?:\=\>)/,
    block: /[|]/,//https://regexr.com/69ouf
    function_name: /[a-zA-Z0-9_]+/,

});


// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)

const print = (x) => console.log(x)
const printJson = (x) => {
    if (typeof (x) === "object") { console.log(JSON.stringify(x)) } else {
        console.log(x)
    }
    ; return x;
}
const tokenize = (x) => {
    lexer.reset(x)
    let tokens = []
    let currentToken = lexer.next()
    while (currentToken) {

        tokens.push(currentToken)
        currentToken = lexer.next()
    }
    return tokens
}
const listTokenTypes = (x) => x.map(x => ({ type: x.type, value: x.text }))

let countBlocks = (ast) => {
    let counter = 1
    ast.map((x, index) => {
        if (x.type === "block") {
            x.block_number = counter
            x.index = index
            counter += 1
            return x
        }
    });
    return ast
}
let splitNewlines = (x) => {
    return x.split("\n")
}



let removeWhitespaceTokens = (x) => (x.filter((t) => t.type !== "blank"))

let maxRows = 0
let tempMaxRows = []

let setMaxRows = (x) => {
    tempMaxRows.push(x.filter((t) => t.type == "block").length)//missing ===
    return x
}
let countBlockForRows = (rows) => {
    let result = rows.map((x) => {
        return pipe(x, tokenize, listTokenTypes, removeWhitespaceTokens, setMaxRows, countBlocks)
    })
    maxRows = Math.max(...tempMaxRows)
    // console.log(maxRows)
    return result
}


const mapRowColsToDatastructure = (rows) => {
    let blocks = new Array(maxRows).fill([])
    let inputName = []
    let outputName = []
    rows.map((row) => {

        let block_number = 0
        //find function names add to array of arrays, do this in a column manner, EX: funtion names of the same column get grouped to gether
        row.map((token, i) => {
            if (token.type === "block") {

                for (let tokenIndex = i + 1; tokenIndex < row.length - 1 && row[tokenIndex].type !== "block"; tokenIndex++) {
                    if (row[tokenIndex].type === "function_name") {


                        blocks[block_number] = [...blocks[block_number], row[tokenIndex]]//this splat is a weird issue fix with .push()
                        block_number += 1

                    }
                }
            }
        })

        if (row[0].type === "function_name") {
            inputName.push(row[0])
        }
        if (row[row.length - 1].type === "function_name") {
            outputName.push(row[row.length - 1])
        }

    })
    blocks = blocks.filter(x => x.length > 0)///remove extra [] in block array because  new Array(maxRows).fill([]) is not allways accurate
    blocks.unshift(inputName)
    blocks.push(outputName)
    return blocks
}

let stringFormatFuncRow = (row)=> row.join(",")
const waitfn = (fn) => {
    return new Promise((resolve, reject) => {
        resolve(pipe(...fn))
    })
}
const block = async (pipes) => {
    let waitForPipes = pipes.map((__pipe__) => {
        return waitfn(__pipe__)
    });

    const all = Promise.all(waitForPipes)
        .catch(err => console.log('Promise was rejected!', err));
    return all
}
let convertToAsciiPipe = (formatedAst) => {
    let evalString = ""
    input = formatedAst[0]
    fns = formatedAst[1]
    output = formatedAst[formatedAst.length-1]

    fns=fns.map((arrFns)=>{
        return [...arrFns]
    })
    console.log(formatedAst)
    
    // name=>|writeToDb=>|guessAge=>|fn7=>|=>response
    //       |fn7      =>|     fn7=>|fn7=>|

    [
    'name',
    [ [ 'writeToDb', 'fn7' ], 
      [ 'guessAge', 'fn7' ], 
      [ 'fn7', 'fn7' ] ],
    'response'
    ]
    output = []

    // await r1  = [
    //     pipe(input,writeToDb),
    //     pipe(input,fn7)
    // ]
    // await r2 =  [
    //     pipe(r1[0],guessAge)
    //     pipe(r1[1] ,fn7)
    // ]
    
    // await r3 =  [
    //     pipe(r2[0] ,fn7),
    //     pipe(r2[1],fn7)
    // ]

    input.join(",")
     r1  = await block([
        [input,writeToDb],
        [input,fn7]
    ])
    r2 =  await block([
        [r1[0],guessAge],
        [r1[1] ,fn7]
    ])
    
    r3 = await block([
        [r2[0] ,fn7],
        [r2[1],fn7]
    ])
    output = r3
    
    // evalString = `
    // var asciipipeRun =async()=>{
    
    // ${output} = await block(${JSON.stringify(fns)});
    //     return output
    //  }
 
    // `
    return evalString
}


let astToPipeArgs = (ast) => {
 
}

const astToStandardArrayFormat = (ast) => {
    fnNames = ast.slice(1, -1)

    let inputName = ast[0][0].value//first index has is object containing "input" variable name\
    let outputName = ast[ast.length-1][0].value

    let fns = fnNames.map((arrFns) => {
        return arrFns.map((fn) => {
        return fn.value
        })
    })
     return [inputName, fns, outputName]
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
const parse = (x) => {

    lexer.reset(x)
    let tokens = []
    let currentToken = lexer.next()
    while (currentToken) {

        tokens.push(currentToken)
        currentToken = lexer.next()
    }

    return pipe(tokens, listTokenTypes)

}
const asciipipe = async (dslString) => {
    return await pipe(dslString, splitNewlines, countBlockForRows, mapRowColsToDatastructure,printJson,  astToStandardArrayFormat,printJson,convertToAsciiPipe)
    // return await pipe(dslString, parse, printJson, filtertypes, astToStandardArrayFormat, astToPipeArgs, convertToAsciiPipe, print);
}
example =
    `name =>| a =>| b =>| c =>| d=>result
            | 1 =>| 2 =>|`

// let datastruct = pipe(example, splitNewlines, countBlockForRows, printJson, mapRowColsToDatastructure, print)



let run4 = async () => {
    let name = "micheal"
    let response = ""

    const guessAge = async (name) =>
        await (await fetch(`https://api.agify.io/?name=${await name}`)).json()
    const writeToDb = async (apiResponse) => {
        console.log("Start to db write")
        return new Promise((resolve, failed) => {
            setTimeout(() => {
                console.log("db write: Sucessfull")

                resolve(apiResponse)
            }, 3000)
        })

    }
    let fn7 = async (x) => {
        return print(x)
    }
    result = await asciipipe(`name=>|writeToDb=>|guessAge=>|fn7=>|=>response
    |fn7=>|fn7=>|fn7=>|`)
    print(result)
    eval(result)
    await asciipipeRun()
    console.log(response)
}
run4()