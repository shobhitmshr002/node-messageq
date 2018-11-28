var amqp = require('amqplib/callback_api');
// module.exports.publishAsync = publishAsync;
// module.exports.publish = publish;
var winston = require('winston');
//var logger = new winston.Logger();
module.exports = rabbitMQ;
var connection, channel;

function rabbitMQ (config) {
    var url = config.AMQP_URL || 'amqp://guest:guest@127.0.0.1:5672';


    return {
          createChannel : function (cb) {
            createChannel(function (err, channel) {
              if (err) {
                console.log("err in create channel",err,channel);
                cb(err);
              } else {
                cb(null,channel);
              }
            });
          },  
          publishAsync : function (queue, data, opts, cb) {
            let options = opts;
            options['persistent'] = opts.persistent ? opts.persistent : false;
            createProducer(queue, function (err, channel) {
              if (err) {
                cb(err);
              } else {
                asyncSendToQueue(queue, encode(data), options).then(function(result){
                  cb(result);  
                }).catch(function(err){
                  cb(err)
                })
              }
            });
          },
          
          publish : function (queue, data, opts) {
            let options = opts;
            options['persistent'] = opts.persistent ? opts.persistent : false;
            createProducer(queue, function (err, channel) {
              if (err) {
                //logger.info("error in create producer",err.message);
              } else {
                channel.sendToQueue(queue, encode(data), options);
              }
            });
          },
          publishWithKey:function (queue, key, data, opts, cb) {
            let options = opts;
            options['persistent'] = opts.persistent ? opts.persistent : false;
              asyncPublishWithKey(queue, key, encode(data), options).then(function(result){
                cb(null,result);  
              }).catch(function(err){
                cb(err)
              });
          },
          consume : function (queue, cb) {
            assertQueue(queue, function (err, channel) {
              if (err) {
                console.error(err.stack);
                cb(err);
              } else {
                consumeData();
              }
              function consumeData () {
                channel.get(queue, {}, onConsume);
                function onConsume (err, msg) {
                  if (err) {
                    console.warn(err.message);
                    cb(err);
                  } else if (msg) {
                    
                    cb(null, msg.content.toString());
                    channel.ack(msg);
                    consumeData();
                  } else {
                    //console.log('no message, waiting...');
                    consumeData();
                  }
                }
              }
            });
          }
    }

function connect (cb) {
    if (connection) {
      return cb(null, connection);
    }
    amqp.connect(url, onceConnected);
    function onceConnected (err, conn) {
      if (err) {
        cb(err, null);
      } else {
        connection = conn;
        cb(null, connection);
      }
    }
  }
  
  function createChannel (cb) {
    connect(onceConnected);
    function onceConnected (err, conn) {
      if (err) {
        cb(err);
      } else {
        if (channel) {
          return cb(null, channel);
        }
        conn.createChannel(onceChannelCreated);
      }
      function onceChannelCreated (err, ch) {
        if (err) {
          cb(err);
        } else {
          channel = ch;
          cb(null, channel);
        }
      }
    }
  }
  
  function assertQueue (queue, cb) {
    createChannel(function (err, channel) {
      if (err) {
        cb(err);
      } else {
        channel.assertQueue(queue, { durable: true }, onceQueueCreated);
      }
    });
    function onceQueueCreated (err) {
      if (err) {
        cb(err);
      } else {
        cb(null, channel);
      }
    }
  }
  
  function createProducer (queueName, next) {
    var queue = queueName;
    assertQueue(queue, function (err, channel) {
      if (err) {
        next(err);
      } else {
        next(null, channel);
        // setImmediate(function () {
        //   channel.close();
        //   conn.close();
        // });
      }
    });
  }
  
  function encode (doc) {
    return Buffer.from(JSON.stringify(doc));
  }
  
  async function asyncSendToQueue(queue, data, options) {
    var result = await channel.sendToQueue(queue, data, options);
    return result;
  }

  async function asyncPublishWithKey(queue, key, data, options) {
    var result = await channel.publish(queue, key, data, options);
    return result;
  }
}



