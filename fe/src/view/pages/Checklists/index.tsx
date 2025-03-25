import { Button } from "@/components/ui/button";
import {
  ChecklistsContext,
  ChecklistsProvider,
} from "./components/ChecklistsContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChecklistsContainer } from "./components/ChecklistsContainer/index.tsx";
import { NewChecklistModal } from "./components/modals/NewChecklistModal/index.tsx";
import { EditChecklistModal } from "./components/modals/EditChecklistModal/index.tsx";
import { ChecklistModal } from "./components/modals/ChecklistModal/index.tsx";
import { Header } from "@/view/components/Header.tsx";
import { StatboxContainer } from "./components/StatboxContainer/index.tsx";
import { BarChartByType } from "./components/BarChartByType/index.tsx";

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>
        {({}) => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Inspeções de campo do SGI"
            >
              <div className="flex gap-2 items-center">
                {/*   <OccurrenceFiltersSheet /> */}
              </div>
            </Header>

            <div>
              <StatboxContainer />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
                <BarChartByType />
                <ChecklistsContainer />
              </div>
            </div>
          </div>
        )}
      </ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
