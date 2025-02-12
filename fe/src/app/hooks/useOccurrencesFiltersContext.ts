import { useContext } from "react";

import { OccurrenceFiltersContext } from "../contexts/OccurrenceFiltersContex";

export const useOccurrencesFiltersContext = () => useContext(OccurrenceFiltersContext);
