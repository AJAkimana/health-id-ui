export const getPointerPosition = e => ({ x: e.pageX, y: e.pageY });

export const getProductInformationCardPosition = (e) => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const { x, y } = getPointerPosition(e);
  let newX = x;
  let newY = y;
  if (screenWidth - x < 500) {
    newX = x - 500;
  }
  if (screenHeight - y < 300) {
    newY = y - 200;
  }
  return { x: newX, y: newY };
};
