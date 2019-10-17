import countrySet from 'country-list';

const getOutletCountryCode = (outlet) => {
  const { name: countryName = '' } = outlet.city.country;
  const hasSymbol = countryName.search('_');
  let outletCountry;
  if (hasSymbol < 0) {
    outletCountry = countryName;
  } else {
    const [countryText] = countryName.split('_');
    outletCountry = countryText;
  }

  const countryCode = countrySet.getCode(outletCountry);
  return [countryCode, outletCountry];
};
export default getOutletCountryCode;
