const validateProductName = (products, value) => {
  let message = '';
  const result = products.filter(product => product.productName.toLowerCase()
  === value.toLowerCase());
  if (result.length > 0) {
    if (result[0].isApproved === true) {
      message = `${result[0].productName} already exists and has been approved`;
      return message;
    }
    message = `${result[0].productName} already exists and is pending approval`;
    return message;
  }
  return message;
};

export default validateProductName;
