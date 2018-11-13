var mh = require('node-messageq')({'driver':'rabbitMQ','AMQP_URL':'amqp://user:bitnami@127.0.0.1:5672'});
console.log('MH=====',mh);

setInterval(function(){
    mh.consume('rewardsQueue',function(err,result){
        console.log('after consume',err,result);
    })
}
,1000)