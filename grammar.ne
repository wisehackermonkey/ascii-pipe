
main -> function arrow   cells   block arrow function {%(d)=>{return [d[0][0],d[2],d[2],d[5][0]]}  %}
main -> cells


#cells -> block cell block {%(d)=>{return d[0]}  %}

cells -> (cell block):* 
cells -> (block cell):*{%(d)=>{return d[0][0]}  %}


cell -> (block function arrow ):*  {%(d)=>{return null}  %}
cell -> (function arrow ):* {%(d)=>{return d[0]}  %}

blank -> [\t]|[\s\s\s\s]
block -> [|] {%(d)=>{return "block"} %}
arrow -> "=>" {%(d)=>{return "arrow"}%}
function -> function_name "(" arg ")"  {% (d)=> {return [d[0],d[2]]}%}  
          | function_name 
arg -> [^`]:*  {% (d)=> {return d[0].join("")}%}  
function_name -> [a-zA-Z0-9_]:* {% (d)=> {return d[0].join("")}%}  