import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useActions, type Store } from "@/store/app.store";
import { LabeledInput } from "../labeled-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export function CommonParameters({ item }: { item: Store["items"][number] }) {
  const { patchItemName, patchItemType } = useActions();
  return (
    <AccordionItem value="common">
      <AccordionTrigger>Общая часть</AccordionTrigger>
      <AccordionContent>
        <LabeledInput
          id="name"
          label="Название"
          onChange={(value) => patchItemName(item.id, value)}
          value={item.name}
          error={
            item.name.trim() === ""
              ? "Название не может быть пустым"
              : undefined
          }
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="item-type">Тип предмета</Label>
          <Select
            value={item.type}
            onValueChange={(v: typeof item.type) => {
              patchItemType(item.id, v);
            }}
          >
            <SelectTrigger id="item-type">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bolt">Болт</SelectItem>
              <SelectItem value="nut">Гайка</SelectItem>
              <SelectItem value="pin">Шпилька</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

CommonParameters.accordionItem = "common";
