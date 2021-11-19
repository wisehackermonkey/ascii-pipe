// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["function", "arrow", "cells", "block", "arrow", "function"], "postprocess": (d)=>{return [d[0],d[2],d[2],d[5]]}},
    {"name": "main", "symbols": ["cells"]},
    {"name": "cells", "symbols": ["block", "cell", "block"]},
    {"name": "cells$ebnf$1", "symbols": []},
    {"name": "cells$ebnf$1$subexpression$1", "symbols": ["cell", "block"]},
    {"name": "cells$ebnf$1", "symbols": ["cells$ebnf$1", "cells$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cells", "symbols": ["cells$ebnf$1"]},
    {"name": "cells$ebnf$2", "symbols": []},
    {"name": "cells$ebnf$2$subexpression$1", "symbols": ["block", "cell"]},
    {"name": "cells$ebnf$2", "symbols": ["cells$ebnf$2", "cells$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cells", "symbols": ["cells$ebnf$2"]},
    {"name": "cell$ebnf$1", "symbols": []},
    {"name": "cell$ebnf$1$subexpression$1", "symbols": ["block", "function", "arrow"]},
    {"name": "cell$ebnf$1", "symbols": ["cell$ebnf$1", "cell$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cell", "symbols": ["cell$ebnf$1"]},
    {"name": "cell$ebnf$2", "symbols": []},
    {"name": "cell$ebnf$2$subexpression$1", "symbols": ["function", "arrow"]},
    {"name": "cell$ebnf$2", "symbols": ["cell$ebnf$2", "cell$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cell", "symbols": ["cell$ebnf$2"]},
    {"name": "blank", "symbols": [/[\t]/]},
    {"name": "blank", "symbols": [/[\s\s\s\s]/]},
    {"name": "block", "symbols": [/[|]/], "postprocess": (d)=>{return "block"}},
    {"name": "arrow$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "arrow", "symbols": ["arrow$string$1"], "postprocess": (d)=>{return "arrow"}},
    {"name": "function$ebnf$1", "symbols": []},
    {"name": "function$ebnf$1$subexpression$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "function$ebnf$1", "symbols": ["function$ebnf$1", "function$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function", "symbols": ["function$ebnf$1"], "postprocess": (d)=> {return d.join("").replaceAll(",","")}}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
