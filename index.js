var mqHandler ;//= require('./handlers/rabitMQhandler');
// module.exports.publishAsync = publishAsync;
// module.exports.publish = publish;
// module.exports.consume = consume;
module.exports = MQ;


function MQ (config) {
    console.log('config is===mH==',config);
    if(config.driver) {
        switch(config.driver){
            case 'rabbitMQ':
            {
                mqHandler = require('./handlers/rabitMQhandler')(config);
            }
            break;
        }
    }
    return {
        publishAsync:function (queue, data, opts, cb) {
            mqHandler.publishAsync(queue, data, opts, function(err){
              cb(err);
            });
          },
          
          publish:function (queue, data, opts, cb) {
            mqHandler.publish(queue, data, opts);
          },
          
          consume:function (queue,cb) {
            mqHandler.consume(queue,cb);
          }
    }
    
}


