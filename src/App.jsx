import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';

function App() {
  return (
    <Router>
      <div className='app'>
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route path="/Products" element={<Products />} />
            <Route path="/Suppliers" element={<Suppliers />} />
            <Route path="/Sales" element={<Sales />} />
            <Route path="/Purchases" element={<Purchases />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
