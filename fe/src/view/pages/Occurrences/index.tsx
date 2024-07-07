import { Button } from "@/view/components/Button";
import {
  OccurrencesContext,
  OccurrencesProvider,
} from "./components/OccurrencesContext";
import { NewOccurrenceModal } from "./components/modals/NewOccurrenceModal";

export const Occurrences = () => {
  return (
    <OccurrencesProvider>
      <OccurrencesContext.Consumer>
        {({ occurrences, openNewOccurrenceModal }) => (
          <div>
            <Button onClick={openNewOccurrenceModal}>Open Modal</Button>
            <div>
              {occurrences.map(({ id }) => (
                <div>{id}</div>
              ))}
            </div>
            <NewOccurrenceModal />
          </div>
        )}
      </OccurrencesContext.Consumer>
    </OccurrencesProvider>
  );
};
