import { stableSort, getSorting } from '../stock_control/utils/utils';

export const getFilteredProducts = (products) => {
  const productsList = products.map((product) => {
    const {
      productName, image, productCategory, measurementUnit, skuNumber,
      description, brand, manufacturer, vatStatus, salesPrice, nearestExpiryDate,
      preferredSupplier, backupSupplier, id, productQuantity, loyaltyWeight, reorderPoint,
      reorderMax, tags
    } = product;

    return (
      {
        id,
        productName,
        image,
        category: productCategory.name,
        measurementUnit: measurementUnit.name,
        skuNumber,
        description,
        brand,
        manufacturer,
        vatStatus: vatStatus.toString(),
        salesPrice,
        nearestExpiryDate,
        preferredSupplier: preferredSupplier.name,
        backupSupplier: backupSupplier.name,
        productQuantity,
        reorderPoint,
        reorderMax,
        loyaltyWeight,
        tags,
      }
    );
  });
  return productsList;
};
export const getProducts = (data, status) => {
  if (!data) {
    return [];
  }
  let products;
  switch (status) {
  case 'approved':
    products = getFilteredProducts(data.approvedProducts);
    break;

  case 'proposed':
    products = getFilteredProducts(data.proposedProducts);
    break;
  case 'all':
    products = getFilteredProducts(data.products);
    break;
  case 'search':
    products = getFilteredProducts(data.products || []);
    break;
  case undefined:
    products = [];
    break;

  default:
    products = getFilteredProducts(data.approvedProducts);
    break;
  }
  return products;
};
export const getSortedData = (data, order, orderBy) => {
  return stableSort(data, getSorting(order, orderBy));
};
