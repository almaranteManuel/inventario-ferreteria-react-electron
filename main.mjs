// main.js
// const { app, BrowserWindow } = require('electron');
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import productRoutes from './backend/routes/productRoutes.js';
import salesRoutes from './backend/routes/saleRoutes.js';
import purchasesRoutes from './backend/routes/purchaseRoutes.js';
import suppliersRoutes from './backend/routes/supplierRoutes.js';
import remindersRoutes from './backend/routes/reminderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'src', 'assets', 'cachito_icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  //const url =  `file://${path.resolve(__dirname, 'dist', 'index.html')}`;
  const url =  `file://${path.join(__dirname, 'dist/index.html')}`;

  console.log(`Cargando URL: ${url}`);
  mainWindow.loadURL(url);

  // Aquí registramos las rutas del backend de Electron
  productRoutes();
  purchasesRoutes();
  remindersRoutes();
  salesRoutes();
  suppliersRoutes();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
