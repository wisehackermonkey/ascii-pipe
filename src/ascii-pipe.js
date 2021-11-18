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
    arrow: /(?:\=\>)/,
    block: /[|]/,//https://regexr.com/69ouf
    out: /(?:\=\>[\t]|[\s]{4})/,
    // id:{ match: / (?:\=\>\||\=\>|[\|]|[\t]|[\s]{4}|[\s]|\w+|\n)/, lineBreaks: true },
    func_name: /[a-zA-Z0-9_]+/,
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
const tokenPrittyPrint = (x) => {

    return x.map((y)=>{
        // console.log(tokenNames[y])
       return tokenNames[y]
    })
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
const listTokenTypes = (x) => x.map(x => x.type)
const printTokenList = (x) => x.map((x) => console.log(x.type))

const locFirstCell = (x) => x.indexOf("|")


let examples = [
    "",
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
console.log(examples[1].replaceAll("\t", "    "))
// pipe(examples[1].replaceAll("\t", "    "), tokenize, listTokenTypes, tokenPrittyPrint,printList)
pipe(examples[1].replaceAll("\t", "    "), tokenize, listTokenTypes, printList)


// let datastruct = [
//     [fn,fn
//     ]
// ]
