const saldo = 500;

function retirarDinero(monto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (monto <= saldo) {
        resolve(`Retiro exitoso de $${monto}. Saldo restante: $${saldo - monto}`);
      } else {
        reject(`Fondos insuficientes. Límite de retiro: $500`);
      }
    }, 1500);
  });
}

// Caso exitoso
retirarDinero(200)
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));

// Caso fallido
retirarDinero(600)
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));