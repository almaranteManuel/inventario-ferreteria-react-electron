import React from 'react';
import SaleList from '../components/sales/SaleList';
import SaleCreate from '../components/sales/SaleCreate';

function Purchases() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Gestión de ventas</h1>
      <SaleList />
    </div>
  );
}

export default Purchases;
