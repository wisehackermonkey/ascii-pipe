// |  fn5       =>|
// Input =>|  fn1=>| fn8=>| 
//         |  fn7=>|    =>| => out
//         |  fn5       =>|
// Input2=>|  fn1=>| fn8=>|
//         |  fn7=>|

//            fn1=>v fn8=>v
// Input2=>|  fn1=>| fn8=>|
//         |  fn7=>^


//         |  fn5 =>    =>|
//         |  fn6 =>    =>|
// Input =>|  fn1=>| fn8=>| 
//         |  fn7=>|    =>| =all> out

//         |  promis [fn5,    =>|
//         |  promis  fn6]    =>|
// Input =>|  pipe([fn1, fn8)=>| 
//         |  pipe(fn7] )        = >| => out
/*
[input], [fn5,fn1,fn2,fn5], [fn8], out
*/

// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
const print = (x) => { console.log(x); return x; }
const printJson = (x) => { console.log(JSON.stringify(x)); return x; }


// const reducer = (...fns)=>  [...fns]

// const fn1 = (x) => x + " fn1"
// const fn2 = (x) => x + " fnawesome"
// const fn3 = (x) => x + " itworks"
// const fn4 = (x,option) => {
//     if(option){
//     return x + " harry"
//     }else{
//         return x + " ron"
        
//     }
// }

const combindOutput = (input) => input.join(", ")
// // Input2=>|  fn1=>| fn8=>|
// //         |  fn7=>^
let input = "Turtle & the haire"
// // [pipe("turtle",fn1,fn2),pipe("haire",fn1,fn2,fn1,fn2)]
// let resultPipe1 =  pipe("turtle",fn1,fn2)
// let resultPipe2 =  pipe("turtle",fn1,fn2)

// []

// sytax suggar, for returning a pipe with arg input ex 
//pipe("haire",fn1,fn2,fn1,fn2)
// becomes
// pipe(["haire",fn1,fn2,fn1,fn2])
//whem passed
//fn = ["haire",fn1,fn2,fn1,fn2]
//pipe(...fn) this is the javascript splat which returns 
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


let fn1 = (x)=> x + "<a>fn1</a>"
let fn5 = (x)=> x + "<a>fn5</a>"
let fn6 = (x)=> x + "<a>fn6</a>"
let fn8 = (x)=> x + "<a>fn8</a>"
let fn7 = (x)=> x + "<a>fn7</a>"

// Input = "<markdown doc data>"

//         |  fn5,           =>|
//         |  fn6            =>|
// Input =>|  fn1=> fn8=>|   =>| 
//         |  fn7            =>|     => out


//         |  fn5,                         =>|
//         |  fn6                          =>|
// Input =>|  fn1(eval("works",true))=> fn8=>|   =>| 
//         |  fn7                          =>|     => out

run = async (input) => {

    let subPipe = ()=>pipe(input, fn1, fn8)
    
    let result = await block([
        [input, fn5],
        [input, fn6],
        [input,subPipe],
        [input, fn7]
    ]);
    console.log(result)
    pipe(result,combindOutput, printJson);
};


run("<markdown doc data>")
// usecase for race, api endpoint that is unrelable and you need to make 100 calls to it to get any headway
// improvement/fix need a way to split hat input into variants to be usefull

//like split array into 1 function for each element in the array, or a pool of 10
//there is not much use for .race its kinda rare, add it as a future feature

