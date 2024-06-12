import type { Store } from "@/store/app.store";
import { Card, CardHighlight, CardTitle } from "../card";
import { calculateCommon } from "@/lib/math";

export function CommonCalculations({ item }: { item: Store["items"][0] }) {
  const results = calculateCommon(item);

  return (
    <div className="grid-cols-2 grid gap-2">
      <Card>
        <CardTitle>Производительность</CardTitle>
        <CardHighlight>
          {results.common.performanceInPiecesPerShift.formatted}
        </CardHighlight>
      </Card>
      <Card>
        <CardTitle>Расчетное время работы</CardTitle>
        <CardHighlight>
          {results.common.estimatedWorkTimeInDays.formatted}
        </CardHighlight>
      </Card>
    </div>
  );
}
