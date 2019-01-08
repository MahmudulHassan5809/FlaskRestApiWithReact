import React, { Component } from 'react';
import TextInputGroup from '../../common/TextInputGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { getProduct,updateProduct }  from '../../actions/productAction';

class EditProduct extends Component {
  state = {
    name: '',
    description: '',
    price: '',
    qty : '',
    errors: {}
  };
  componentWillReceiveProps(nextProps , nextState){
      const { name, description, price,qty } = nextProps.product;
      this.setState({
          name,
          description,
          price,
          qty
      });
  };
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, description, price,qty } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (description === '') {
      this.setState({ errors: { description: 'Description is required' } });
      return;
    }

    if (price === '') {
      this.setState({ errors: { price: 'Price is required' } });
      return;
    }
    if (qty === '') {
      this.setState({ errors: { qty: 'Quantity  is required' } });
      return;
    }



    const { id } = this.props.match.params;

    const updProduct = {
      name,
      description,
      price,
      qty
    };

    this.props.updateProduct(updProduct,id);

    // Clear State
    this.setState({
      name: '',
      description: '',
      price: '',
      qty: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, description, price,qty,errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Update</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextAreaFieldGroup
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={this.onChange}
              error={errors.description}
            />
            <TextInputGroup
              label="Price"
              name="price"
              placeholder="Enter Price"
              value={price}
              onChange={this.onChange}
              error={errors.price}
            />
            <TextInputGroup
              label="Quantity"
              name="qty"
              placeholder="Enter Quantity"
              value={qty}
              onChange={this.onChange}
              error={errors.qty}
            />
            <input
              type="submit"
              value="Update Product"
              className="btn btn-dark btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditProduct.propTypes = {
  product : PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    product : state.product.product
});

export default connect(mapStateToProps,{ getProduct ,updateProduct })(EditProduct);
