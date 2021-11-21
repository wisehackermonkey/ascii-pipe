# ascii-pipe
----
[![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<!-- <img src="NNNNNNNNNNNNN" width="400"> -->


<h2 align="center">a ascii art conconcurent pipe framework for javascript</h2>

<!-- <h4 align="center">________________________</h4> -->



# Example
```javascript
        |  fn5       =>|
Input =>|  fn1=>| fn8=>|=> out
        |  fn7=>|        
```

Expanding and constricting pipe
```javascript 
        |fn5     =>|f2=>|
Input =>|fn1=>fn8=>|f3=>|=>out
        
```
# parallel example
```javascript 
        |  fn5       =>|
Input =>|  fn1=>| fn8=>| 
        |  fn7=>|    =>| => out
        |  fn5       =>|
Input2=>|  fn1=>| fn8=>|
        |  fn7=>|
```


# Quick start
### 
##### 
```bash
yarn
yarn start
``` 
## Open Broswer to [`http://localhost:3000`](http://localhost:3000)

---



# the grammer
```bash
nearleyc grammar.ne -o grammar.js
```
```
main -> function arrow cells block arrow function 
main -> cells


cells -> block cell block

cells -> (cell block):*
cells -> (block cell):*
#cells -> cell block 
#cells -> cell

cell -> (function arrow block):*
cell -> (block function arrow ):*
cell -> (function arrow ):*

blank -> [\t]|[\s\s\s\s]
block -> [|]
arrow -> "=>"
function -> ([a-zA-Z0-9_]):*
```
### optimize for more strict
```python

main -> function arrow cells block arrow function 
main -> cells


#cells -> block cell block

cells -> (cell block):*
cells -> (block cell):*
#cells -> cell block 
#cells -> cell

#cell -> (function arrow block):*
cell -> (block function arrow ):*
cell -> (function arrow ):*

blank -> [\t]|[\s\s\s\s]
block -> [|]
arrow -> "=>"
function -> ([a-zA-Z0-9_]):*
```
```
@builtin "whitespace.ne"


main -> function arrow cells block arrow function  
main -> cells


#cells -> block cell block

cells -> (cell block):*
cells -> (block cell):*
#cells -> cell block 
#cells -> cell

#cell -> (function arrow block):*
cell -> (block function arrow ):*
cell -> (function arrow ):*

_  -> wschar:* {% function(d) {return null;} %}
__ -> wschar:+ {% function(d) {return null;} %}

wschar -> [ \t\n\v\f] {% id %}

block -> [|]
arrow -> "=>"
function -> ([a-zA-Z0-9_]):*
function -> _ ([a-zA-Z0-9_]) 
```
#added grammer suppoert for args to functions
```

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
```

experiment with newline blocks
```
main -> lines

lines -> line newline line 
lines -> (line newline):+
lines -> line
lines -> newline

line -> [^\n]:+
newline -> "\n"
```
### how to dev grammer
```bash
##yarn run dev-grammer
nodemon -w grammar.ne -w grammerTest.js  --exec './node_modules/.bin/nearleyc grammar.ne -o grammar.js& node grammerTest.js'

nodemon -w grammar.ne -w exampleMultiPipe2.js  --exec './node_modules/.bin/nearleyc grammar.ne -o grammar.js& node exampleMultiPipe2.js'

```
# Summary
### -  *[Quick start](#Quick-start)*
### -  *[Installation](#Installation)*
### -  *[Deveopment](#For-developers)*
### -  *[Contributors](#Contributors)*
### -  *[Links](#Links)*
### -  *[License](#License)*













 
# Installation
### 
```bash
cd ~
git clone https://github.com/wisehackermonkey/ascii-pipe.git
cd ascii-pipe
yarn
yarn start
```


# List of command
## Build for production
```bash
yarn build
```










 -----------------
# Screenshots
- <!-- <img src="NNNNNNNNNNNNN" width="400"> -->














-----------------
# Deveopment
### 
```bash
yarn run dev
```












 
---
# Links
### [Tokenizers - nearley.js - JS Parsing Toolkit](https://nearley.js.org/docs/tokenizers)
### [Moo (no-context/moo): Optimised tokenizer/lexer generator! 🐄 Uses /y for performance. ](https://github.com/no-context/moo)
### [AST explorer](https://astexplorer.net/)
### [Nearley Parser Playground | Parse Grammars Online, From The Comfort Of Your Home!](https://omrelli.ug/nearley-playground/)
---
### UNUSED but cool [acornjs/acorn: A small, fast, JavaScript-based JavaScript parser](https://github.com/acornjs/acorn)
### also cool and unused [acorn/acorn-loose at master · acornjs/acorn](https://github.com/acornjs/acorn/tree/master/acorn-loose)
### https://www.digitalocean.com/community/tutorials/js-traversing-ast












 -----------------
# Contributors

[![](https://contrib.rocks/image?repo=wisehackermonkey/ascii-pipe)](https://github.com/wisehackermonkey/ascii-pipe/graphs/contributors)

##### Made with [contributors-img](https://contrib.rocks).

-----------------
# License
#### MIT © wisehackermonkey
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```bash
by oran collins
github.com/wisehackermonkey
oranbusiness@gmail.com
11/17/2021
```
<!-- 

# Docker
### Build
```bash
cd ~
git clone https://github.com/wisehackermonkey/ascii-pipe.git
cd ascii-pipe
docker build -t wisehackermonkey/ascii-pipe:latest .  
```
### Run
```bash
docker run -it --rm --name wisehackermonkey/ascii-pipe:latest  
```
### Docker-compose
```bash
docker-compose build
docker-compose up 
```
# Publish Docker Image
```bash
docker build -t wisehackermonkey/ascii-pipe:latest .
docker login
docker push wisehackermonkey/ascii-pipe:latest
```
# Deploy on netlify
```
npm install netlify-cli -g
netlify login
netlify deploy
netlify deploy --prod
```
-->