import React, { useEffect, useState } from 'react';
import { Card, Statistic, List, Row, Col, Typography } from 'antd';
import { DollarCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment/moment'
moment.locale('es');

const { Text } = Typography;

function SalesBalance() {
  const [monthlySales, setMonthlySales] = useState(0);
  const [annualSales, setAnnualSales] = useState(0);
  const [previousMonthlySales, setPreviousMonthlySales] = useState(0);
  const [previousAnnualSales, setPreviousAnnualSales] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MM'));
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));

  // Calculamos la ganancia (40%) y el costo de mercadería (60%)
  const calculateProfit = (sales) => sales * 0.4; // 40% de ganancia
  const calculateCost = (sales) => sales * 0.6;   // 60% para cubrir el costo de mercadería

  // balance de ventas en porcentaje
  const calculatePercentage = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0; // Evitamos división por 0
    return ((current - previous) / previous) * 100;
  };

  // Cargar ventas anuales y mensuales
  const loadAnnualSales = async (year) => {
    try {
      const response = await window.api.getSaleByYear(year);
      const previousResponse = await window.api.getSaleByYear(year - 1); // Año anterior

      setAnnualSales(response.totalYearlySales);
      setPreviousAnnualSales(previousResponse.totalYearlySales);

      setSalesData(response.monthlySales);
      
      const currentMonthData = response.monthlySales.find(item => item.month === currentMonth);
      const previousMonthData = response.monthlySales.find(item => item.month === moment().subtract(1, 'months').format('MM'));

      setMonthlySales(currentMonthData ? currentMonthData.totalSales : 0);
      setPreviousMonthlySales(previousMonthData ? previousMonthData.totalSales : 0);
    } catch (error) {
      console.error('Error al obtener las ventas del año:', error);
    }
  };

  useEffect(() => {
    const currentYear = moment().format('YYYY');
    loadAnnualSales(currentYear);
  }, [currentMonth]);

  return (
    <>
    <div style={{marginTop: 30, paddingInline: 15}}>
      <Text mark>Los balances y ganancias se calculan como el 40% de las ventas totales, mientras que el 60% cubre los costos de la mercadería vendida.</Text>
      <Row gutter={16} style={{ marginTop: 20, justifyContent: 'center' }}>

        <Col span={6}>
          <Card bordered={true} style={{ width: 300, backgroundColor: '#ccc' }}>
            <Statistic
              title={`Balance del Mes (${currentMonth})`}
              value={calculatePercentage(monthlySales, previousMonthlySales).toFixed(2)}
              precision={2}
              valueStyle={{
                color: monthlySales >= previousMonthlySales ? '#3f8600' : '#cf1322',
              }}
              prefix={monthlySales >= previousMonthlySales ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
            <Statistic
              title="Ganancia Mensual"
              value={calculateProfit(monthlySales).toFixed(2)}
              precision={2}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={true} style={{ width: 300, backgroundColor: '#ccc' }}>
            <Statistic
              title={`Balance del Año (${selectedYear})`}
              value={calculatePercentage(annualSales, previousAnnualSales).toFixed(2)}
              precision={2}
              valueStyle={{
                color: annualSales >= previousAnnualSales ? '#3f8600' : '#cf1322',
              }}
              prefix={annualSales >= previousAnnualSales ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
            <Statistic
              title="Ganancia Anual"
              value={calculateProfit(annualSales).toFixed(2)}
              precision={2}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
        <h3>Ganancias Mensuales del Año {selectedYear}</h3>
        <List
        grid={{
            gutter: 16,
            column: 4,
        }}
        dataSource={salesData}
        renderItem={item => {
            const totalSales = item.totalSales;
            const costOfGoods = calculateCost(totalSales);
            const profit = calculateProfit(totalSales);

            return (
            <List.Item>
                <Card>
                <strong>{moment(item.month, 'MM').format('MMMM')}</strong>:
                <ul>
                    <li><strong>Ventas Totales:</strong> ${totalSales.toFixed(2)}</li>
                    <li><strong>Costo de Mercadería (60%):</strong> ${costOfGoods.toFixed(2)}</li>
                    <li><strong>Ganancia (40%):</strong> ${profit.toFixed(2)}</li>
                </ul>
                </Card>
            </List.Item>
            );
        }}
        />

    </div>
    </>
  );
}

export default SalesBalance;
