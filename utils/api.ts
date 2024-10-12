export async function fetchItems() {
  try {
    const responseItem = await fetch("/api/items");
    if (!responseItem.ok) {
      throw new Error();
    }
    const dataItem = await responseItem.json();
    return dataItem;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCurrency() {
  try {
    const responseCurr = await fetch("/api/currencies");
    if (!responseCurr.ok) {
      throw new Error();
    }
    const dataCurr = await responseCurr.json();
    return dataCurr;
  } catch (err) {
    console.log(err);
  }
}
