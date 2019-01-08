import React, { Component } from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import { Provider }  from 'react-redux';
import store from './store';


import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import Products from './components/products/Products';

import About from './components/pages/About';
import NoFound from './components/pages/NoFound';


import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

class App extends Component {
  render() {
    return (
       <Provider store={ store }>
        <Router>
          <div className="App">
          <Header branding="FLaskApi-Product" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/product/add" component={AddProduct} />
              <Route exact path="/product/edit/:id" component={EditProduct} />
              <Route exact path="/about" component={About} />
              <Route component={NoFound} />
            </Switch>
          </div>
          <Footer/>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
