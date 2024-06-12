import type { Store } from "@/store/app.store";
import { Card, CardHighlight, CardTitle } from "../card";
import { calculateCommon } from "@/lib/math";

export function FinancialCalculations({
  item,
}: {
  item: Store["items"][number];
}) {
  const results = calculateCommon(item);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      <Card>
        <CardTitle>НДС, 20%</CardTitle>
        <CardHighlight>
          {results.financials.VATinCurrency.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Наша цена без НДС</CardTitle>
        <CardHighlight>
          {results.financials.priceWithoutVAT.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Приход на счет</CardTitle>
        <CardHighlight>
          {results.financials.estimatedProfit.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Расходы</CardTitle>
        <CardHighlight>{results.financials.expenses.formatted}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Развитие</CardTitle>
        <CardHighlight>{results.financials.evolution.formatted}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Дельта</CardTitle>
        <CardHighlight>{results.financials.delta.formatted}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Налог к оплате</CardTitle>
        <CardHighlight>{results.financials.taxes.formatted}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Теория дохода</CardTitle>
        <CardHighlight>
          {results.financials.profitProjection.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Рентабельность</CardTitle>
        <CardHighlight>
          {results.financials.rentabilityInPercent.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Расходы</CardTitle>
        <CardHighlight>
          {results.financials.exensesInPercent.formatted}
        </CardHighlight>
      </Card>
    </div>
  );
}
