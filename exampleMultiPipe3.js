
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const moo = require("moo");

// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)


const lexer = moo.compile({
    newline: { match: /(?:\r\n?|\n)+/, lineBreaks: true },
    blank: /[\t]|[\s]{4}/,
    arrow: /(?:\=\>)/,
    block: /[|]/,//https://regexr.com/69ouf
    out: /(?:\=\>[\t]|[\s]{4})/,
    // id:{ match: / (?:\=\>\||\=\>|[\|]|[\t]|[\s]{4}|[\s]|\w+|\n)/, lineBreaks: true },
    function_name: /[a-zA-Z0-9_]+/,
    // word: /[a-z]+/,
    // times:  /\*|x/
});


const listTokenTypes = (x) => x.map(x => ({ type: x.type, value: x.text }))

const print = (x) => { console.log(x); return x; }
// const printJson = (x) => { console.log(JSON.stringify(x)); return x; }
const printJson = (x) => {
    if (typeof (x) === "object") { console.log(JSON.stringify(x)) } else {
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




// run = async (input) => {

//     let subPipe = () => pipe(input, fn1, fn8)

//     let result = await block([
//         [input, fn5],
//         [input, fn6],
//         [input, subPipe],
//         [input, fn7, [fn4, true]]
//     ]);
//     console.log(result)
//     pipe(result, combindOutput, printJson);
// };


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
   

    evalString = `
    asciipipeRun =async()=>{
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

const asciipipe = async (dslString) => {
    return await pipe(dslString, parse, printJson, filtertypes, astToStandardArrayFormat, astToPipeArgs, convertToAsciiPipe, print);
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


//     let result =  pipe(dslString, parse, printJson, filtertypes, printJson, astToStandardArrayFormat, printJson, astToPipeArgs, printJson, convertToAsciiPipe, print);
//     return result;
// }



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
    const guessAge = async (name) => {
        const response = await fetch(`https://api.agify.io/?name=${await name}`)
        const body = await response.json();
        return body
    }
    let input = "michael"
    let output = "what?"

    // let DSLString = "input=>|fn5=>|=>output"

    let DSLString = "input=>|guessAge=>|=>output"

    let result = pipe(DSLString, parse, printJson, filtertypes, printJson, astToStandardArrayFormat, printJson, astToPipeArgs, printJson, convertToAsciiPipe, print)
    // let result = pipe(DSLString, parse, filtertypes, astToStandardArrayFormat, astToPipeArgs, convertToAsciiPipe, print)

    eval(result)
    await run()
    console.log(output)
}

// run3()

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

    eval(await asciipipe(`name=>|writeToDb=>|guessAge=>|fn7=>|=>response`))
    await asciipipeRun()
    console.log(response)
}
run4()