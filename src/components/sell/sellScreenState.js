
const initialState = {
  fetchInitialData: true,
  buyingForValue: 'self',
  currency: '$',
  discount: 0,
  firstName: '',
  mainCartNote: '',
  salesOnHold: [],
  cities: [],
  countries: [],
  products: [],
  preferedProducts: [],
  searchValue: '',
  customers: [],
  filteredCustomers: [],
  selectedCustomer: '',
  cartItems: [],
  customerAnchorEl: null,
  discountAnchorEl: null,
  productNoteAnchorEl: null,
  openCustomerPopper: false,
  openCustomerDialog: false,
  openHoldSaleDialog: false,
  openDicountPopper: false,
  openNotePopper: false,
  openSalesOnHoldDialog: false,
  placement: null,
  id: '',
  lastName: '',
  email: '',
  primaryMobileNumber: '',
  secondaryMobileNumber: '',
  loyaltyMember: false,
  nameHelper: '',
  emailHelper: '',
  phoneHelper: '',
  mobileHelper: '',
  nameError: false,
  emailError: false,
  phoneError: false,
  mobileError: false,
  address: '',
  region: '',
  city: 'Abuja',
  cityId: 6,
  country: '',
  countryId: 0,
  emergencyContactName: '',
  emergencyContactEmail: '',
  emergencyContactNumber: '',
  formError: false,
  serverError: false,
  isLoading: false,
  isSelected: '',
  discountValue: 0,
  cartItemNoteValue: '',
};

export default initialState;