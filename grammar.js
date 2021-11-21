// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["function", "arrow", "cells", "block", "arrow", "function"], "postprocess": (d)=>{return [d[0][0],d[2],d[2],d[5][0]]}},
    {"name": "main", "symbols": ["cells"]},
    {"name": "cells$ebnf$1", "symbols": []},
    {"name": "cells$ebnf$1$subexpression$1", "symbols": ["cell", "block"]},
    {"name": "cells$ebnf$1", "symbols": ["cells$ebnf$1", "cells$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cells", "symbols": ["cells$ebnf$1"]},
    {"name": "cells$ebnf$2", "symbols": []},
    {"name": "cells$ebnf$2$subexpression$1", "symbols": ["block", "cell"]},
    {"name": "cells$ebnf$2", "symbols": ["cells$ebnf$2", "cells$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cells", "symbols": ["cells$ebnf$2"], "postprocess": (d)=>{return d[0][0]}},
    {"name": "cell$ebnf$1", "symbols": []},
    {"name": "cell$ebnf$1$subexpression$1", "symbols": ["block", "function", "arrow"]},
    {"name": "cell$ebnf$1", "symbols": ["cell$ebnf$1", "cell$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cell", "symbols": ["cell$ebnf$1"], "postprocess": (d)=>{return null}},
    {"name": "cell$ebnf$2", "symbols": []},
    {"name": "cell$ebnf$2$subexpression$1", "symbols": ["function", "arrow"]},
    {"name": "cell$ebnf$2", "symbols": ["cell$ebnf$2", "cell$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cell", "symbols": ["cell$ebnf$2"], "postprocess": (d)=>{return d[0]}},
    {"name": "blank", "symbols": [/[\t]/]},
    {"name": "blank", "symbols": [/[\s\s\s\s]/]},
    {"name": "block", "symbols": [/[|]/], "postprocess": (d)=>{return {type:"block",value:null}}},
    {"name": "arrow$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "arrow", "symbols": ["arrow$string$1"], "postprocess": (d)=>{return {type:"arrow",value:null} }},
    {"name": "function", "symbols": ["function_name", {"literal":"("}, "arg", {"literal":")"}], "postprocess": (d)=> {return [d[0],d[2]]}},
    {"name": "function", "symbols": ["function_name"]},
    {"name": "arg$ebnf$1", "symbols": []},
    {"name": "arg$ebnf$1", "symbols": ["arg$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arg", "symbols": ["arg$ebnf$1"], "postprocess": (d)=> {return {type:"function_arg", value:d[0].join("")}}},
    {"name": "function_name$ebnf$1", "symbols": []},
    {"name": "function_name$ebnf$1", "symbols": ["function_name$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function_name", "symbols": ["function_name$ebnf$1"], "postprocess": (d)=> {return {type:"function_name", value:d[0].join("")}}}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
