import React, { Component } from 'react';
import Product from './Product';
import { connect }  from 'react-redux';
import PropTypes  from 'prop-types';
import { getProducts }  from '../../actions/productAction';

class Products extends Component {

  componentDidMount(){
      this.props.getProducts();
  };

  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Product</span> List
        </h1>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  products : PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    products : state.product.products
});


export default connect(
  mapStateToProps ,
  {getProducts}
  )(Products);
