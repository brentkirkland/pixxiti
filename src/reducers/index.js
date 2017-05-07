import { combineReducers } from 'redux'
import colors from './colors'
import camera from './camera'

const pixxiti = combineReducers({
  colors,
  camera
})

export default pixxiti
