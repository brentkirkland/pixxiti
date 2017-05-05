export const changeColor = (val, i, j) => ({
  type: 'CHANGE_COLOR',
  c: val,
  i: i,
  j: j,
})

export const getInitialBoard = (json) => ({
  type: 'GET_BOARD',
  payload: json
})


// export const getInitialBoard = () => {
//   console.log('test!')
//   var data = {
//     method: 'GET',
//   }
//   var j;
//
//   function yo (payload) {
//     console.log(payload)
//     return {
//       type: 'GET_BOARD',
//       payload: payload
//     }
//   }
//
//   return fetch('https://us-central1-pixxiti.cloudfunctions.net/getData', data)
//   .then(res => res.json())
//   .then(json => yo(json))
// }
