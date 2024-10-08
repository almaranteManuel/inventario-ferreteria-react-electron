import ProductList from '../components/products/ProductList';
import ProductCreate from '../components/products/ProductCreate';


const Products = () => {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Gestión de productos</h1>
      <ProductList />
    </div>
  );
}

export default Products;
