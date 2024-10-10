import { app, BrowserWindow } from 'electron';
import path from 'path';
import productRoutes from './backend/routes/productRoutes.js';
import salesRoutes from './backend/routes/saleRoutes.js';
import purchasesRoutes from './backend/routes/purchaseRoutes.js';
import suppliersRoutes from './backend/routes/supplierRoutes.js';
import remindersRoutes from './backend/routes/reminderRoutes.js';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(process.cwd(), './preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // Carga la aplicación de Vite en la ventana de Electron
  win.loadURL('http://localhost:5173'); // O el puerto que estés utilizando

  // Abre las herramientas de desarrollo (opcional)
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  productRoutes();
  salesRoutes();
  purchasesRoutes();
  suppliersRoutes();
  remindersRoutes();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
