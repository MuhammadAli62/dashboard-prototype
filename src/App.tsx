import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './_root/pages/Home';
import SignupForm from './_auth/form/SiginupForm';
import SignInForm from './_auth/form/SiginForm';
import EmailForm from './_auth/form/emailform';
import ProtactedRoute from './_root/ProtactedRoute';
import Dashboard from './_root/pages/Dashboard';
import { UserAuthContextProvider } from './context/AuthContext';
import ForgetPassword from './_auth/form/Forgetpassword';
import Layout from './_root/pages/layout';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/register' element={<SignupForm />} />
            <Route path='/login' element={<SignInForm />} />
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            <Route path='/form' element={<EmailForm/>}/>
            <Route path='/dashboard' element={
              <ProtactedRoute>
                <Dashboard />
              </ProtactedRoute>
            } />
            <Route path='/ecommerce/products' element={
              <ProtactedRoute>
                <Layout />
              </ProtactedRoute>
            } />


          </Routes>
        </UserAuthContextProvider>
      </div>
    </Router>
  );
}; 

export default App;

