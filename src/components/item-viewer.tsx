import { Store, useActions, useItems, useSelected } from "@/store/app.store";
import { Trash2Icon } from "lucide-react";
import { Card, CardTitle } from "./card";
import { EmptyState } from "./empty-state";
import { CommonParameters } from "./parameters/common";
import { ExpenditureParameters } from "./parameters/expenditure-common";
import { FinancialParameters } from "./parameters/financial-common";
import { SettingsParameters } from "./parameters/settings-common";
import { ShareItemButton } from "./share-button";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { CommonCalculations } from "./calculations/common";
import { FinancialCalculations } from "./calculations/financial-common";

export const ItemViewer = () => {
  const selected = useSelected();
  const items = useItems();
  const selectedItem = items.find((item) => item.id === selected);
  const { deleteItem, setSelected } = useActions();

  if (selectedItem == null) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-12 p-2 gap-2">
      <Card className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
        <CardTitle>Настройки</CardTitle>
        <ItemParameters item={selectedItem} />
      </Card>
      <div className="col-span-12 md:col-span-8 lg:col-span-9 relative">
        <div className="sticky top-2 flex flex-col gap-2">
          <Card className="flex gap-2 items-center">
            <span className="text-lg">{selectedItem.name}</span>
            {selectedItem.imported && (
              <span className="bg-foreground text-background p-0.5 text-xs leading-none">
                Импортирован
              </span>
            )}
            <ShareItemButton item={selectedItem} className="ml-auto" />
            <Button
              size="icon"
              variant="destructive"
              onClick={() => {
                const confirm = window.confirm(
                  "Вы уверены, что хотите удалить этот элемент?"
                );
                if (!confirm) {
                  return;
                }
                deleteItem(selectedItem.id);
                setSelected(null);
              }}
            >
              <Trash2Icon />
            </Button>
          </Card>
          <span className="text-lg mt-6">Общее</span>
          <CommonCalculations item={selectedItem} />
          <span className="text-lg mt-6">Финансы</span>
          <FinancialCalculations item={selectedItem} />
          <span className="text-lg mt-6">Материалы</span>
          <span className="text-lg mt-6">Расходы</span>
        </div>
      </div>
    </div>
  );
};

function ItemParameters({ item }: { item: Store["items"][number] }) {
  return (
    <Accordion type="multiple" defaultValue={[CommonParameters.accordionItem]}>
      <CommonParameters item={item} />
      <SettingsParameters item={item} />
      <FinancialParameters item={item} />
      <ExpenditureParameters item={item} />
    </Accordion>
  );
}
