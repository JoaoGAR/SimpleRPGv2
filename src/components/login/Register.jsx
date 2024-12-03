import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/auth/register', formData);
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Erro ao registrar');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;