// routes/productRoutes.js
import { ipcMain } from 'electron';
import ProductController from '../controllers/ProductController.js';

const productRoutes = () => {
  ipcMain.handle('load-products', ProductController.getAll);
  ipcMain.handle('add-product', (event, productData) => ProductController.create(productData));
  ipcMain.handle('editProduct', (event, id, productData) => ProductController.update(id, productData));
  ipcMain.handle('deleteProduct', (event, id) => ProductController.delete(id));
  ipcMain.handle('search-products', (event, query) => ProductController.searchByCode(query));
  ipcMain.handle('get-product-by-id', (event, id) => ProductController.getById(id));
};

export default productRoutes;
