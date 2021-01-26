interface Entry {
  id: number,
  amount: number | number[]
}

export const compareResults = (firstEntry: Entry, secondEntry: Entry) => {
  if (!firstEntry.amount || !secondEntry.amount) return -1;
  if (!Array.isArray(firstEntry.amount) && !Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount > secondEntry.amount) return firstEntry.id;
    if (secondEntry.amount > firstEntry.amount) return secondEntry.id;
    return 0;
  } else if (Array.isArray(firstEntry.amount) && Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount[0] > secondEntry.amount[1]) return firstEntry.id;
    if (secondEntry.amount[0] > firstEntry.amount[1]) return secondEntry.id;
    return -2;
  } else if (Array.isArray(firstEntry.amount) && !Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount[0] > secondEntry.amount) return firstEntry.id;
    if (secondEntry.amount > firstEntry.amount[1]) return secondEntry.id;
    return -2;
  } else if (!Array.isArray(firstEntry.amount) && Array.isArray(secondEntry.amount)) {
    if (secondEntry.amount[0] > firstEntry.amount) return secondEntry.id;
    if (firstEntry.amount > secondEntry.amount[1]) return firstEntry.id;
    return -2;
  }
}