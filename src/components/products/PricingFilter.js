import { stableSort, getSorting } from '../stock_control/utils/utils';

export const getFilteredProductsPricing = (products) => {
  const productsList = products.map((product) => {
    const {
      productName, productCategory, batchInfo, skuNumber,
      description, vatStatus, salesPrice, id,
      loyaltyWeight, tags, markup
    } = product;

    const latestDate = batchInfo.map(batch => batch.dateReceived).sort().slice(-1);
    const latestBatch = batchInfo.filter(batch => batch.dateReceived === latestDate[0]);
    const batchUnitCost = batchInfo.map(batch => batch.unitCost);

    return (
      {
        id,
        productName,
        category: productCategory.name,
        skuNumber,
        description,
        batchInfo: latestBatch.length > 0 ? latestBatch[0].unitCost : 0,
        GrossMargin: Math.round((1 - (batchUnitCost[0] / salesPrice)) * 100) || 0,
        markup,
        vatStatus: vatStatus.toString(),
        salesPrice,
        loyaltyWeight,
        tags,
      }
    );
  });
  return productsList;
};
export const getProductsPricing = (data, status) => {
  if (!data) {
    return [];
  }
  let products;
  switch (status) {
  case 'all':
    products = getFilteredProductsPricing(data.products);
    break;
  case 'search':
    products = getFilteredProductsPricing(data.products || []);
    break;
  case undefined:
    products = [];
    break;

  default:
    products = getFilteredProductsPricing(data.approvedProducts);
    break;
  }
  return products;
};
export const getSortedData = (data, order, orderBy) => stableSort(data, getSorting(order, orderBy));
