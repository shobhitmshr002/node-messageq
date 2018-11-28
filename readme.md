# node-messageq

node-messageq is module to provide support for producer/consumer messaging system for different message engines.
Currently module provides support for following four functions, more will be updated soon.
  - publish
  - publishAsync
  - publishWithKey
  - consume

**Can be installed using**
```sh
$ npm install node-messageq
```
**Configure**
```sh
var options = {'driver':'rabbitMQ','AMQP_URL':'amqp://guest:guest@127.0.0.1:5672'};
var mh = require('node-messageq')(options);
````
**publish**
```sh
mh.publish('rewardsQueue',{key:'rewards',data:'hello rewards'},{persistent:true})
```
**publishAsync**
```sh
mh.publishAsync('rewardsQueue',{key:'rewards',data:'hellorewards'},{persistent:true},
function(result){
        console.log('after pub',result);
})
```
**publishWithKey**
```sh
mh.publishWithKey('rewardsQueue','mykey',{key:'rewards',data:'hello rewards'},{persistent:true},function(result){
        console.log('after pub',result);
});
```
**consume**
```sh
mh.consume('rewardsQueue', function(err, msg){
    console.log('consumed====1111',msg.content.toString());
});
```
**create channel**
```sh
 mh.createChannel(function(err,channel){
         console.log(err,channel);

  })
```