import { useState } from 'react';
import TablaVideojuegos from './components/TablaVideojuegos';
import videojuegosData from './data/videojuegos';

function App() {
  const [videojuegos] = useState(videojuegosData);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '24px' }}>Tienda de Videojuegos</h1>
      <TablaVideojuegos videojuegos={videojuegos} />
    </div>
  );
}

export default App;
