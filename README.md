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