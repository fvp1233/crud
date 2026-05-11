import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' 
      });

      const data = await response.json();

      if (response.ok) {
        // Si el correo se envió, vamos a la verificación
        // Pasamos el email en el state para mostrarlo en la siguiente pantalla
        navigate("/verify-code", { state: { email: formData.email } });
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-bg-glow"></div>

      <Card style={{ maxWidth: '600px' }}>
        <div className="register-header">
          <h2>Crear Cuenta<span style={{ color: '#822727' }}>.</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            Regístrate como un maestro para acceder al sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-grid">
          <Input 
            label="Nombre" 
            name="name" 
            placeholder="Ej. Juan" 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Apellido" 
            name="lastName" 
            placeholder="Ej. Pérez" 
            onChange={handleChange} 
            required 
          />
          
          <div className="full-width">
            <Input 
              label="Correo Electrónico" 
              name="email" 
              type="email" 
              placeholder="juan@ejemplo.com" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="full-width">
            <Input 
              label="Contraseña" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
            />
          </div>

          <Input 
            label="Teléfono" 
            name="phone" 
            placeholder="7777-7777" 
            onChange={handleChange} 
          />
          <Input 
            label="Dirección" 
            name="address" 
            placeholder="San Salvador, ES" 
            onChange={handleChange} 
          />

          <div className="full-width" style={{ marginTop: '1rem' }}>
            <Button type="submit" loading={loading}>
              Enviar Código de Verificación
            </Button>
          </div>
        </form>

        <div className="register-footer">
          ¿Ya tienes cuenta? 
          <Link to="/login" className="login-link"> Inicia sesión</Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;