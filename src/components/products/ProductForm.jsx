// src/components/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, quantity, price };

    // Aquí podrías agregar el producto a la lista de productos o enviarlo a una API
    console.log('Producto agregado:', newProduct);

    // Limpiar formulario
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre del producto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cantidad</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProductForm;
