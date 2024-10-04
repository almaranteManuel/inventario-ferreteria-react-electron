// src/components/ProductList.jsx
import React, { useState } from 'react';

const ProductList = () => {
  // Simular algunos productos
  const [products, setProducts] = useState([
    { id: 1, name: 'Martillo', quantity: 10, price: 500 },
    { id: 2, name: 'Clavos', quantity: 50, price: 150 },
  ]);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Cantidad: {product.quantity} - Precio: ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
