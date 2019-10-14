import { stableSort, getSorting } from '../stock_control/utils/utils';

export const getFiltedSuppliers = (data) => {
  let suppliersR;
  if (data.filterSuppliers) {
    suppliersR = data;
  } else {
    suppliersR = { filterSuppliers: { edges: [] } };
  }
  const suppliers = suppliersR.filterSuppliers.edges.map((supplier) => {
    if (supplier) {
      return {
        id: supplier.node.id,
        name: supplier.node.name,
        tier: supplier.node.tier.name,
        rating: supplier.node.rating,
        notes: supplier.node.suppliernoteSet,
        isApproved: supplier.node.isApproved,
        commentary: supplier.node.commentary,
        user: supplier.node.user,
      };
    }
    return false;
  });
  return suppliers;
};
export const getPaginatedSuppliers = (data) => {
  let suppliersR;
  if (data.allSuppliers) {
    suppliersR = data;
  } else {
    suppliersR = { allSuppliers: [] };
  }
  const suppliers = suppliersR.allSuppliers.map((supplier) => {
    if (supplier) {
      return {
        id: supplier.id,
        name: supplier.name,
        tier: supplier.tier.name,
        rating: supplier.rating,
        notes: supplier.suppliernoteSet,
        isApproved: supplier.isApproved,
        commentary: supplier.commentary,
        user: supplier.user,
      };
    }
    return false;
  });
  return suppliers;
};
export const getSuppliers = (data, isFiltering) => {
  let res;
  if (!data) {
    return [];
  }
  switch (isFiltering) {
  case true: {
    res = getFiltedSuppliers(data);
    break;
  }
  case false: {
    res = getPaginatedSuppliers(data);
    break;
  }
  default: {
    res = [];
    break;
  }
  }
  return res;
};
export const getSlicedData = (data, isFiltering, page, rowsPerPage, order, orderBy) => {
  if (isFiltering) {
    return stableSort(data, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  return stableSort(data, getSorting(order, orderBy));
};
