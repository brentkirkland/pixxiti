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

export const pickColor = (c) => ({
  type: 'PICK_COLOR',
  color: c
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
