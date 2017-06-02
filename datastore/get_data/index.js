// gcloud beta functions deploy getData --stage-bucket pixxiti-bucket --trigger-http

const Datastore = require('@google-cloud/datastore');
const projectId = 'pixxiti';
const datastore = Datastore({
  projectId: projectId
});

exports.getData = function getData (req, res) {

  const query = datastore.createQuery('stringboard')

  datastore.runQuery(query)
  .then((results) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(results[0][0])
  });

};
