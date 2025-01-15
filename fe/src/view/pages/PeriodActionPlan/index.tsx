import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import {
  PeriodActionPlansContext,
  PeriodActionPlansProvider,
} from "./components/PeriodActionPlansContext";
import { PeriodActionPlansContainer } from "./components/PeriodActionPlansContainer";
import { NewPeriodActionPlanModal } from "./components/NewPeriodActionPlanModal";

import { EditPeriodActionPlanModal } from "./components/EditPeriodActionPlanModal";

const PeriodActionPlans = () => {
  return (
    <PeriodActionPlansProvider>
      <PeriodActionPlansContext.Consumer>
        {({ isNewPeriodActionPlanModalOpen, actionPlanBeingSeen }) => (
          <div className="container mx-auto p-6 space-y-8">
            <Card className="overflow-hidden bg-white">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary mix-blend-multiply" />
                <CardHeader className="relative z-10 text-white">
                  <CardTitle className="text-2xl font-bold">Planos de Ação</CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-full sm:w-96">
                      <Input
                        type="text"
                        placeholder="Pesquisar planos de ação"
                        //value={searchTerm}
                        //onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                      />
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                    {/* <Button className="h-10">
                     <PlusCircle className="mr-2 h-4 w-4" />
                     Novo Plano de Ação
                   </Button> */}
                  </div>
                </div>

                <PeriodActionPlansContainer />
                {isNewPeriodActionPlanModalOpen && <NewPeriodActionPlanModal />}
                {actionPlanBeingSeen && <EditPeriodActionPlanModal />}
              </CardContent>
            </Card>
          </div>
        )}
      </PeriodActionPlansContext.Consumer>
    </PeriodActionPlansProvider>
  );
};

export default PeriodActionPlans;
