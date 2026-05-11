import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

function Login() {
    const nagivate = useNavigate();
    const { login, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const DatosLogin = async (event) => {
    //Valores que pide el logi
    //const [loading, setLoading] = useState(false);
    
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      return;
    }

    const ok = await login(email.trim(), password);
    if (!ok) {
      return;
    }
    nagivate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-bg-glow"></div>

      <div className="login-container">
        {/* Lado izquierdo: Info */}
        <aside className="login-aside">
          <div className="brand-content">
            <span className="brand-line"></span>
            <h1 className="brand-title">Bienvenido Profesor</h1>
            <p className="brand-subtitle">
              Tenga compasión con la prueba porfis, hoy descubri el useContext
            </p>
          </div>
        </aside>

        {/* Lado derecho: Card de Login */}
        <main className="login-main">
          <Card>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Bienvenido<span style={{ color: "#822727" }}>!</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                marginBottom: "2rem",
                fontSize: "0.9rem",
              }}
            >
              Ingresa tus credenciales de profesor para continuar.
            </p>

            <form onSubmit={DatosLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="dueño@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                //loading={loading}
              >
                Iniciar Sesión
                {loading ? "ingresando.." : "Iniciar sesión"}
              </Button>
            </form>

            <div className="login-footer">
              ¿Aún no tienes cuenta?
              <Link to="/register" className="login-link">
                Crear cuenta
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Login;
