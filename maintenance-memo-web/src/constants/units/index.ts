const units = {
  unit: {
    multiplier: 1,
  },
  kilo: {
    multiplier: 1000,
  },
  mega: {
    multiplier: 1000000,
  },
  giga: {
    multiplier: 1000000000,
  },
  tera: {
    multiplier: 1000000000000,
  },
};

function convertUnit(option:string, value:number | string):number {
  const valueNumber = Number(value);
  switch (option) {
    case '1':
      return (valueNumber * units.unit.multiplier);
    case '2':
      return (valueNumber * units.kilo.multiplier);
    case '3':
      return (valueNumber * units.mega.multiplier);
    case '4':
      return (valueNumber * units.giga.multiplier);
    case '5':
      return (valueNumber * units.tera.multiplier);
    case '6':
      return (valueNumber / units.unit.multiplier);
    case '7':
      return (valueNumber / units.kilo.multiplier);
    case '8':
      return (valueNumber / units.mega.multiplier);
    case '9':
      return (valueNumber / units.giga.multiplier);
    case '10':
      return (valueNumber / units.tera.multiplier);
    default:
      return valueNumber;
  }
}

export default convertUnit;
