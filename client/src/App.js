import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Shared from './components/pages/Shared';
import Department from './components/pages/Department';
import User from './components/pages/User';
import NewDocument from './components/pages/NewDocument';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/pages/UserProfile';
import Home from './components/pages/Home';
import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import DocumentState from './context/document/DocumentState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import DocumentDetails from './components/pages/DocumentDetails';
import EditDocument from './components/pages/EditDocument';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <DocumentState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route path='/' element={<Shared />} />
                  <Route path='/department' element={<Department />} />
                  <Route path='/user' element={<User />} />
                  <Route path='/new' element={<NewDocument />} />
                  <Route path='/document/:id' element={<DocumentDetails />} />
                  <Route path='/document/:id/edit' element={<EditDocument />} />
                  <Route path='/userProfile' element={<UserProfile />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </DocumentState>
    </AuthState>
  );
};

export default App;
