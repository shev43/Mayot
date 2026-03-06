const ids = {
  area: document.getElementById('area'),
  basePrice: document.getElementById('basePrice'),
  locationFactor: document.getElementById('locationFactor'),
  demandFactor: document.getElementById('demandFactor'),
  investment: document.getElementById('investment'),
  costPerSqm: document.getElementById('costPerSqm'),
  marketingPercent: document.getElementById('marketingPercent'),
  operatingPercent: document.getElementById('operatingPercent'),
  finalSqmPrice: document.getElementById('finalSqmPrice'),
  revenue: document.getElementById('revenue'),
  totalCosts: document.getElementById('totalCosts'),
  profit: document.getElementById('profit'),
  roi: document.getElementById('roi')
};

const money = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0
});

const percent = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

function num(el) {
  return Number(el?.value) || 0;
}

function recalc() {
  const area = num(ids.area);
  const basePrice = num(ids.basePrice);
  const locationFactor = num(ids.locationFactor);
  const demandFactor = num(ids.demandFactor);

  const investment = num(ids.investment);
  const costPerSqm = num(ids.costPerSqm);
  const marketingPercent = num(ids.marketingPercent) / 100;
  const operatingPercent = num(ids.operatingPercent) / 100;

  const finalSqmPrice = basePrice * locationFactor * demandFactor;
  const revenue = area * finalSqmPrice;

  const directCosts = area * costPerSqm;
  const marketingCosts = revenue * marketingPercent;
  const operatingCosts = revenue * operatingPercent;
  const totalCosts = directCosts + marketingCosts + operatingCosts;

  const profit = revenue - totalCosts;
  const roi = investment > 0 ? (profit / investment) * 100 : 0;

  ids.finalSqmPrice.textContent = `${money.format(finalSqmPrice)} / м²`;
  ids.revenue.textContent = money.format(revenue);
  ids.totalCosts.textContent = money.format(totalCosts);
  ids.profit.textContent = money.format(profit);
  ids.roi.textContent = `${percent.format(roi)}%`;
}

Object.values(ids)
  .filter((el) => el instanceof HTMLInputElement)
  .forEach((input) => input.addEventListener('input', recalc));

recalc();
