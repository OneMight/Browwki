export const nameCountOfWin = (count: number) => {
  return `${count === 0 ? `нет` : count} ${
    count === 1
      ? `окно`
      : count >= 2 && count <= 4
        ? `окна`
        : `окон`
  }`;
};
