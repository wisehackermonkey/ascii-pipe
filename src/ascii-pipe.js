// main code
// let acornLoose = require("acorn-loose");
const moo = require("moo");

let tokenNames = {
    newline: "\n",
    arrow: "=>",
    block: "|",//https://regexr.com/69ouf
    out_arrow: "=>    ",
    // id:{ match: / (?:\=\>\||\=\>|[\|]|[\t]|[\s]{4}|[\s]|\w+|\n)/, lineBreaks: true },
    func_name: "fn",
}

const lexer = moo.compile({
    newline: { match: /(?:\r\n?|\n)+/, lineBreaks: true },
    blank: /[\t ]+/,//includes tabs and spaces
    arrow: /(?:\=\>)/,
    block: /[|]/,//https://regexr.com/69ouf
    // id:{ match: / (?:\=\>\||\=\>|[\|]|[\t]|[\s]{4}|[\s]|\w+|\n)/, lineBreaks: true },
    function_name: /[a-zA-Z0-9_]+/,

    // out: /(?:\=\>)[\t ]*?(?:[a-zA-Z0-9_]+$)/,
    // word: /[a-z]+/,
    // times:  /\*|x/
});

// const lexerLevel2 = moo.compile({
// cell: //,
// arrow: /(?:\=\>)/,
// block: /[|]/,//https://regexr.com/69ouf
// out_arrow: /(?:\=\>[\t]|[\s]{4})/,
// // id:{ match: / (?:\=\>\||\=\>|[\|]|[\t]|[\s]{4}|[\s]|\w+|\n)/, lineBreaks: true },
// func_name: /[a-zA-Z0-9_]+/,
// word: /[a-z]+/,
// times:  /\*|x/
// });
// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
const splitColum = (x) => x.split("=>|");
const splitColumns = (x) => x.split("\n");
const toRowColumns = (x) => x.map((x) => splitColum(x))
const print = (x) => console.log(x)
const printList = (x) => console.log(x.join(""))
const printJson = (x) => {
    if (typeof (x) === "object") { console.log(JSON.stringify(x)) } else {
        console.log(x)
    }
    ; return x;
}
const tokenPrittyPrint = (x) => {

    print(x.map((y) => {
        // console.log(tokenNames[y])
        return y.text
    }))
    return x
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
const printTokenList = (x) => x.map((x) => console.log(x.type))

const locFirstCell = (x) => x.indexOf("|")

const splitRowsCols = (x) => {
    lines = x.split("newline")
    lines = lines.x.map()
    longest =
        result = []
    return result
}
let examples = [
    "",
    `name=>|guessname=>|=>results
input=>|fn0=>|=>output`,
    `input=>|fn0=>|=>output`,

    `
Input|fn8|=>|
fn|f3`,
    `Input=>|    fn8=>|    f3=>|=>    ou2_t
    `,
    `Input=>|fn8=>|f3=>|=>    ou2_t`,
    `input=>|`,

    `    
Input=>|fn8=>|f3=>|=>out
Input=>|fn8=>|f3=>|=>out`,
    `
Input=>|fn8=>|  =>|=>out
Input=>|fn8=>|f3=>|=>out`,
    `
		|	fn2	 =>			 =>|		 
input =>|	fn1	 =>|	fn8	 =>|=>	out
		|	fn7	 =>|						
`
]
// pipe(examples[4].replaceAll("\t","    "),splitColumns,toRowColumns, print)
// pipe(examples[1],splitColum, print)
// console.log(examples[1].replaceAll("\t", "    "))
// pipe(examples[1].replaceAll("\t", "    "), tokenize, listTokenTypes, tokenPrittyPrint,printList)

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
    tempMaxRows.push(x.filter((t) => t.type == "block").length)
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
// example = `name=>|first=>|=>results
// name2=>|first2=>|=>results2`
example =
    `name=>|first=>|second=>|=>result `
//      |fn1  =>|fn2   =>| fn3=>|fn4=>fn5=>fn6=>|=>output`
// example = `
//         |	r2_1	 =>| ___=>|		 
// in3   =>|	r3_1	 =>| r3_2=>|=>	out
// `

// setblockMax = (x) => { ; return x }

counter = 0
pipe(example, splitNewlines, countBlockForRows, printJson, (rows) => {
    let blocks = new Array(maxRows).fill([])
    let result = rows.map((row) => {

        let block_number = 0
        if (row[row.length - 1].type === "function_name" && row[row.length - 2].type === "arrow" && row[row.length - 3].type === "block") {
            row = row.slice(0, -2)
        }
        row = row.filter(x => x.type === "block" || x.type === "function_name")
        print(row)
        let i = row.findIndex(x => x.type === "block")[0].index
        
        for (let tokenIndex = i + 1; tokenIndex < row.length - 1 && row[tokenIndex].type !== "block"; tokenIndex++) {

            if (row[tokenIndex].type === "function_name") {
                blocks[block_number][0] = row[tokenIndex]
                counter++
                //     i = row[tokenIndex].index 
            }
        }
        block_number += 1


    
    })
return blocks
}, console.log)
console.log(counter)


// console.log(result)

// console.log(blockStartRange)

// forEachRow = (x)=>

// result.map((line, index) => {
//     // if (line.length === 0) {
//     //     console.log("line is 0 in length")
//     //     return
//     // }
//     let block_number = 0
//     // [
//     //     { type: 'function_name', value: 'name' },
//     //     { type: 'arrow', value: '=>' },
//     //     { type: 'block', value: '|', block_num: 1, index: 2 },
//     //     { type: 'function_name', value: 'first' },
//     //     { type: 'arrow', value: '=>' },
//     //     { type: 'block', value: '|', block_num: 2, index: 5 },
//     //     { type: 'arrow', value: '=>' },
//     //     { type: 'function_name', value: 'results' }
//     //   ].map()

//       for (let i = 0; i < line.length; i++) {
//           const token = line[i];



//         // printJson(line)
//         // const token = line[i];
//         // scan untill you find the start of a block
//         if (token.type === "block") {
//             // block_number = token.block_number
//             // process functions in a block add to block []
//             let current_token = i +1
//             console.log(i)
//             // keep adding any function names untill you get to theend of the block
//             while (line[current_token] !== undefined && line[current_token].type !== "block") {
//                 // console.log(current_token)
//                 if (line[current_token].type === "function_name") {
//                     blocks[block_number].push(line[current_token])
//                  }
//                 // advance a token
//                 current_token += 1
//             }
//             // this is really important, this allows for 
//             // adding functions via columns instead of rows
//             block_number += 1
//             // i= current_token +1
//             console.log(i)

//         }
//     }

// })

// current_token = blockStartRange + 1
// while (result[0][current_token].type !== "block") {
//     if (result[0][current_token].type === "function_name") {
//         console.log(result[0][current_token])
//         buckets[0].push(result[0][current_token])

//     }
//     current_token++
// }
// console.log(current_token)
// console.log(result[0][current_token])


// let datastruct = [
//     [fn,fn
//     ]
// ]
