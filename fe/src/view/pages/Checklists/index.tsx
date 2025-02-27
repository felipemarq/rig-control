import { ChecklistsContext, ChecklistsProvider } from "./components/ChecklistsContext";

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>{() => <h1>Checklists</h1>}</ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
