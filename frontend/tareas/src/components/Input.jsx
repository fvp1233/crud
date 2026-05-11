import './components.css';

export const Input = ({ label, ...props }) => {
  return (
    <div className="custom-input-group">
      {label && <label className="custom-label">{label}</label>}
      
      <input 
        className="custom-input" 
        autoComplete="off" 
        {...props} 
      />
    </div>
  );
};