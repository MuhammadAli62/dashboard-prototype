import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './_root/pages/Home';
import SignupForm from './_auth/form/SiginupForm';
import SignInForm from './_auth/form/SiginForm';
import EmailForm from './_auth/form/emailform';
import Dashboard from './_root/pages/Dashboard';
import { UserAuthContextProvider } from './context/AuthContext';
import ForgetPassword from './_auth/form/Forgetpassword';
import Layout from './_root/pages/layout';
import { AdminPanel } from './_root/pages/Admin';
import AdminsignInForm from './_auth/form/adminform';
import { SearchProductContextProvider } from './context/searchContext';
import { ProductQuantityContextProvider } from './context/QuantityContext';
import Quotation from './components/Shared/Quotation';
import ProtectedRoute from './_root/ProtactedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <UserAuthContextProvider>
          <SearchProductContextProvider>
            <ProductQuantityContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignupForm />} />
                <Route path="/login" element={<SignInForm />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/adminform" element={<AdminsignInForm />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/form" element={<EmailForm />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/products" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                } />
                <Route path="/quotation" element={
                  <ProtectedRoute>
                    <Quotation />
                  </ProtectedRoute>
                } />
              </Routes>
            </ProductQuantityContextProvider>
          </SearchProductContextProvider>
        </UserAuthContextProvider>
      </div>
    </Router>
  );
};

export default App;

