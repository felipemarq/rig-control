import { Button } from "@/components/ui/button";
import {
  ChecklistsContext,
  ChecklistsProvider,
} from "./components/ChecklistsContext";
import { NewChecklistModal } from "./components/modals/NewChecklistModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChecklistsContainer } from "./components/ChecklistsContainer/index.tsx";
import { EditChecklistModal } from "./components/modals/EditChecklistModal/index.tsx";
import { ChecklistModal } from "./components/modals/ChecklistModal/index.tsx";

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>
        {({
          openNewChecklistModal,
          handleChangeSearchTerm,
          searchTerm,
          checklistBeingSeen,
        }) => (
          <div className="container mx-auto p-6 space-y-8">
            <Card className="overflow-hidden bg-white">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary mix-blend-multiply" />
                <CardHeader className="relative z-10 text-white">
                  <CardTitle className="text-2xl font-bold">
                    Checklists
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                  <div className="flex items-center gap-4  w-full justify-between">
                    <div className="relative w-full sm:w-96 ">
                      <Input
                        placeholder="Buscar checklists..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => handleChangeSearchTerm(e)}
                      />
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                    <Button className="h-10" onClick={openNewChecklistModal}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Novo checklist
                    </Button>
                  </div>
                </div>

                <ChecklistsContainer />
                <NewChecklistModal />
                {checklistBeingSeen && <EditChecklistModal />}
                {checklistBeingSeen && <ChecklistModal />}
              </CardContent>
            </Card>
          </div>
        )}
      </ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
