const createRandomBurger = (ingredients) => {
  const bunData = ingredients.filter((ingredient) => ingredient.type === "bun");
  const bun = bunData[Math.floor(Math.random() * bunData.length)];

  const mainAndSauceData = ingredients.filter(
    (ingredient) => ingredient.type === "main" || ingredient.type === "sauce"
  );
  let fillingArray = [];
  for (
    let i = 0;
    i < 5 + Math.floor(Math.random() * mainAndSauceData.length);
    i++
  ) {
    fillingArray.push(
      mainAndSauceData[Math.floor(Math.random() * mainAndSauceData.length)]
    );
  }
  return { bun: bun, filling: fillingArray };
};

export default createRandomBurger;
