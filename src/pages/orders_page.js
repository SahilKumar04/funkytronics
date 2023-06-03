import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const OpenOrders = () => {
  const [orders] = useState([
    { id: "jsyusebufbuwyrwrwy", status: 'PENDING', customerName: 'John Doe', deliveryDate: "20/05/2023", orderDate: new Date().toLocaleDateString(), price: 150, productName: "Watch", paymentStatus : "CAPTURED"},
    { id: "aknkfnjn632r65t87y", status: 'ACCEPTED', customerName: 'Jane Smith', deliveryDate: "20/05/2023", orderDate: new Date().toLocaleDateString(), price: 150, productName: "Oppo reno 5T", paymentStatus : "CAPTURED"},
  ]);

  return (
    <div>
      {orders
        .filter((order) => order.status === 'PENDING' || order.status === 'ACCEPTED')
        .map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
    </div>
  );
};

const OrderHistory = () => {
  const [orders] = useState([
    { id: "hfbeshbfubfuesbfdv", status: 'DELIVERED', customerName: 'John Doe', deliveryDate: "20/05/2023", orderDate: "25/05/2023", price: 150, productName: "One Plus Nord" , paymentStatus : "SETTLED"},
    { id: "kjncsndnu887ryw78y", status: 'DELIVERED', customerName: 'Jane Smith', deliveryDate: "20/05/2023", orderDate: "25/05/2023", price: 150, productName: "Apple Ipone 12" , paymentStatus : "SETTLED"},
    { id: "kjncsndnu887ryw78y", status: 'CANCELLED', customerName: 'Jane Smith', deliveryDate: "20/05/2023", orderDate: "25/05/2023", price: 150, productName: "Apple Ipone 12" , paymentStatus : "REFUNDED"},
    { id: "kjncsndnu887ryw78y", status: 'RETURNED', customerName: 'Jane Smith', deliveryDate: "20/05/2023", orderDate: "25/05/2023", price: 150, productName: "Apple Ipone 12" , paymentStatus : "REFUNDED"},
  ]);
  // Filter delivered orders
  const deliveredOrders = orders.filter((order) => order.status === 'DELIVERED'|| order.status === 'CANCELLED' || order.status === 'RETURNED');

  return (
    <div>
      {deliveredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    if (status === 'PENDING' || status === 'CAPTURED') {
      return 'blue';
    } else if (status === 'CANCELLED') {
      return 'red';
    } else if (status === 'ACCEPTED'){
      return 'yellow';
    } else if (status === 'DELIVERED' || status === 'SETTLED'){
      return 'green';
    } else if (status === 'RETURNED' || status === 'REFUNDED'){
      return '#E75480';
    }
  };

  return (
    <Card className="p-shadow-2 mb-4"
        style={{
          width: '100%',
          transition: 'background-color 0.3s',
          backgroundColor: 'initial',
          cursor: 'pointer',
          borderRadius: "20px"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B0E0E6')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'initial')}
      >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '16px' }}>
          <img src='https://loremflickr.com/320/240' alt={order.productName} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        </div>
        <div>
          <h3 className="text-sm font-weight-bold">Order {order.id}</h3>
          <p className="text-secondary mt-2" style={{ fontSize: '12px' }}>Product Name: {order.productName}</p>
          {order.price && (
            <p className="text-secondary" style={{ fontSize: '12px' }}>Price: ₹{order.price}</p>
          )}
          <p className="mt-2" style={{ fontSize: '12px' }}>
            Status: <span style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>{order.status}</span>
          </p>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p className="text-secondary mt-2" style={{ fontSize: '12px' }}>Order Date: {order.orderDate}</p>
          <p className="text-secondary" style={{ fontSize: '12px' }}>Delivery Date: {order.deliveryDate}</p>
          <p className="text-secondary" style={{ fontSize: '12px' }}>
            Payment Status: <span style={{ color: getStatusColor(order.paymentStatus), fontWeight: 'bold' }}>{order.paymentStatus}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('open');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Tab navigation */}
      <TabView activeIndex={activeTab === 'open' ? 0 : 1} onTabChange={(e) => handleTabChange(e.index === 0 ? 'open' : 'history')}>
        <TabPanel header="Open Orders">
          <OpenOrders />
        </TabPanel>
        <TabPanel header="Order History">
          <OrderHistory />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default OrdersPage;
