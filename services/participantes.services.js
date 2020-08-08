const participantes = [
  {
    id: 0,
    nombre: "Prueba",
    email: "prueba@prueba.com",
  },
];

let i = 1;

function getParticipantes() {
  return participantes;
}

function pushParticipantes(data) {
  let newParticipante = data;
  let validation = validateEmail(data.email);

  newParticipante.id = counter();
  participantes.push(newParticipante);
}

function counter() {
  return i++;
}

function validateEmail(data) {
  let email = data.split("@");
  let domainGiven = email[1];

  let invalidDomains = ["gmail.com", "hotmail.com", "yahoo.com"];

  invalidDomains.forEach((domain) => {
    if (domain === domainGiven || !domainGiven) {
      throw new Error("Por favor ingrese un correo válido.");
    }
  });
  let participantes = getParticipantes();
  participantes.forEach((object) => {
    if (data === object.email) {
      throw new Error("Correo duplicado, ¡ya te registraste!");
    }
  });
}

module.exports = {
  getParticipantes: getParticipantes,
  pushParticipantes: pushParticipantes,
};
