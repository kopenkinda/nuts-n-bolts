import { useActions, type Store } from "@/store/app.store";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LabeledInput } from "../labeled-input";

export function FinancialParameters({
  item,
}: {
  item: Store["items"][number];
}) {
  return (
    <AccordionItem value="financial">
      <AccordionTrigger>Расчетная часть</AccordionTrigger>
      <AccordionContent>
        <FinancialInput label="Входная цена с НДС" _key="price" item={item} />
        <FinancialInput label="Налог ИП" _key="selfEmployedTax" item={item} />
      </AccordionContent>
    </AccordionItem>
  );
}

FinancialParameters.accordionItem = "financial";

function FinancialInput({
  label,
  item,
  _key,
}: {
  label: string;
  item: Store["items"][number];
  _key: keyof Store["items"][number]["financials"];
}) {
  const { patchItemFinancials } = useActions();
  return (
    <LabeledInput
      id={_key}
      label={label}
      type="number"
      value={"" + item.financials[_key]}
      onChange={(value) => patchItemFinancials(item.id, { [_key]: +value })}
      error={
        Number.isNaN(item.financials[_key]) || item.financials[_key] <= 0
          ? "Введите число > 0"
          : undefined
      }
    />
  );
}
