const money = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0
});

const percent = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

const refs = {
  area: document.getElementById('rArea'),
  price: document.getElementById('rPrice'),
  cost: document.getElementById('rCost'),
  investment: document.getElementById('rInvestment'),
  table: document.getElementById('scenarioTable')
};

const scenarios = [
  { name: 'Консервативний', priceFactor: 0.93, costFactor: 1.08, demandFactor: 0.9 },
  { name: 'Базовий', priceFactor: 1.0, costFactor: 1.0, demandFactor: 1.0 },
  { name: 'Оптимістичний', priceFactor: 1.08, costFactor: 0.94, demandFactor: 1.12 }
];

function num(input) {
  return Number(input.value) || 0;
}

function calcScenario(scenario, area, basePrice, baseCost, investment) {
  const price = basePrice * scenario.priceFactor;
  const revenue = area * price * scenario.demandFactor;
  const costs = area * baseCost * scenario.costFactor + revenue * 0.18;
  const profit = revenue - costs;
  const roi = investment > 0 ? (profit / investment) * 100 : 0;

  return { scenario, revenue, costs, profit, roi };
}

function render() {
  const area = num(refs.area);
  const basePrice = num(refs.price);
  const baseCost = num(refs.cost);
  const investment = num(refs.investment);

  const rows = scenarios
    .map((scenario) => calcScenario(scenario, area, basePrice, baseCost, investment))
    .map(
      ({ scenario, revenue, costs, profit, roi }) => `
        <tr>
          <td>${scenario.name}</td>
          <td>${money.format(revenue)}</td>
          <td>${money.format(costs)}</td>
          <td>${money.format(profit)}</td>
          <td>${percent.format(roi)}%</td>
        </tr>
      `
    )
    .join('');

  refs.table.innerHTML = rows;
}

Object.values(refs)
  .filter((el) => el instanceof HTMLInputElement)
  .forEach((input) => input.addEventListener('input', render));

render();
