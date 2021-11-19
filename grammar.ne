main -> function arrow   cells   block arrow function {%(d)=>{return [d[0],d[2],d[2],d[5]]}  %}
main -> cells


cells -> block cell block

cells -> (cell block):* 
cells -> (block cell):*#{%(d)=>{return d[0][0]}  %}


cell -> (block function arrow ):* 
cell -> (function arrow ):*# {%(d)=>{return d[0]}  %}

blank -> [\t]|[\s\s\s\s]
block -> [|] {%(d)=>{return "block"} %}
arrow -> "=>" {%(d)=>{return "arrow"}%}
function -> ([a-zA-Z0-9_]):* {% (d)=> {return d.join("").replaceAll(",","")}%} 