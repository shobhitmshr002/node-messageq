A module for message queue with support of various popular MQ engines.

Install using
npm i node-messageq

Example:

var options = {'driver':'rabbitMQ','AMQP_URL':'amqp://guest:guest@127.0.0.1:5672'};
var mh = require('node-messageq')(options);
console.log('MH=====',mh);

setInterval(function(){
    mh.publishAsync('rewardsQueue',{key:'rewards',data:'hello rewards'},{persistent:true},function(result){
        console.log('after pub',result);
    })
}
,1000)



mh.publish('rewardsQueue',{key:'rewards',data:'hello rewards'},{persistent:true})

mh.consume('rewardsQueue', function(err, msg){
    console.log('consumed====1111',msg.content.toString());
});