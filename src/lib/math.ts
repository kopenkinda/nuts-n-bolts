import type { Store } from "@/store/app.store";
import { format } from "@/lib/utils";

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
      performanceInPiecesPerShift: format.amount(
        performanceInPiecesPerShift,
        "дет/смена"
      ),
      estimatedWorkTimeInDays: format.amount(estimatedWorkTimeInDays, "дней"),
    },
    financials: {
      VATinCurrency: format.cost(VATinCurrency),
      priceWithoutVAT: format.cost(priceWithoutVAT),
      estimatedProfit: format.cost(estimatedProfit),
      expenses: format.cost(expenses),
      evolution: format.cost(evolution),
      delta: format.cost(delta),
      taxes: format.cost(taxes),
      profitProjection: format.cost(profitProjection),
      rentabilityInPercent: format.percent(rentabilityInPercent),
      exensesInPercent: format.percent(exensesInPercent),
    },
    expenditure: {
      machine: {
        amount: format.amount(estimatedWorkTimeInDays, "дней"),
        cost: format.cost(machineRentCost),
      },
      electricity: {
        amount: format.amount(electricityAmount, "кВт/ч"),
        cost: format.cost(electricityCost),
      },
      operator: {
        amount: format.amount(estimatedWorkTimeInDays, "дней"),
        cost: format.cost(operatorCost),
      },
      director: {
        amount: format.amount(estimatedWorkTimeInDays, "дней"),
        cost: format.cost(directorCost),
      },
      rent: {
        amount: format.amount(estimatedWorkTimeInDays, "дней"),
        cost: format.cost(rentCost),
      },
      materials: {
        amount: format.amount(item.settings.piecesAmount, "шт"),
        cost: format.cost(materialsCost),
      },
      deliveryCostFinal: format.cost(deliveryCostFinal),
      loadingCostFinal: format.cost(loadingCostFinal),
      packaging: {
        amount: format.amount(packagingAmount, "шт"),
        cost: format.cost(packagingCost),
      },
    },
    materials: {},
  };
};

export type CommonResults = ReturnType<typeof calculateCommon>;
