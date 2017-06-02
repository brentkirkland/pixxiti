const PubSub = require('@google-cloud/pubsub');
const Datastore = require('@google-cloud/datastore');
// // Your Google Cloud Platform project ID
const projectId = 'pixxiti';

// Instantiates a client
const pubsub = PubSub({
  projectId: projectId,
  retries: 5
});

const datastore = Datastore({
  projectId: projectId
});
const query = datastore.createQuery('stringboard')
var topic = pubsub.topic('pixxitiTopic');
var subscription = pubsub.subscription('pixxitiSubscription');
var board_size = 200;
var kind = 'stringboard';
var name = '1';
var taskKey = datastore.key([kind, name]);

datastore.runQuery(query)
.then((results) => {

  var str = results[0][0].str;
  var count = 0;
  var totalCount = 0;

  function doListen() {

    // Register a listener for `message` events.
    function onMessage(message) {
      console.log('am i executing?')
      // Called every time a message is received.
      var c = message.data.c
      var index;

      console.log('still going?')
      if (message.data.i > 0) {
        index = message.data.i*board_size + message.data.j
      } else {
        index = message.data.i + message.data.j
      }

      switch (c) {
        case 0:
          str = str.substr(0,index) + '0' + str.substr(index + 1);
          break;
        case 1:
          str = str.substr(0,index) + '1' + str.substr(index + 1);
          break;
        case 2:
          str = str.substr(0,index) + '2' + str.substr(index + 1);
          break;
        case 3:
          str = str.substr(0,index) + '3' + str.substr(index + 1);
          break;
        case 4:
          str = str.substr(0,index) + '4' + str.substr(index + 1);
          break;
        case 5:
          str = str.substr(0,index) + '5' + str.substr(index + 1);
          break;
        case 6:
          str = str.substr(0,index) + '6' + str.substr(index + 1);
          break;
        case 7:
          str = str.substr(0,index) + '7' + str.substr(index + 1);
          break;
        case 8:
          str = str.substr(0,index) + '8' + str.substr(index + 1);
          break;
        case 9:
          str = str.substr(0,index) + '9' + str.substr(index + 1);
          break;
        case 10:
          str = str.substr(0,index) + 'A' + str.substr(index + 1);
          break;
        case 11:
          str = str.substr(0,index) + 'B' + str.substr(index + 1);
          break;
        case 12:
          str = str.substr(0,index) + 'C' + str.substr(index + 1);
          break;
        case 13:
          str = str.substr(0,index) + 'D' + str.substr(index + 1);
          break;
        case 14:
          str = str.substr(0,index) + 'E' + str.substr(index + 1);
          break;
        case 15:
          str = str.substr(0,index) + 'F' + str.substr(index + 1);
          break;
        default:
          str = str.substr(0,index) + '0' + str.substr(index + 1);
          break;
      }

      // message.id = ID of the message.
      // message.ackId = ID used to acknowledge the message receival.
      console.log(message.data)

      if (count > 50) {

        var task = {
          key: taskKey,
          data: [
            {
              name: 'str',
              value: str,
              excludeFromIndexes: true
            }
          ]
        }

        datastore.save(task)
          .then(() => {
            console.log('successful write')
        });

        count = 0;
      } else {
        count += 1;
        totalCount += 1;
        console.log(totalCount)
      }

      // message.attributes = Attributes of the message.
      // message.timestamp = Timestamp when Pub/Sub received the message.

      // Ack the message:
      return message.ack();

      // Skip the message. This is useful with `maxInProgress` option when
      // creating your subscription. This doesn't ack the message, but allows
      // more messages to be retrieved if your limit was hit.
      // message.skip();
    }
    return subscription.on('message', onMessage);
  }

  console.log('doing listen')
  doListen()

});
