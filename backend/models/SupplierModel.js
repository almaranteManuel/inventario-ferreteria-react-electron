import { DataTypes } from 'sequelize';
import sequelize from './database.js';

// Definición del modelo de Supplier
const Supplier = sequelize.define('Supplier', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Suppliers',
  timestamps: false,
});

export default Supplier;
