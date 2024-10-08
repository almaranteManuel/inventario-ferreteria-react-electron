// routes/productRoutes.js
import { ipcMain } from 'electron';
import SupplierController from  '../controllers/SupplierController.js';

const supplierController = () => {
  ipcMain.handle('loadSuppliers', SupplierController.getAll);
  ipcMain.handle('addSupplier', (event, supplierData) => SupplierController.create(supplierData));
  ipcMain.handle('editSupplier', (event, id, supplierData) => SupplierController.update(id, supplierData));
  ipcMain.handle('deleteSupplier', (event, id) => SupplierController.delete(id));
  ipcMain.handle('get-supplier-by-id', (event, id) => SupplierController.getById(id));
};

export default supplierController;
