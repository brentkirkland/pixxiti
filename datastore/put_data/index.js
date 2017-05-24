// gcloud beta functions deploy putData --stage-bucket pixxiti-bucket --trigger-http

const Datastore = require('@google-cloud/datastore');
const projectId = 'pixxiti';
const datastore = Datastore({
  projectId: projectId
});

exports.putData = function putData (req, res) {

  var board_size = 50;

  let i = parseInt(req.query.i) - 1 || 0;
  let j = parseInt(req.query.j) - 1 || 0;
  let c = parseInt(req.query.c) - 1 || 0;
  let string_index = '1'

  // var kind = 'stringboard';
  // var name = string_index
  // var taskKey = datastore.key([kind, name]);
  // var str = '';
  // for (var k = 0; k < board_size*board_size; k++) {
  //   str += '3';
  // }
  //
  // var task = {
  //   key: taskKey,
  //   data: [
  //     {
  //       name: 'str',
  //       value: str,
  //       excludeFromIndexes: true
  //     }
  // ]
  // };
  //
  // // res.json(str)
  //
  // datastore.save(task)
  // .then(() => {
  //   res.setHeader('Access-Control-Allow-Origin', '*')
  //   res.json('ok')
  // });

  // String.prototype.replaceAt=function(index, replacement) {
  //   return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
  // }

  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  const query = datastore.createQuery('stringboard')

  datastore.runQuery(query)
  .then((results) => {

    var str = results[0][0].str;

    var index;
    if (i > 0) {
      index = i*board_size + j
    } else {
      index = i + j
    }

    switch (c) {
      case 0:
        str = setCharAt(str, index, '0')
        break;
      case 1:
        str = setCharAt(str, index, '1')
        break;
      case 2:
        str = setCharAt(str, index, '2')
        break;
      case 3:
        str = setCharAt(str, index, '3')
        break;
      case 4:
        str = setCharAt(str, index, '4')
        break;
      case 5:
        str = setCharAt(str, index, '5')
        break;
      case 6:
        str = setCharAt(str, index, '6')
        break;
      case 7:
        str = setCharAt(str, index, '7')
        break;
      case 8:
        str = setCharAt(str, index, '8')
        break;
      case 9:
        str = setCharAt(str, index, '9')
        break;
      case 10:
        str = setCharAt(str, index, 'A')
        break;
      case 11:
        str = setCharAt(str, index, 'B')
        break;
      case 12:
        str = setCharAt(str, index, 'C')
        break;
      case 13:
        str = setCharAt(str, index, 'D')
        break;
      case 14:
        str = setCharAt(str, index, 'E')
        break;
      case 15:
        str = setCharAt(str, index, 'F')
        break;
      default:
        str = setCharAt(str, index, '0')
        break;
    }

    var kind = 'stringboard';
    var name = string_index;
    var taskKey = datastore.key([kind, name]);

    var task = {
      key: taskKey,
      data: [
        {
          name: 'str',
          value: str,
          excludeFromIndexes: true
        }
      ]
    };


    datastore.save(task)
    .then(() => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.json('ok')
    });

  })

};
