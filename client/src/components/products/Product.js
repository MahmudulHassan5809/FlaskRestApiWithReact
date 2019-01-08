import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { deleteProduct }  from '../../actions/productAction';

class Product extends Component {
  state = {
    showProductInfo: false
  };

  onDeleteClick = id => {
    this.props.deleteProduct(id);
  };

  render() {
    const { id, name, description, price,qty } = this.props.product;
    const { showProductInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{' '}
          <i
            onClick={() =>
              this.setState({
                showProductInfo: !this.state.showProductInfo
              })
            }
            className="fas fa-sort-down"
            style={{ cursor: 'pointer' }}
          />
          <i
            className="fas fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, id)}
          />
          <Link to={`product/edit/${id}`}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'black',
                marginRight: '1rem'
              }}
            />
          </Link>
        </h4>
        {showProductInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Price: {price}</li>
            <li className="list-group-item">Quantity: {qty}</li>
            <li className="list-group-item">Description: {description}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(null , { deleteProduct })(Product);
