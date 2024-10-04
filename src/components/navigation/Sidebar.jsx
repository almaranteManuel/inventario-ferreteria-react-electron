import { useState } from "react";
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Cierra el sidebar automáticamente cuando el mouse sale
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {/* Icono para abrir el sidebar */}
            {!isOpen && (
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </div>
            )}
            
            {/* Sidebar con evento para cerrar cuando el mouse salga */}
            <div 
                className={`sidebar ${isOpen ? 'open' : ''}`} 
                onMouseLeave={handleMouseLeave}  // Cierra cuando el mouse sale
            >
                {/* Icono para cerrar el sidebar */}
                <div className="sidebar-close" onClick={toggleSidebar}>
                    <i className="fas fa-times"></i> {/* Icono de cerrar */}
                </div>

                {/* Contenido del sidebar */}
                <div className="sidebar-content">
                    <ul>
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/suppliers">Proveedores</Link></li>
                        <li><Link to="/purchases">Compras</Link></li>
                        <li><Link to="/sales">Ventas</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
