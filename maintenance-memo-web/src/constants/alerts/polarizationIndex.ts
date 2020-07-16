const polarizationIndex = [
  {
    messageAlert: 'CONDIÇÃO QUESTIONÁVEL: '
    + 'recomenda-se agendar uma nova manutenção para este equipamento, '
    + 'probabilidade de aumento dos níveis de umidade, poeira ou contaminação nos enrolamentos.',
    colorAlert: '#e8a801',
  },
  {
    messageAlert: 'CONDIÇÃO RUIM: '
    + 'recomenda-se agendar uma nova manutenção para este equipamento, '
    + 'os níveis de umidade, poeira ou contaminação nos enrolamentos estão aumentando.',
    colorAlert: '#FF7A00',
  },
  {
    messageAlert: 'Recomenda-se fazer manutenção neste equipamento e cadastrar '
    + 'novas informações.',
    colorAlert: '#FF0F00',
  },
  {
    messageAlert: 'CONDIÇÃO PRECÁRIA: '
    + 'recomenda-se verificar com urgência, motor com risco de queimar os enrolamentos '
    + 'devido ao acúmulo de úmidade, poeira ou contaminação.',
    colorAlert: '#FF0F00',
  },
];

export default polarizationIndex;
