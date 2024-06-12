import type { Store } from "@/store/app.store";

const EVOLUTION_COEFFICIENT = 0.4;

export const calculateCommon = (item: Store["items"][number]) => {
  // common
  const performanceInPiecesPerShift =
    (60 / item.settings.performanceInPiecesPerMinute) *
    item.settings.shiftDurationInHours;
  const estimatedWorkTimeInDays = Math.round(
    item.settings.piecesAmount / performanceInPiecesPerShift
  );

  // Expenditure
  const machineRentCost =
    estimatedWorkTimeInDays * item.expenditure.machineRentCostPerDay;
  const electricityAmount =
    item.settings.shiftDurationInHours * estimatedWorkTimeInDays * 1.5;
  const electricityCost =
    electricityAmount * item.expenditure.electricityCostPerKWTHour;
  const operatorCost =
    estimatedWorkTimeInDays * item.expenditure.operatorSalaryPerDay;
  const directorCost =
    estimatedWorkTimeInDays * item.expenditure.directSalaryPerDay;
  const rentCost = estimatedWorkTimeInDays * item.expenditure.rentCostPerDay;
  const materialsCost =
    item.settings.piecesAmount * item.expenditure.materialCostPerPiece;
  const deliveryCostFinal =
    item.expenditure.deliveryCost * item.expenditure.deliveryAmount;
  const loadingCostFinal =
    item.expenditure.loadingCost * item.expenditure.loadingAmount;
  const packagingAmount = Math.round(item.settings.piecesAmount / 10);
  const packagingCost =
    packagingAmount * item.expenditure.packagingCostPerPiece;

  // financials
  const VATinCurrency = (item.financials.price / 1.2) * 0.2;
  const priceWithoutVAT = item.financials.price - VATinCurrency;
  const estimatedProfit = item.settings.piecesAmount * priceWithoutVAT;
  const expenses = [
    machineRentCost,
    electricityCost,
    operatorCost,
    directorCost,
    rentCost,
    materialsCost,
    deliveryCostFinal,
    loadingCostFinal,
    packagingCost,
  ].reduce((acc, item) => acc + item, 0);
  const evolution = expenses * EVOLUTION_COEFFICIENT;
  const delta = estimatedProfit - expenses - evolution;
  const taxes = delta * (item.financials.selfEmployedTax / 100);
  const profitProjection = delta - taxes;
  const rentabilityInPercent = profitProjection / estimatedProfit;
  const exensesInPercent = expenses / estimatedProfit;

  // Materials

  return {
    common: {
      performanceInPiecesPerShift: amount(
        performanceInPiecesPerShift,
        "дет/смена"
      ),
      estimatedWorkTimeInDays: amount(estimatedWorkTimeInDays, "дней"),
    },
    financials: {
      VATinCurrency: cost(VATinCurrency),
      priceWithoutVAT: cost(priceWithoutVAT),
      estimatedProfit: cost(estimatedProfit),
      expenses: cost(expenses),
      evolution: cost(evolution),
      delta: cost(delta),
      taxes: cost(taxes),
      profitProjection: cost(profitProjection),
      rentabilityInPercent: percent(rentabilityInPercent),
      exensesInPercent: percent(exensesInPercent),
    },
    expenditure: {
      machine: {
        amount: amount(estimatedWorkTimeInDays, "дней"),
        cost: cost(machineRentCost),
      },
      electricity: {
        amount: amount(electricityAmount, "кВт/ч"),
        cost: cost(electricityCost),
      },
      operator: {
        amount: amount(estimatedWorkTimeInDays, "дней"),
        cost: cost(operatorCost),
      },
      director: {
        amount: amount(estimatedWorkTimeInDays, "дней"),
        cost: cost(directorCost),
      },
      rent: {
        amount: amount(estimatedWorkTimeInDays, "дней"),
        cost: cost(rentCost),
      },
      materials: {
        amount: amount(item.settings.piecesAmount, "шт"),
        cost: cost(materialsCost),
      },
      deliveryCostFinal: cost(deliveryCostFinal),
      loadingCostFinal: cost(loadingCostFinal),
      packaging: {
        amount: amount(packagingAmount, "шт"),
        cost: cost(packagingCost),
      },
    },
    materials: {},
  };
};

export function amount(num: number, unit: string) {
  return num.toFixed(0) + " " + unit;
}

const costFormatter = Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
});

export function cost(num: number) {
  return costFormatter.format(num);
}

export function percent(num: number) {
  return (num * 100).toFixed(2) + " %";
}

export type CommonResults = ReturnType<typeof calculateCommon>;
