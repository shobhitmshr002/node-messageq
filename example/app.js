var mh = require('node-messageq')({'driver':'rabbitMQ','AMQP_URL':'amqp://user:bitnami@127.0.0.1:5672'});
console.log('MH=====',mh);

setInterval(function(){
    mh.publishAsync('rewardsQueue',{key:'rewards',data:'hello rewards'},{persistent:true},function(result){
        console.log('after pub',result);
    })
}
,1000)