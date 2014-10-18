var koa = require('koa'),
    app = koa(),
    Q = require("q"),
    redis = require("redis"),
    brain = require("brain"),
    cors = require('koa-cors'),
    client = redis.createClient(),  
    router = require('koa-router'),
    net = new brain.NeuralNetwork(),
    bodyParser = require("koa-body-parser");

app.use(cors());
app.use(bodyParser());
app.use(router(app));

client.on("error", function (err) {
  console.log("Error " + err);
});

app.get('/', function *(next) {
  var start = new Date().getTime();
  var data_set = Q.ninvoke(client, 'lrange', 'test', 0, -1).then(function (data) {
    if(data.length===0) return false;
    data = data.map(function (a) { return JSON.parse(a); })    
    net.train(data);  
    return {
        prediction: net.run({ r: 1, g: 0.4, b: 0 }),
        time: new Date().getTime() - start   
     };      
  });
  this.body = yield data_set;
});

app.post('/insert', function *(next) {
  var body = this.request.body;
  console.log(body);
  if(body.r!==undefined && body.g!==undefined && body.b!==undefined && body.output!==undefined){
    var stringify_me = {
      input: { 
        r: Number(body.r), 
        g: Number(body.g), 
        b: Number(body.b) 
      },
      output:{}    
    };
    if(body.output==='0'){
      stringify_me.output.white=1;
    }else{
      stringify_me.output.black=1;
    };
    client.rpush("test", JSON.stringify(stringify_me), redis.print);    
  };
      
  this.status = 200;
});

if (!module.parent) {
  app.listen(3000);
  console.log('koa fired up on port 3000');
}