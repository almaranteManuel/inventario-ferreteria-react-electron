import Product from './backend/models/ProductModel.js';
import sequelize from './backend/models/database.js'; // Asegúrate de que la ruta sea correcta

const probarCrearProducto = async () => {
    try {
      // Conexión a la base de datos
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
  
      // Sincronizar la base de datos
      await sequelize.sync();
      console.log('Tablas sincronizadas');
  
      // Crear un producto de prueba
      const productoPrueba = {
        code: 'P001',
        description: 'Producto de prueba',
        price: 100.0,
        own_price: '80.0',
        stock: 50,
        variant: 1.7,
      };
  
      const nuevoProducto = await Product.create(productoPrueba);
      console.log('Producto creado:', nuevoProducto.toJSON());
  
      // Obtener todos los productos
      const productos = await Product.findAll();
      console.log('Productos obtenidos:', JSON.stringify(productos, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  probarCrearProducto();