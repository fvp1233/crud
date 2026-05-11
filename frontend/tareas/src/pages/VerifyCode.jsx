import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './VerifyCode.css';

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || "tu correo";
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationCodeRequest: code }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Cuenta verificada con éxito! Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        alert(data.message || "Código inválido o expirado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="register-bg-glow"></div>

      <Card>
        <div className="verify-header">
          <h2>Verifica tu Email<span style={{ color: '#822727' }}>.</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            Ingresa el código que enviamos a:
            <span className="email-display">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify}>
          <div className="code-input-container">
            <Input 
              label="Código de Verificación"
              placeholder="Ej. A1B2C3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit" loading={loading}>
              Finalizar Registro
            </Button>
          </div>
        </form>

        <div className="verify-footer">
          <p>El código expira en 15 minutos.</p>
          <p style={{ marginTop: '10px' }}>
            ¿No recibiste nada? <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => navigate("/register")}>Intenta registrarte de nuevo.</span>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default VerifyCode;