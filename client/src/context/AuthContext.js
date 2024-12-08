import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import api from '../axios'; 

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) => {
        try {
            const response = await api.post('/token/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refresh', refresh);

            console.log('Token stored:', access);
            const decoded = jwtDecode(access);
            setUser(decoded);
            setToken(access);
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error);
            throw new Error('Login failed');
        }
    };

    const register = async (username, password, email) => {
        try {
            // Check if the token is available; if needed, pass the token in headers
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            await api.post('/register/', { username, password, email }, { headers });
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
