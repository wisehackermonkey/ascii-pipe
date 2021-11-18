main -> (statement "\n"):+
statement -> "foo" | "bar"

#input =>|    fn1     =>|    fn8     =>|=>    out
main -> (block cell block)
main -> (block cell )
main -> (cell  block)

cell -> function
cell -> function arrow 
cell -> arrow function

blank -> [\t]|[\s]{4}
block -> [|]
arrow -> \=\>
function -> [a-zA-Z0-9_]:+