// routes/productRoutes.js
import { ipcMain } from 'electron';
import purchaseController from '../controllers/PurchaseController.js';

const purchaseRoutes = () => {
  ipcMain.handle('loadPurchases', purchaseController.getAll);
  ipcMain.handle('addPurchase', (event, purchaseData) => purchaseController.create(purchaseData));
  ipcMain.handle('editPurchase', (event, id, purchaseData) => purchaseController.update(id, purchaseData));
  ipcMain.handle('deletePurchase', (event, id) => purchaseController.delete(id));
  ipcMain.handle('get-purchase-by-id', (event, id) => purchaseController.getById(id));
  ipcMain.handle('getPurchaseBymonth', (event, year, month) => purchaseController.getByMonth(year, month));
  ipcMain.handle('getPurchaseByYear', (event, year) => purchaseController.getByYear(year));
};

export default purchaseRoutes;
