import React from 'react';
import { Col, Row, Statistic } from 'antd';

function Reports() {
  return (
    <div style={{alignItems: 'center', justifyContent: 'center'}}>
      <h1 style={{textAlign: 'center'}}>Reportes / Detalles</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={6}>
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        </Col>
      </Row>
    </div>
  );
}

export default Reports;
