function useAvarageInsulation(value1:number, value2:number, value3:number): string {
  const avarageValues = ((value1 + value2 + value3) / 3).toFixed(2);

  return avarageValues;
}

export default useAvarageInsulation;
