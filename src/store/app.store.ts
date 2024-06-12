import { id } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CommonItemInfo<
  TType,
  TSettingsExtension extends object = object,
  TFinancialsExtension extends object = object,
  TExpendiureExtension extends object = object
> = {
  id: string;
  name: string;
  imported: boolean;
  type: TType;
  settings: TSettingsExtension & {
    // Цена сырья, р/кг.
    rawMaterialCostPerKilo: number;
    //Цена чермет р/кг.
    ferrousMetalCostPerKilo: number;
    //Кол-во изделий, шт.
    piecesAmount: number;
    //Длина, мм.
    lengthInMillimeters: number;
    //Диаметр, мм.
    diameterInMillimeters: number;
    //Использ. Материал, мм.
    usedMaterialInMillimeters: number;
    //Длина материала, м.п.
    materialLength: number;
    //Удельный вес стали
    specificGravityOfSteel: number;
    //Производительность мин/дет
    performanceInPiecesPerMinute: number;
    //Смена, час
    shiftDurationInHours: number;
  };
  financials: TFinancialsExtension & {
    // Входная цена с НДС
    price: number;
    // Налог ИП %
    selfEmployedTax: number;
  };
  expenditure: TExpendiureExtension & {
    //Аренда станка	день
    machineRentCostPerDay: number;
    //Электричество	кВт/ч
    electricityCostPerKWTHour: number;
    //Работа оператора	день
    operatorSalaryPerDay: number;
    //Работа директора	день
    directSalaryPerDay: number;
    //Аренда помещения	день
    rentCostPerDay: number;
    //Расходные материалы	шт
    materialCostPerPiece: number;
    //Доставка до цеха	шт
    deliveryAmount: number;
    deliveryCost: number;
    //Разгрузка/погрузка	шт
    loadingAmount: number;
    loadingCost: number;
    // Упаковка	шт
    packagingCostPerPiece: number;
  };
};

type ItemType =
  | CommonItemInfo<"bolt">
  | CommonItemInfo<"nut">
  | CommonItemInfo<"pin">;

type ItemFromType<TType extends ItemType["type"]> = Extract<
  ItemType,
  { type: TType }
>;

type StrippedItem = Omit<ItemType, "imported" | "id">;

export type Store = {
  selected: ItemType["id"] | null;
  items: ItemType[];
  actions: {
    setSelected: (id: ItemType["id"] | null, force?: boolean) => void;
    patchItemSettings: <T extends ItemType["type"] = ItemType["type"]>(
      id: ItemType["id"],
      patch: Partial<ItemFromType<T>["settings"]>
    ) => void;
    patchItemFinancials: <T extends ItemType["type"] = ItemType["type"]>(
      id: ItemType["id"],
      patch: Partial<ItemFromType<T>["financials"]>
    ) => void;
    patchItemExpenditure: <T extends ItemType["type"] = ItemType["type"]>(
      id: ItemType["id"],
      patch: Partial<ItemFromType<T>["expenditure"]>
    ) => void;
    patchItemName: (id: ItemType["id"], name: string) => void;
    patchItemType: (id: ItemType["id"], type: ItemType["type"]) => void;
    addItem: (item: StrippedItem, imported?: boolean) => ItemType["id"];
    deleteItem: (id: string) => void;
  };
};

const store = create(
  persist<Store>(
    (set) => ({
      selected: null,
      actions: {
        setSelected(id, force) {
          set((draft) => {
            if (draft.selected === id) {
              return { selected: null };
            }
            if (draft.items.some((item) => item.id === id) || force === true) {
              console.log("Setting selected to", id);
              return { selected: id };
            }
            return {};
          });
        },
        patchItemName(id, name) {
          set((draft) => ({
            items: draft.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    name,
                  }
                : item
            ),
          }));
        },
        patchItemType(id, type) {
          set((draft) => ({
            items: draft.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    type,
                  }
                : item
            ),
          }));
        },
        patchItemSettings(id, patch) {
          set((draft) => ({
            items: draft.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    settings: {
                      ...item.settings,
                      ...patch,
                    },
                  }
                : item
            ),
          }));
        },
        patchItemFinancials(id, patch) {
          set((draft) => ({
            items: draft.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    financials: {
                      ...item.financials,
                      ...patch,
                    },
                  }
                : item
            ),
          }));
        },
        patchItemExpenditure(id, patch) {
          set((draft) => ({
            items: draft.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    expenditure: {
                      ...item.expenditure,
                      ...patch,
                    },
                  }
                : item
            ),
          }));
        },
        addItem(item, imported = false) {
          const _id = id();
          set((draft) => ({
            items: [...draft.items, { ...item, imported, id: _id }],
          }));
          return _id;
        },
        deleteItem(id) {
          set((draft) => ({
            items: draft.items.filter((item) => item.id !== id),
          }));
        },
      },
      items: [],
    }),
    {
      name: "app-items",
      version: 1,
      partialize(state) {
        return {
          ...state,
          actions: undefined as never as Store["actions"],
        };
      },
    }
  )
);

export const useSelected = () => store((draft) => draft.selected);
export const useItems = () => store((draft) => draft.items);
export const useActions = () => store((draft) => draft.actions);

export function createFakeItem(imported = false): ItemType {
  const _id = id();
  return {
    id: _id,
    type: "bolt",
    imported,
    name: `Fake item #${_id}`,
    settings: {
      // Цена сырья, р/кг.
      rawMaterialCostPerKilo: 170,
      //Цена чермет р/кг.
      ferrousMetalCostPerKilo: 20,
      //Кол-во изделий, шт.
      piecesAmount: 5000,
      //Длина, мм.
      lengthInMillimeters: 48,
      //Диаметр, мм.
      diameterInMillimeters: 10,
      //Использ. Материал, мм.
      usedMaterialInMillimeters: 12,
      //Длина материала, м.п.
      materialLength: 6,
      //Удельный вес стали
      specificGravityOfSteel: 0.00785,
      //Производительность мин/дет
      performanceInPiecesPerMinute: 1.5,
      //Смена, час
      shiftDurationInHours: 9,
    },
    expenditure: {
      //Аренда станка	день
      machineRentCostPerDay: 15000,
      //Электричество	кВт/ч
      electricityCostPerKWTHour: 6,
      //Работа оператора	день
      operatorSalaryPerDay: 3000,
      //Работа директора	день
      directSalaryPerDay: 3000,
      //Аренда помещения	день
      rentCostPerDay: 1000,
      //Расходные материалы	шт
      materialCostPerPiece: 1,
      //Доставка до цеха	шт
      deliveryAmount: 1,
      deliveryCost: 4000,
      //Разгрузка/погрузка	шт
      loadingAmount: 1,
      loadingCost: 4000,
      // Упаковка	шт
      packagingCostPerPiece: 15,
    },
    financials: {
      price: 100,
      selfEmployedTax: 5,
    },
  };
}
