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
        <CardHighlight>{results.financials.VATinCurrency}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Наша цена без НДС</CardTitle>
        <CardHighlight>{results.financials.priceWithoutVAT}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Приход на счет</CardTitle>
        <CardHighlight>{results.financials.estimatedProfit}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Расходы</CardTitle>
        <CardHighlight>{results.financials.expenses}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Развитие</CardTitle>
        <CardHighlight>{results.financials.evolution}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Дельта</CardTitle>
        <CardHighlight>{results.financials.delta}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Налог к оплате</CardTitle>
        <CardHighlight>{results.financials.taxes}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Теория дохода</CardTitle>
        <CardHighlight>{results.financials.profitProjection}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Рентабельность</CardTitle>
        <CardHighlight>{results.financials.rentabilityInPercent}</CardHighlight>
      </Card>
      <Card>
        <CardTitle>Расходы</CardTitle>
        <CardHighlight>{results.financials.exensesInPercent}</CardHighlight>
      </Card>
    </div>
  );
}
