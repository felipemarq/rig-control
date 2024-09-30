import { Button } from "@/view/components/Button";
import { OccurrencesContext, OccurrencesProvider } from "./components/OccurrencesContext";
import { NewOccurrenceModal } from "./components/modals/NewOccurrenceModal";
import { Header } from "@/view/components/Header";
import { OccurrencesContainer } from "./components/OccurrencesContainer";
import { EditOccurrenceModal } from "./components/modals/EditOccurrenceModal";
import { NewOccurrenceActionModal } from "./components/modals/NewOccurrenceActionModal";

const Occurrences = () => {
  return (
    <OccurrencesProvider>
      <OccurrencesContext.Consumer>
        {({ openNewOccurrenceModal, occurrenceBeingSeen }) => (
          <div className="w-full h-full overflow-y-auto">
            <Header
              className="mt-4"
              title="Segurança"
              displayRig={false}
              displayPeriodRange={false}
            >
              <Button onClick={openNewOccurrenceModal} className="rounded-md  w-56">
                Nova ocorrência
              </Button>
            </Header>

            <OccurrencesContainer />

            <NewOccurrenceModal />

            <NewOccurrenceActionModal />

            {occurrenceBeingSeen && <EditOccurrenceModal />}
          </div>
        )}
      </OccurrencesContext.Consumer>
    </OccurrencesProvider>
  );
};

export default Occurrences;
