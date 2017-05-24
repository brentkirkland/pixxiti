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

// DRAW actions

export const changeDrawable = () => ({
  type: 'CHANGE_DRAWABLE'
})

export const givePoint = (points = 1) => ({
  type: 'GIVE_POINT',
  points: points
})

export const selectSimpleBomb = () => ({
  type: 'SELECT_SIMPLE_BOMB'
})

export const selectMegaBomb = () => ({
  type: 'SELECT_MEGA_BOMB'
})

export const pickColor = (c) => ({
  type: 'PICK_COLOR',
  color: c
})

//bot

export const activateBot = () => ({
  type: 'ACTIVATE_BOT'
})

export const deactivateBot = () => ({
  type: 'DEACTIVATE_BOT',
})

export const updateBotI = (x) => ({
  type: 'UPDATE_BOT_I',
  payload: x
})

export const updateBotJ = (x) => ({
  type: 'UPDATE_BOT_J',
  payload: x
})

export const updateBotArrayText = (x) => ({
  type: 'UPDATE_BOT_ARRAY_TEXT',
  payload: x
})

export const botError = (x) => ({
  type: 'BOT_ERROR',
  payload: x
})

export const startBot = (x) => ({
  type: 'START_BOT',
  payload: x
})

export const updatePlaceIJ = (i,j, bot) => ({
  type: 'UPDATE_PLACE',
  i: i,
  j: j,
  bot: bot
})

// CAMERA actions

export const mouseDown = (moveable, startX, startY) => ({
  type: 'MOUSE_DOWN',
  moveable: moveable,
  startX: startX,
  startY: startY
})

export const mouseMove = (transX, transY) => ({
  type: 'MOUSE_MOVE',
  transX: transX,
  transY: transY
})

export const mouseUpOne = (zoom, moveable, prevX, prevY, transX, transY) => ({
  type: 'MOUSE_UP_ONE',
  zoom: zoom,
  moveable: moveable,
  prevX: prevX,
  prevY: prevY,
  transX: transX,
  transY: transY
})

export const mouseUpTwo = (zoom, moveable, prevX, prevY) => ({
  type: 'MOUSE_UP_TWO',
  zoom: zoom,
  moveable: moveable,
  prevX: prevX,
  prevY: prevY,
})

export const mouseUpThree = (moveable, prevX, prevY) => ({
  type: 'MOUSE_UP_THREE',
  moveable: moveable,
  prevX: prevX,
  prevY: prevY
})

export const handleResize = (width, height) => ({
  type: 'HANDLE_RESIZE',
  width: width,
  height: height
})
