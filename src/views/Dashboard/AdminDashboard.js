import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row} from 'reactstrap';

const Dashboard = props =>{

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">9.823</div>
              <div>Members online</div>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">
              <div className="text-value">9.823</div>
              <div>Members online</div>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <div className="text-value">9.823</div>
              <div>Members online</div>
            </CardBody>
            <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-danger">
            <CardBody className="pb-0">
              <div className="text-value">9.823</div>
              <div>Members online</div>
            </CardBody>
            <div className="chart-wrapper mt-3 mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

};

export default Dashboard;
