import React from "react";
import Import from "./components/Import";
import ImportItem from "./components/ImportItem";
import Export from "./components/Export";
import ExportItem from "./components/ExportItem";
import { useRoutes } from "react-router-dom";
const routes = [
  {
    path: "/Import",
    element: <Import />,
  },
  {
    path: "/ImportItem/:id",
    element: <ImportItem />,
  },
  {
    path: "/Export",
    element: <Export />,
  },
  {
    path: "/ExportItem/:id",
    element: <ExportItem />,
  },
];
function App() {
  const routing = useRoutes(routes);
  return <div className="App">{routing}</div>;
}

export default App;
