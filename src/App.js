import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="*" element={<ProductList />}></Route>
          <Route path="list" element={<ProductList />}></Route>
          <Route path="details/:id" element={<ProductDetails />}></Route>
        </Routes>
      </div>
  );
}

export default App;
