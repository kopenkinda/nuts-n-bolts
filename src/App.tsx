import { useEffect } from "react";
import { ItemViewer } from "./components/item-viewer";
import { TabNavigation } from "./components/tab-navigation";
import { ThemeProvider } from "./components/theme-provider";
import { Store, useActions } from "./store/app.store";

function App() {
  const { addItem, setSelected } = useActions();

  useEffect(() => {
    const url = new URL(window.location as never as string);
    const itemString = url.searchParams.get("item");
    if (url.searchParams.size > 0) {
      url.search = "";
      window.history.replaceState(null, "", url);
    }
    if (itemString) {
      const parsedItem = JSON.parse(itemString) as Store["items"][number];
      if ("id" in parsedItem) {
        const _id = addItem(parsedItem, true);
        setSelected(_id, true);
      }
    }
  }, [addItem, setSelected]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ItemViewer />
      <TabNavigation />
    </ThemeProvider>
  );
}

export default App;
