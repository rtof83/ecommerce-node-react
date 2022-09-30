import React, { useState } from 'react';
import Home from './pages/home';
import Customer from './pages/customer';
import Product from './pages/product';
import ListCust from './lists/listCust';
import ListProd from './lists/listProd';
import ListOrder from './lists/listOrder';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Cart from './pages/cart';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchContext, ListContext, UserContext} from './contexts/Contexts';

const App = () => {
  const [ user, setUser ] = useState([]);
  const [ list, setList ] = useState([]);
  const [ search, setSearch ] = useState([]);

  return (
    <UserContext.Provider value={[ user, setUser ]}>
    <ListContext.Provider value={[ list, setList ]}>
    <SearchContext.Provider value={[ search, setSearch ]}>

      <Router>
        <Header />
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/customer' element={<Customer />} />
            <Route path='/customer/:id' element={<Customer />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:sku' element={<Product />} />
            <Route path='/listCust' element={<ListCust />} />
            <Route path='/listProd' element={<ListProd />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/:cart' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/listOrder' element={<ListOrder />} />
          </Routes>
        <Footer />
      </Router>

    </SearchContext.Provider>
    </ListContext.Provider>
    </UserContext.Provider>
  )
};

export default App;
