import 'bootstrap/dist/css/bootstrap.min.css';
import './components/dialogs/dialogs.css';
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
import Dungeon from './components/dungeon/Dungeon';
import BattleCamp from './components/battle/battleCamp';

import { AuthProvider } from './context/AuthContext';
import { BattleRollsProvider } from './context/BattleContext';
import { ItemInfoProvider } from './context/ItemInfoContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard'
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/' element={<Login />} />

                    <Route path='/character/register'
                        element={
                            <PrivateRoute>
                                <CharacterCreation />
                            </PrivateRoute>
                        }
                    />

                    <Route path='/world'
                        element={
                            <PrivateRoute>
                                <ItemInfoProvider><Index /></ItemInfoProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route path='/city/:cityName/:cityId'
                        element={
                            <PrivateRoute>
                                <BattleRollsProvider><City /></BattleRollsProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route path='/dungeon/:cityName/:cityId'
                        element={
                            <PrivateRoute>
                                <BattleRollsProvider><Dungeon /></BattleRollsProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route path='/battle/:targetId/:locationId'
                        element={
                            <PrivateRoute>
                                <BattleCamp />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;