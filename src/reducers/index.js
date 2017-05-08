import { combineReducers } from 'redux'
import colors from './colors'
import camera from './camera'
import draw from './draw'

const pixxiti = combineReducers({
  colors,
  camera,
  draw
})

export default pixxiti
