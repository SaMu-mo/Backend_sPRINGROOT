import { useEffect, useState } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const temporizador = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensaje]);

  if (!visible || !mensaje) return null;

  return (
    <div className="alerta-toast">
      {mensaje}
    </div>
  );
}

export default AlertaNotificacion;
