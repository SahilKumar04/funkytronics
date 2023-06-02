import React from 'react';
import { Transition } from 'react-transition-group';
import 'tailwindcss/tailwind.css';

const OpenOrders = () => {
    const [orders, setOrders] = React.useState([
      { id: "jsyusebufbuwyrwrwy", status: 'Pending', customerName: 'John Doe',deliveryDate: "20/05/2023" , orderDate: "25/05/2023",price:150 ,productName : "Watch"},
      { id: "aknkfnjn632r65t87y", status: 'Confirmed', customerName: 'Jane Smith' ,deliveryDate: "20/05/2023" , orderDate: "25/05/2023",price:150, productName :"Oppo reno 5T"},
    ]);
  
    return (
      <div>
        {orders
          .filter((order) => order.status === 'Pending' || order.status === 'Confirmed')
          .map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
      </div>
    );
};
  

const OrderHistory = () => {
  const [orders, setOrders] = React.useState([
    { id: "hfbeshbfubfuesbfdv", status: 'Delivered', customerName: 'John Doe' ,deliveryDate: "20/05/2023" , orderDate: "25/05/2023",price:150, productName : "One Plus Nord" },
    { id: "kjncsndnu887ryw78y", status: 'Delivered', customerName: 'Jane Smith',deliveryDate: "20/05/2023" , orderDate: "25/05/2023",price:150,productName : "Apple Ipone 12"},
  ]);
  // Filter delivered orders
  const deliveredOrders = orders.filter((order) => order.status === 'Delivered');

  return (
    <div>
      {deliveredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

const OrderCard = ({ order }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
    const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="border border-gray-800 rounded-md shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Order {order.id}</h3>
            <p className="text-gray-500 mt-2">Product Name: {order.productName}</p>
            {order.price && (
              <p className="text-gray-500 color-red">Price: ₹{order.price}</p>
            )}
            <p className="mt-2">Status: {order.status}</p>

          </div>
          <button className="text-blue-500" onClick={handleToggleExpand}>
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
  
        <Transition in={isExpanded} timeout={300}>
          {(state) => (
            <div
              className={`overflow-hidden transition-height duration-300 ${
                state === 'entered' ? 'h-auto' : 'h-0'
              }`}
            >
              <p className="mt-2">Order Date: {order.orderDate}</p>
              <p className="mt-2">Delivery Date: {order.deliveryDate}</p>
            </div>
          )}
        </Transition>
      </div>
    );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = React.useState('open');

  const handleTabChange = (tab) => {
      setActiveTab(tab);
  };

  return (
      <div className="border rounded-md p-4 mb-4">
      {/* Tab navigation */}
      <div className="mb-8">
          <button
            className={`mr-4 ${
                activeTab === 'open' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            } px-4 py-2 rounded`}
            onClick={() => handleTabChange('open')}
          >
          Open Orders
          </button>
          <button
            className={`mr-4 ${
                activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            } px-4 py-2 rounded`}
            onClick={() => handleTabChange('history')}
          >
          Order History
          </button>
      </div>

      {/* Render content based on active tab */}
      {activeTab === 'open' ? <OpenOrders /> : <OrderHistory />}
      </div>
  );
};
  
export default OrdersPage;

