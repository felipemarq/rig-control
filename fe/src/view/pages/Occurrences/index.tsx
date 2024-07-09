import { Button } from "@/view/components/Button";
import {
  OccurrencesContext,
  OccurrencesProvider,
} from "./components/OccurrencesContext";
import { NewOccurrenceModal } from "./components/modals/NewOccurrenceModal";
import { Header } from "@/view/components/Header";
import { OccurrencesContainer } from "./components/OccurrencesContainer";

export const Occurrences = () => {
  return (
    <OccurrencesProvider>
      <OccurrencesContext.Consumer>
        {({ openNewOccurrenceModal }) => (
          <div className="w-full h-full overflow-y-auto">
            <Header
              className="mt-4"
              title="Segurança"
              displayRig={false}
              displayPeriodRange={false}
            >
              <Button
                onClick={openNewOccurrenceModal}
                className="rounded-md  w-56"
              >
                Novo registro
              </Button>
            </Header>

            <OccurrencesContainer />

            <NewOccurrenceModal />
          </div>
        )}
      </OccurrencesContext.Consumer>
    </OccurrencesProvider>
  );
};
