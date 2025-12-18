import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Schedule from './pages/Schedule';
import Network from './pages/Network';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="network" element={<Network />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomerProvider>
  );
}

export default App;
