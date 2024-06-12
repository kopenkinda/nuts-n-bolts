import { useActions, type Store } from "@/store/app.store";
import { LabeledInput } from "../labeled-input";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function SettingsParameters({ item }: { item: Store["items"][number] }) {
  return (
    <AccordionItem value="settings">
      <AccordionTrigger>Исходные данные</AccordionTrigger>
      <AccordionContent>
        <SettingsInput
          label="Цена сырья, р/кг."
          _key="rawMaterialCostPerKilo"
          item={item}
        />
        <SettingsInput
          label="Цена чермет р/кг."
          _key="ferrousMetalCostPerKilo"
          item={item}
        />
        <SettingsInput
          label="Кол-во изделий, шт."
          _key="piecesAmount"
          item={item}
        />
        <SettingsInput
          label="Длина, мм."
          _key="lengthInMillimeters"
          item={item}
        />
        <SettingsInput
          label="Диаметр, мм."
          _key="diameterInMillimeters"
          item={item}
        />
        <SettingsInput
          label="Использ. Материал, мм."
          _key="usedMaterialInMillimeters"
          item={item}
        />
        <SettingsInput
          label="Длина материала, м.п."
          _key="materialLength"
          item={item}
        />
        <SettingsInput
          label="Удельный вес стали"
          _key="specificGravityOfSteel"
          item={item}
        />
        <SettingsInput
          label="Производительность мин/дет"
          _key="performanceInPiecesPerMinute"
          item={item}
        />
        <SettingsInput
          label="Смена, час"
          _key="shiftDurationInHours"
          item={item}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

SettingsParameters.accordionItem = "settings";

function SettingsInput({
  label,
  item,
  _key,
}: {
  label: string;
  item: Store["items"][number];
  _key: keyof Store["items"][number]["settings"];
}) {
  const { patchItemSettings } = useActions();
  return (
    <LabeledInput
      id={_key}
      label={label}
      type="number"
      value={"" + item.settings[_key]}
      onChange={(value) => patchItemSettings(item.id, { [_key]: +value })}
      error={
        Number.isNaN(item.settings[_key]) || item.settings[_key] <= 0
          ? "Введите число > 0"
          : undefined
      }
    />
  );
}
