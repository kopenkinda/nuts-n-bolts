import {
  createFakeItem,
  useActions,
  useItems,
  useSelected,
  type Store,
} from "@/store/app.store";
import { ListIcon, PlusIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMemo } from "react";

export const TabNavigation = () => {
  const selected = useSelected();
  const items = useItems();
  const { setSelected, addItem } = useActions();
  const sorted = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );
  return (
    <nav className="fixed bottom-0 max-h-10 border-t w-full overflow-x-auto flex items-center bg-background">
      <div className="sticky left-0 z-10 bg-background flex items-center border-r">
        <ModeToggle />
        <ListView
          items={sorted}
          selected={selected}
          setSelected={setSelected}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const _id = addItem(createFakeItem());
            setSelected(_id);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      {sorted.map((item) => (
        <Button
          key={item.id}
          variant={selected === item.id ? "default" : "ghost"}
          onClick={() => setSelected(item.id)}
        >
          {item.name}
        </Button>
      ))}
    </nav>
  );
};

const ListView = ({
  items,
  selected,
  setSelected,
}: {
  items: Store["items"];
  selected: Store["selected"];
  setSelected: Store["actions"]["setSelected"];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" disabled={items.length === 0}>
          <ListIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          value={selected || undefined}
          onValueChange={setSelected}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem value={item.id} key={item.id}>
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
