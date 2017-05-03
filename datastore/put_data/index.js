// gcloud beta functions deploy putData --stage-bucket pixxiti-bucket --trigger-http

const Datastore = require('@google-cloud/datastore');
const projectId = 'pixxiti';
const datastore = Datastore({
  projectId: projectId
});

exports.putData = function putData (req, res) {

  let i = parseInt(req.query.i) - 1 || 0;
  let j = parseInt(req.query.j) - 1 || 0;
  let c = parseInt(req.query.c) - 1 || 0;
  let string_index = i+'_'+j

  var kind = 'board'
  var name = string_index
  var taskKey = datastore.key([kind, name]);

  var task = {
    key: taskKey,
    data: {
      i: i,
      j: j,
      c: c
    }
  };

  datastore.save(task)
  .then(() => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json('ok')
  });

};
