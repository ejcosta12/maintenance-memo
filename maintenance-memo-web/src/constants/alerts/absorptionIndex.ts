const absorptionIndex = [
  {
    messageAlert: 'CONDIÇÃO QUESTIONÁVEL: '
    + 'recomenda-se agendar uma nova manutenção para este equipamento, '
    + 'motor com baixo nível de contaminação nos enrolamentos.',
    colorAlert: '#e8a801',
  },
  {
    messageAlert: 'CONDIÇÃO RUIM: '
    + 'recomenda-se agendar uma nova manutenção para este equipamento, '
    + 'o nível de contaminação nos enrolamentos está aumentando.',
    colorAlert: '#FF7A00',
  },
  {
    messageAlert: 'Recomenda-se fazer manutenção neste equipamento e cadastrar '
    + 'novas informações.',
    colorAlert: '#FF0F00',
  },
  {
    messageAlert: 'CONDIÇÃO PRECÁRIA: '
    + 'recomenda-se verificar com urgência, motor com risco de queimar os enrolamentos, '
    + 'alto nível de contaminação.',
    colorAlert: '#FF0F00',
  },
];

export default absorptionIndex;
