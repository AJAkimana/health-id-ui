export default (text = '') => {
  const result = text.toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};
