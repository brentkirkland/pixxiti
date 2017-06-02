const PubSub = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'pixxiti';

// Instantiates a client
const pubsubClient = PubSub({
  projectId: projectId
});


function publishMessage (topicName, data) {
  console.log('hey?')
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing topic, e.g. "my-topic"
  const topic = pubsub.topic(topicName);

  // Publishes the message, e.g. "Hello, world!" or { amount: 599.00, status: 'pending' }
  console.log('gay')
  return topic.publish(data)
    .then((results) => {
      console.log(results)
      const messageIds = results[0];

      console.log(`Message ${messageIds[0]} published.`);

      return messageIds;
    });
}


function pullMessages (subscriptionName) {
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing subscription, e.g. "my-subscription"
  const subscription = pubsub.subscription(subscriptionName);

  // Pulls messages. Set returnImmediately to false to block until messages are
  // received.
  return subscription.pull()
    .then((results) => {
      const messages = results[0];

      console.log(`Received ${messages.length} messages.`);

      messages.forEach((message) => {
        console.log(`* %d %j %j`, message.id, message.data, message.attributes);
      });

      // Acknowledges received messages. If you do not acknowledge, Pub/Sub will
      // redeliver the message.
      return subscription.ack(messages.map((message) => message.ackId));
    });
}

console.log('hey?')
publishMessage("pixxitiTopic", {i: 1, j: 1, c: 7})
