import { Button } from "@/components/ui/button";
import { ChecklistsContext, ChecklistsProvider } from "./components/ChecklistsContext";
import { NewChecklistModal } from "./components/modals/NewChecklistModal";

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>
        {({ openNewChecklistModal }) => (
          <div>
            <h1>Checklists</h1>
            <Button onClick={openNewChecklistModal}>Open</Button>
            <NewChecklistModal />
          </div>
        )}
      </ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
