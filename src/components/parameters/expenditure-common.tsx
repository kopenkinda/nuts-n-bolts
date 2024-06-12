import { Store, useActions } from "@/store/app.store";
import { LabeledInput } from "../labeled-input";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

export function ExpenditureParameters({
  item,
}: {
  item: Store["items"][number];
}) {
  return (
    <AccordionItem value="expenditure">
      <AccordionTrigger>Расходная часть</AccordionTrigger>
      <AccordionContent>
        <ExpenditureInput
          label="Аренда станка (Цена/день)"
          _key="machineRentCostPerDay"
          item={item}
        />
        <ExpenditureInput
          label="Электричество (Цена/кВт/ч)"
          _key="electricityCostPerKWTHour"
          item={item}
        />
        <ExpenditureInput
          label="Работа оператора (Цена/день)"
          _key="operatorSalaryPerDay"
          item={item}
        />
        <ExpenditureInput
          label="Работа директора (Цена/день)"
          _key="directSalaryPerDay"
          item={item}
        />
        <ExpenditureInput
          label="Аренда помещения (Цена/день)"
          _key="rentCostPerDay"
          item={item}
        />
        <ExpenditureInput
          label="Расходные материалы (Цена/шт)"
          _key="materialCostPerPiece"
          item={item}
        />
        <ExpenditureInput
          label="Доставка до цеха (Кол-во/шт)"
          _key="deliveryAmount"
          item={item}
        />
        <ExpenditureInput
          label="Доставка до цеха (Цена/шт)"
          _key="deliveryCost"
          item={item}
        />
        <ExpenditureInput
          label="Разгрузка/погрузка (Кол-во/шт)"
          _key="loadingAmount"
          item={item}
        />
        <ExpenditureInput
          label="Разгрузка/погрузка (Цена/шт)"
          _key="loadingCost"
          item={item}
        />
        <ExpenditureInput
          label="Упаковка (Цена/шт)"
          _key="packagingCostPerPiece"
          item={item}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

ExpenditureParameters.accordionItem = "expenditure";

function ExpenditureInput({
  label,
  item,
  _key,
}: {
  label: string;
  item: Store["items"][number];
  _key: keyof Store["items"][number]["expenditure"];
}) {
  const { patchItemExpenditure } = useActions();
  return (
    <LabeledInput
      id={_key}
      label={label}
      type="number"
      value={"" + item.expenditure[_key]}
      onChange={(value) => patchItemExpenditure(item.id, { [_key]: +value })}
      error={
        Number.isNaN(item.expenditure[_key]) || item.expenditure[_key] <= 0
          ? "Введите число > 0"
          : undefined
      }
    />
  );
}
