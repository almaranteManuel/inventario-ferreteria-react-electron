import React, { useState } from 'react';
import { Input, Typography } from 'antd';

const ProductSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Si el input está vacío, mostrar todos los productos
    if (value === '') {
      const allProducts = await window.api.loadProducts(); // Llamada a la API para obtener todos los productos
      onSearchResults(allProducts);
    } else {
      try {
        const results = await window.api.searchProducts(value); // Llamada a la API para buscar productos
        onSearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
  };

  return (
    <>
        <Typography.Title level={5} style={{padding: 10}}>Buscar:</Typography.Title>
        <Input
            placeholder="Buscar producto por codigo"
            value={searchTerm}
            onChange={handleSearch}
        />
    </>
  );
};

export default ProductSearch;
