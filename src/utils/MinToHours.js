function MinToHours(mins) {
  return `${Math.trunc(mins / 60)}ч ${mins % 60}м`;
}

export default MinToHours;
