

// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
const print = (x) => { console.log(x); return x; }
const printJson = (x) => { console.log(JSON.stringify(x)); return x; }

const combindOutput = (input) => input.join(", ")
// // Input2=>|  fn1=>| fn8=>|
// //         |  fn7=>^
let input = "Turtle & the haire"

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


run = async (input) => {

    let subPipe = () => pipe(input, fn1, fn8)

    let result = await block([
        [input, fn5],
        [input, fn6],
        [input, subPipe],
        [input, fn7,[fn4,true]]
    ]);
    console.log(result)
    pipe(result, combindOutput, printJson);
};


run("<markdown doc data>")

eval("console.log(fn5('eval'))")
// usecase for race, api endpoint that is unrelable and you need to make 100 calls to it to get any headway
// improvement/fix need a way to split hat input into variants to be usefull

//like split array into 1 function for each element in the array, or a pool of 10
//there is not much use for .race its kinda rare, add it as a future feature

