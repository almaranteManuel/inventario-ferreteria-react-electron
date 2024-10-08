import React from 'react';
import PurchaseList from '../components/purchases/PurchaseList';
import PurchaseCreate from '../components/purchases/PurchaseCreate';

function Purchases() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Gestión de compras</h1>
      <PurchaseCreate />
      <PurchaseList />
    </div>
  );
}

export default Purchases;
