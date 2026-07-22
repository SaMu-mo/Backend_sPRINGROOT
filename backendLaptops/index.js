const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// Crear una laptop
app.post('/laptops', (req, res) => {
  console.log(req.body);
  const laptop = { id: 100, ...req.body };
  res.json(laptop);
});

// Recuperar una laptop
app.get('/laptops/:id', (req, res) => {
  const laptop = {
    id: req.params.id,
    marca: 'Lenovo',
    procesador: 'Intel core i5',
    memoria: '16 GB',
    disco: '1 TB'
  };
  res.json(laptop);
});

// Recuperar todas las laptops
app.get('/laptops', (req, res) => {
  const laptops = [
    { id: 1, marca: 'Lenovo', procesador: 'Intel i5', memoria: '16 GB', disco: '1 TB' },
    { id: 2, marca: 'HP', procesador: 'Intel i7', memoria: '8 GB', disco: '512 GB' },
    { id: 3, marca: 'Dell', procesador: 'Ryzen 5', memoria: '16 GB', disco: '1 TB' },
    { id: 4, marca: 'Asus', procesador: 'Ryzen 7', memoria: '32 GB', disco: '2 TB' },
    { id: 5, marca: 'Acer', procesador: 'Intel i3', memoria: '8 GB', disco: '256 GB' }
  ];
  res.json(laptops);
});

// Actualizar una laptop
app.put('/laptops/:id', (req, res) => {
  console.log(req.params.id);
  res.json(req.body);
});

// Eliminar una laptop
app.delete('/laptops/:id', (req, res) => {
  console.log(req.params.id);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));