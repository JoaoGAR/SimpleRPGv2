import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        character: null,
    });

    useEffect(() => {
        const loadUser = async () => {
            if (auth.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
                try {
                    const res = await axios.get('http://localhost:3001/api/auth/me');

                    setAuth({
                        ...auth,
                        isAuthenticated: true,
                        loading: false,
                        user: res.data,
                        character: res.character !== 'undefined' ? res.character : null,
                    });
                } catch (err) {
                    console.error(err);
                    setAuth({
                        token: null,
                        isAuthenticated: false,
                        loading: false,
                        user: null,
                    });
                }
            } else {
                setAuth({
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                });
            }
        };

        loadUser();
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({
            ...auth,
            token,
            isAuthenticated: true,
            loading: false,
            user: null,
        });
        loadUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
        });
    };

    const loadUser = async () => {
        if (auth.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
            try {
                const res = await axios.get('http://localhost:3001/api/auth/me');

                setAuth((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    loading: false,
                    user: res.data,
                    character: res.character !== 'undefined' ? res.character : null,
                }));
            } catch (err) {
                console.error(err);
                setAuth({
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                });
            }
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};