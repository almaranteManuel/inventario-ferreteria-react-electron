import ProductList from '../components/products/ProductList';

const Products = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [newVariant, setNewVariant] = useState(1.7);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const handleUpdateVariant = async () => {
  //   try {
  //     // Llamar a la función que actualiza el variant de todos los productos
  //     await window.api.updateVariants(newVariant);
  //     setShowModal(false); // Cerrar el modal después de la actualización
  //   } catch (error) {
  //     console.error('Error al actualizar el variant:', error);
  //   }
  // };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Gestión de productos</h1>
      {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleOpenModal}>Actualizar Variant de Todos los Productos</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cambiar Variant</h2>
            <p>Ingresa el nuevo valor para el campo variant de todos los productos:</p>
            <input
              type="number"
              step="0.1"
              value={newVariant}
              onChange={(e) => setNewVariant(parseFloat(e.target.value))}
            />
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleUpdateVariant}>Guardar Cambios</button>
              <button onClick={handleCloseModal} style={{ marginLeft: '10px' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )} */}
      <ProductList />
    </div>
  );
}

export default Products;
