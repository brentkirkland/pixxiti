import { combineReducers } from 'redux'
import colors from './colors'
import camera from './camera'
import draw from './draw'
import powers from './powers'


const pixxiti = combineReducers({
  colors,
  camera,
  draw,
  powers
})

export default pixxiti
