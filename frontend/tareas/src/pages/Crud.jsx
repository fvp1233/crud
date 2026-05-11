import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './Crud.css';
import { useNavigate } from 'react-router-dom';

function Crud() {
    const navigate = useNavigate();
  const MANUAL_USER_ID = "";

  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // Para saber si estamos editando
  const [newHomework, setNewHomework] = useState({
    titulo: "", materia: "", descripcion: "", fecha: "", estado: "", prioridad: "" 
  });

  const fetchHomeworks = async () => {
    try {
      const response = await fetch('http://localhost:4000/api', { credentials: 'include' });
      const data = await response.json();
      if (response.ok) setHomeworks(data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  useEffect(() => { fetchHomeworks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const homWorkData = {
      ...newHomework,
    };

    const url = editingId 
      ? `http://localhost:4000/api//${editingId}` // Si hay ID, es PUT
      : 'http://localhost:4000/api/';             // Si no, es POST

    try {
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homWorkData),
        credentials: 'include'
      });

      if (response.ok) {
        setHomeworks({ titulo: "", materia: "", descripcion: "", fecha: "", estado: "", prioridad: "" });
        setEditingId(null);
        fetchHomeworks();
        alert(editingId ? "Tarea actualizada" : "Tarea agregada");
      }
    } catch (error) {
      alert("Error en la operación");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta mascota?")) return;

    try {
      const response = await fetch(`http://localhost:4000/api//${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        fetchHomeworks();
      } else {
        alert("No se pudo eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST', 
        credentials: 'include'
      });

      if (response.ok) {

        navigate('/login');
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      navigate('/login');
    }
  };

  const startEdit = (pet) => {
    setEditingId(pet._id);
    setNewHomework({
        titulo: homeworks.titulo,
        materia: homeworks.materia,
        descripcion: homeworks.descripcion,
        fecha: homeworks.fecha,
        estado: homeworks.estado,
        prioridad: homeworks.prioridad
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al formulario
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        
        <header className="dashboard-header">
          <h1>Mis Mascotas<span style={{color: '#822727'}}>.</span></h1>

          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </header>

        <section className="pet-form-section">
          <Card style={{maxWidth: '100%'}}>
            <h3>{editingId ? "Editar Mascota" : "Registrar Mascota"}</h3>
            <form onSubmit={handleSubmit} className="pet-form-grid">
              <Input label="Nombre" value={newHomework.titulo} onChange={(e) => setNewHomework({...newHomework, titulo: e.target.value})} required />
              <Input label="Especie" value={newHomework.materia} onChange={(e) => setNewHomework({...newHomework, materia: e.target.value})} required />
              <Input label="Raza" value={newHomework.descripcion} onChange={(e) => setNewHomework({...newHomework, descripcion: e.target.value})} required />
              <Input label="Edad" type="number" value={newHomework.fecha} onChange={(e) => setNewHomework({...newHomework, fecha: e.target.value})} required />
              <Input label="Estado"  value={newHomework.estado} onChange={(e) => setNewHomework({...newHomework, estado: e.target.value})} required />
              <Input label="Prioridad" value={newHomework.prioridad} onChange={(e) => setNewHomework({...newHomework, prioridad: e.target.value})} required />
              
              <div className="actions-cell" style={{marginBottom: '1.2rem'}}>
                <Button type="submit" loading={loading}>
                  {editingId ? "Guardar Cambios" : "Agregar"}
                </Button>
                {editingId && (
                  <button type="button" className="btn-edit" onClick={() => {setEditingId(null); setNewHomework({titulo:"",materia:"",descripcion:"",fecha:"",estado:"", prioridad:"" })}}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </Card>
        </section>

        <section className="table-container">
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Materia</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {homeworks.map((homework) => (
                <tr key={homework._id}>
                  <td><strong>{homework.titulo}</strong></td>
                  <td>{homework.materia}</td>
                  <td>{homework.descripcion}</td>
                  <td>{homework.fecha} años</td>
                  <td>{homework.estado} estado</td>
                  <td>{homework.prioridad} prioridad</td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => startEdit(homework)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(homework._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Crud;