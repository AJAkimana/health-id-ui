import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import withAuth from '../../withAuth';
import GET_APPROVED_SUPPLIERS from '../../../queries/approvedSuppliersQuery';
import GET_PRODUCT_CATEGORIES from '../../../queries/productCategoryQuery';
import GET_MEASUREMENT_UNITS from '../../../queries/measurementUnitQuery';
import CREATE_PRODUCT from '../../../mutations/createProduct';
import GET_ALL_PRODUCTS from '../../../queries/allProductsQuery';
import Dashboard from '../../shared/Dashboard/Dashboard';
import BackAction from '../BackAction';
import notify from '../../shared/Toaster';
import validateProductName from '../../../utils/products/ProductNameValidation';
import verifyFile from '../../../utils/products/verifyFile';


export class AddProduct extends Component {
  state = {
    suppliers: [],
    categories: [],
    measurementUnits: [],
    isApproved: false,
    products: [],
    productName: '',
    productDescription: '',
    productImage: '',
    brand: '',
    manufacturer: '',
    preferredSupplierId: '',
    backupSupplierId: '',
    categoryId: '',
    measurementUnitId: '',
    loyaltyWeight: '',
    vatStatus: false,
    tags: [],
    loading: false,
    imageFile: '',
    fileName: '',
    src: null,
    crop: {
      aspect: 1 / 1
    },
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchData(nextProps);
  }


  fetchData = (nextProps) => {
    const {
      getSuppliers: { approvedSuppliers },
      getCategories: { productCategories },
      getMeasurementUnits: { measurementUnit },
      getAllProducts: { products }
    } = nextProps;
    this.setState({
      suppliers: approvedSuppliers,
      categories: productCategories,
      measurementUnits: measurementUnit,
      products
    });
  }

  handleProductName = (event) => {
    const { products } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const message = validateProductName(products, value);
    if (message !== '') {
      notify(message);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCategoryChange = (event) => {
    const { value } = event.target;
    this.setState({ categoryId: value });
    this.filterCategories(value);
  };

  filterCategories = (value) => {
    const { categories } = this.state;
    const result = categories.filter(category => category.id === value);

    this.setState({
      loyaltyWeight: result[0].loyaltyWeight,
      vatStatus: result[0].isVatApplicable
    });
  }

  handleDelete =(i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleProposeProduct = () => {
    const { addProduct } = this.props;

    const {
      productName, productDescription, productImage, brand, manufacturer,
      preferredSupplierId, backupSupplierId, categoryId, measurementUnitId,
      loyaltyWeight, vatStatus,
    } = this.state;

    this.setState({ loading: true });

    const tagsArray = [];

    addProduct({
      variables: {
        productCategoryId: categoryId,
        productName,
        measurementUnitId,
        description: productDescription,
        brand,
        manufacturer,
        vatStatus,
        preferredSupplierId,
        backupSupplierId,
        loyaltyWeight,
        tags: tagsArray,
        image: productImage
      }
    })
      .then((res) => {
        const { history } = this.props;
        const { productName: createdProduct } = res.data.createProduct.product;
        notify(`${createdProduct} has been added and sent for approval`);
        history.push('/products');
      })
      .catch((err) => {
        const { message } = err.graphQLErrors[0];
        notify(message);
      });
  }

  handleSendForApproval = () => {
    this.handleProposeProduct();
  }

  handleAddAnotherProduct = async () => {
    await this.handleProposeProduct();
    setTimeout(() => {
      this.setState({
        productName: '',
        productDescription: '',
        productImage: '',
        brand: '',
        manufacturer: '',
        preferredSupplierId: '',
        backupSupplierId: '',
        categoryId: '',
        measurementUnitId: '',
        loyaltyWeight: '',
        vatStatus: '',
        tags: [],
        loading: false,
        imageFile: '',
      });
    }, 1500);
  }

  onSelectFile = (e) => {
    const { files } = e.target;
    const imageFile = e.target.files[0];
    const maxFileSize = 1000000; // bytes
    const acceptedFileType = 'image/jpg, image/jpeg, image/JPEG, image/png, image/PNG';
    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        this.setState({
          fileName: files[0].name,
          imageFile
        });

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.setState({
            src: reader.result,
            open: true
          });
        }, false);
        reader.readAsDataURL(imageFile);
      }
    }
  }

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    const promise = new Promise((resolve) => {
      image.onload = (() => {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve();
      });
      image.src = imageFile;
    }).then(() => new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    }));
    return promise;
  }

  handleImageDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', process.env.API_KEY);
    formData.append('timestamp', (Date.now() / 1000) || 0);

    return axios.post(process.env.CLOUDINARY_URL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }).then((response) => {
      const { data } = response;
      const fileURL = data.secure_url;
      this.setState({
        productImage: fileURL
      });
    }).catch((err) => {
      notify(err);
    });
  }

  handleSave = () => {
    const {
      src,
      fileName,
      crop
    } = this.state;

    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({
        src: '',
        open: false
      });
    });
  }

  handleClose = () => {
    const { imageFile } = this.state;
    this.setState({
      src: '',
      open: false
    });
    this.handleImageDrop(imageFile);
  }


  handleOnCropChange = (crop) => {
    this.setState({ crop });
  }

  render() {
    const { session } = this.props;

    return (
      <div>
        <Dashboard isActive="grid3" session={session} />
        <BackAction
          header="Add Product (Proposed)"
          link="/products"
        />
        <ProductForm
          state={this.state}
          handleProductName={this.handleProductName}
          handleChange={this.handleChange}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          onSelectFile={this.onSelectFile}
          handleOnCropChange={this.handleOnCropChange}
          handleCategoryChange={this.handleCategoryChange}
          handleClose={this.handleClose}
          handleSave={this.handleSave}
          handleSendForApproval={this.handleSendForApproval}
          handleAddAnotherProduct={this.handleAddAnotherProduct}
        />
      </div>
    );
  }
}

AddProduct.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.any),
  addProduct: PropTypes.func.isRequired
};

AddProduct.defaultProps = {
  session: {},
  history: {},
};

const ALL_PRODUCTS = graphql(GET_ALL_PRODUCTS, { name: 'getAllProducts' });
const APPROVED_SUPPLIERS = graphql(GET_APPROVED_SUPPLIERS, { name: 'getSuppliers' });
const PRODUCT_CATEGORIES = graphql(GET_PRODUCT_CATEGORIES, { name: 'getCategories' });
const MEASUREMENT_UNITS = graphql(GET_MEASUREMENT_UNITS, { name: 'getMeasurementUnits' });
const ADD_PRODUCT = graphql(CREATE_PRODUCT, { name: 'addProduct' });

export default withAuth((compose(
  ALL_PRODUCTS,
  APPROVED_SUPPLIERS,
  PRODUCT_CATEGORIES,
  MEASUREMENT_UNITS,
  ADD_PRODUCT
)(withRouter(AddProduct))));
