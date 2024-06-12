import { CommonResults, calculateCommon } from "@/lib/math";
import type { Store } from "@/store/app.store";
import { Card, CardHighlight, CardTitle } from "../card";

const materials: Record<keyof CommonResults["materials"], string> = {
  specificGravity: "Удельный вес",
  pieceWeightInKilograms: "Вес изделия",
  totalWeightInKilograms: "Общий вес",
  amountOfPiecesFromOneSheet: "Кол-во изд. из хлыста",
  sheetsAmount: "Кол-во хлыстов",
  specificGravityOfSheet: "Уд. вес хлыста",
  totalWeightOfSheetInKilograms: "Общий вес хлыстов",
  cutoff: "Обрезок",
  cutoffWeight: "Вес обрезка",
  totalCutoffWeight: "Общий вес обрезков",
  shavings: "Стружка",
};

export function MaterialsCalculations({
  item,
}: {
  item: Store["items"][number];
}) {
  const results = calculateCommon(item);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {Object.entries(materials).map(([key, title]) => (
        <Card key={key}>
          <CardTitle>{title}</CardTitle>
          <CardHighlight>
            {
              results.materials[key as keyof CommonResults["materials"]]
                .formatted
            }
          </CardHighlight>
        </Card>
      ))}
    </div>
  );
}
