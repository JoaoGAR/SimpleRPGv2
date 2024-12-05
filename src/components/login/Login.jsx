import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/api/auth/login', formData);
            if (response.status === 200) {
                await login(response.data.token);
                navigate('/world');
            }
        } catch (err) {
            console.error(err);
            alert(err.response.data.msg || 'Erro ao fazer login');
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="card p-4 shadow" style={{ width: '20rem' }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="jose@jose.bol" name="email" value={email} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha:</label>
                            <input type="password" className="form-control" id="password" placeholder="********" name="password" value={password} onChange={onChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                    </form>
                    <p>
                        Não tem uma conta? <Link to="/register">Registrar</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;