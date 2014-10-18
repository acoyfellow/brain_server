brain_server
==================

A lightweight HTTP Koa server that uses brain.js and Redis as a datastore.

1. Install Node.js (at least 11.13)
2. Install Redis
3. `git pull https://github.com/acoyfellow/brain_server.git`
4. `npm install` dependencies, `node --harmony server.js` to start
4. Add training data
5. `HTTP GET` the root url for to classify `{ r: 1, g: 0.4, b: 0 }`

This is a simple starter point for writing an API that uses brain.js (which uses a neural network + backpropogation algo for training) to do some simple classification.

Here is some training data you can use (from brain.js docs):

```
{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }}
```
```
{input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }}
```
```
{input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}
```


To insert data into Redis:
---------------------
- `HTTP POST` to the endpoint `http://{your_server}/insert` in x-www-form-urlencoded format with 4 inputs
- `r`, `g`, `b`, and `output`. 
- `r`, `g`, and `b` are numbers 
- `output` is boolean 0 or 1, where 0 is White and 1 is Black.