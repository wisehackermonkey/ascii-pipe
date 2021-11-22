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
let arrayPush = (array, x) => {
    array.push(x)
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
        //
        if(row[0].type==="function_name"){
            blocks = [row[0].type,...blocks]
        }
    })
    return blocks
}


let convertToAsciiPipe = (formatedAst) => {
    let evalString = ""
    input = formatedAst[0]
    fns = formatedAst[1]
    output = formatedAst[2]
   

    evalString = `
    var asciipipeRun =async()=>{
    
    ${output} = await block([
        [${input}, ${fns.join(",")}]
    ]);
        return output
     }
 
    `
    return evalString
}

 
let astToPipeArgs = (ast) => {
    let inputName = ast[0].value//first index has is object containing "input" variable name\
    let outputName = ast[ast.length - 1].value


    let fns = ast[1].map((fn) => {
        return fn.value
    })
    return [inputName, fns, outputName]
}
 
const astToStandardArrayFormat = (ast) => {

    fnNames = ast.slice(1, -1)

    let result = [ast[0], fnNames, ast[ast.length - 1]]
    return result
}
waitfn = (fn) => {
    return new Promise((resolve, reject) => {
        resolve(pipe(...fn))
    })
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
    return await pipe(dslString, parse, printJson, filtertypes, astToStandardArrayFormat, astToPipeArgs, convertToAsciiPipe, print);
}
// example =
//     `name =>| a =>| b =>| c =>| d=>result
//      name =>| 1 =>| 2 =>| =>result`
 
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
    let fn7 = async(x) => {
        return print(x)
    }
    result = await asciipipe(`name=>|writeToDb=>|guessAge=>|fn7=>|=>response`)
    print(result)
    eval(result)
    await asciipipeRun()
    console.log(response)
}
run4()