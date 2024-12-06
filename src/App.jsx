import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './components/login/Register';
import Login from './components/login/Login';
import Dashboard from './components/login/Dashboard';
import PrivateRoute from './components/login/PrivateRoute';
import CharacterCreation from './components/character/CharacterCreation';
import Index from './components/world/Index';

import City from './components/city/City';

import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Login />} />

                    <Route path="/character/register"
                        element={
                            <PrivateRoute>
                                <CharacterCreation />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/world"
                        element={
                            <PrivateRoute>
                                <Index />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/city/:cityName/:cityId"
                        element={
                            <PrivateRoute>
                                <City />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;