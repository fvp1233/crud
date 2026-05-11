import "./components.css";

export const Button = ({ children, loading, ...props }) => (
  <button
    className="custom-button"
    disabled={loading || props.disabled}
    {...props}
  >
    Iniciar sesión
  </button>
);
