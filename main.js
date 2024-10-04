import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(process.cwd(), 'preload.js'), // Asegúrate de que el preload.js está en la raíz
      nodeIntegration: true,
      contextIsolation: false, // Puede ser necesario para permitir nodeIntegration
    },
  });

  // Carga la aplicación de Vite en la ventana de Electron
  win.loadURL('http://localhost:5173'); // O el puerto que estés utilizando

  // Abre las herramientas de desarrollo (opcional)
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

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
