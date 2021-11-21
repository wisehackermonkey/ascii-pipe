main -> function arrow   cells   block arrow function  
main -> cells


#cells -> block cell block {%(d)=>{return d[0]}  %}

cells -> (cell block):* 
cells -> (block cell):*{%(d)=>{return d[0][0]}  %}


cell -> (block function arrow ):*  {%(d)=>{return null}  %}
cell -> (function arrow ):* {%(d)=>{return d[0]}  %}

blank -> [\t]|[\s\s\s\s]
block -> [|] {%(d)=>{return {type:"block",value:null}} %}
arrow -> "=>" {%(d)=>{return {type:"arrow",value:null} }%}
function -> function_name "(" arg ")"  {% (d)=> {return [d[0],d[2]]}%}  
          | function_name 
arg -> [^`]:*  {% (d)=> {return {type:"function_arg", value:d[0].join("")}}%}  
function_name -> [a-zA-Z0-9_]:* {% (d)=> {return {type:"function_name", value:d[0].join("")}}%}  