// gcloud beta functions deploy putData --stage-bucket pixxiti-bucket --trigger-http

const Datastore = require('@google-cloud/datastore');
const PubSub = require('@google-cloud/pubsub');
const projectId = 'pixxiti';

const datastore = Datastore({
  projectId: projectId
});

const pubsub = PubSub({
  projectId: projectId,
  retries: 5
});

// const datastore = Datastore;
// const pubsub = PubSub;

exports.putData = function putData (req, res) {

  let i = parseInt(req.query.i) - 1 || 0;
  let j = parseInt(req.query.j) - 1 || 0;
  let c = parseInt(req.query.c) - 1 || 0;

  if (i > 199 || i < 0 || j > 199 || c < 0 || c > 15) {
    i = 0;
    j = 0;
    c = 0;
  }

  let data = {
    i: i,
    j: j,
    c: c
  }

  function publishMessage (topicName, data) {

    // References an existing topic, e.g. "my-topic"
    const topic = pubsub.topic(topicName);

    return topic.publish(data)
      .then((results) => {
        const messageIds = results[0];
        console.log(`Message ${messageIds[0]} published.`);
        return messageIds;
      });
  }

  publishMessage('pixxitiTopic', data)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('ok')

};
