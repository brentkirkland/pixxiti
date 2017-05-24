// gcloud beta functions deploy getData --stage-bucket pixxiti-bucket --trigger-http

const Datastore = require('@google-cloud/datastore');
const projectId = 'pixxiti';
const datastore = Datastore({
  projectId: projectId
});

exports.getData = function getData (req, res) {

  // let board_size = parseInt(req.query.board) || 16;

  const query = datastore.createQuery('stringboard')

  datastore.runQuery(query)
  .then((results) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    // var i = 0;
    // var arr = [];
    // var arrs = [];
    // var board_size = 50;
    //
    // function zeros(dimensions) {
    //   var array = [];
    //
    //   for (var i = 0; i < dimensions[0]; ++i) {
    //       array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    //   }
    //
    //   return array;
    // }
    //
    // arrs = zeros([board_size,board_size])
    //
    // var arrays = results[0]
    //
    // for (i = 0; i < arrays.length; i++) {
    //   if (arrays[i].i < board_size && arrays[i].j < board_size) {
    //     arrs[arrays[i].i][arrays[i].j] = arrays[i].c
    //   }
    // }
    res.send(results[0][0])
  });

};
