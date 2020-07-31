const participantes = [
  {
    id: 0,
    nombre: "Prueba",
    email: "prueba@prueba.com",
  },
];

let i = 0;

function getParticipantes() {
  return participantes;
}

function pushParticipantes(data) {
  let newParticipante = data;
 
  newParticipante.id = counter();
  participantes.push(newParticipante);

}

function counter(){
    return i++
}

module.exports = {
  getParticipantes: getParticipantes,
  pushParticipantes: pushParticipantes,
};
