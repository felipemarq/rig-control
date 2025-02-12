import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import { NotFound } from "@/view/components/NotFound";

import { useWellsDataGrid } from "./useWellDataGrid";
import { formatNumberWithFixedDecimals } from "@/app/utils/formatNumberWithFixedDecimals";

interface WellDataGridProps {
  isDashboard: boolean;
  windowWidth?: number;
  limitPagination?: boolean;
}

export const WellDataGrid = ({
  isDashboard,
  limitPagination = true,
}: WellDataGridProps) => {
  const { data } = useWellsDataGrid();

  const columns: GridColDef[] = [
    {
      field: "wellName",
      headerName: "Poço",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "totalWorkHours",
      headerName: "Hrs Disp.",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {formatNumberWithFixedDecimals(params.value, 2)}Hrs
            </div>
          </div>
        );
      },
    },
    {
      field: "totalRepairHours",
      headerName: "Hrs Reparo.",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {formatNumberWithFixedDecimals(params.value, 2)}Hrs
            </div>
          </div>
        );
      },
    },
    {
      field: "totalGlossHours",
      headerName: "Hrs Glosa.",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {formatNumberWithFixedDecimals(params.value, 2)}Hrs
            </div>
          </div>
        );
      },
    },
    {
      field: "totalDtm",
      headerName: "DTMs",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "totalEquipment",
      headerName: "Mov. Equipamento",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "totalFluid",
      headerName: "Mov. Fluido",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {params.value}
            </div>
          </div>
        );
      },
    },
  ];

  const NotFoundDataGrid = () => {
    return (
      <NotFound>
        <span className="text-gray-800">
          <strong>Não</strong> existem dados no <strong>período</strong>{" "}
          selecionado!
        </span>
      </NotFound>
    );
  };

  return (
    <DataGrid
      rows={data}
      localeText={{
        toolbarFilters: "Filtros",
        toolbarFiltersLabel: "Show filters",
        toolbarDensity: "Densidade",
        toolbarDensityLabel: "Size",
        toolbarDensityCompact: "Compacto",
        toolbarDensityStandard: "Padrão",
        toolbarDensityComfortable: "Confortável",
        headerFilterOperatorContains: "Contém",
        headerFilterOperatorEquals: "Igual a",
        headerFilterOperatorStartsWith: "Começa com",
        headerFilterOperatorEndsWith: "Termina com",
        headerFilterOperatorIs: "É",
        headerFilterOperatorNot: "Não é",
        headerFilterOperatorAfter: "É depois",
        headerFilterOperatorOnOrAfter: "É ou é depois",
        headerFilterOperatorBefore: "É antes",
        headerFilterOperatorOnOrBefore: "É ou é antes",
        headerFilterOperatorIsEmpty: "É vazio",
        headerFilterOperatorIsNotEmpty: "Não é vazio",
        headerFilterOperatorIsAnyOf: "É qualquer um",
        "headerFilterOperator=": "Igual",
        "headerFilterOperator!=": "Diferente",
        "headerFilterOperator>": "Maior que",
        "headerFilterOperator>=": "Maior ou igual a",
        "headerFilterOperator<": "Menor que",
        "headerFilterOperator<=": "Menor ou igual a",
        filterPanelAddFilter: "Add filter",
        filterPanelRemoveAll: "Remove all",
        filterPanelDeleteIconLabel: "Delete",
        filterPanelLogicOperator: "Logic operator",
        filterPanelOperator: "Operador",
        filterPanelOperatorAnd: "And",
        filterPanelOperatorOr: "Or",
        filterPanelColumns: "Colunas",
        filterPanelInputLabel: "Valor",
        filterPanelInputPlaceholder: "Valor de filtro",
        filterOperatorContains: "contém",
        filterOperatorEquals: "igual",
        filterOperatorStartsWith: "começa com",
        filterOperatorEndsWith: "termina com",
        filterOperatorIs: "É",
        filterOperatorNot: "Não é",
        filterOperatorAfter: "É depois",
        filterOperatorOnOrAfter: "É depois ou antes",
        filterOperatorBefore: "É antes",
        filterOperatorOnOrBefore: "É ou é antes",
        filterOperatorIsEmpty: "É vazio",
        filterOperatorIsNotEmpty: "Não é vazio",
        filterOperatorIsAnyOf: "É qualquer um",
        "filterOperator=": "=",
        "filterOperator!=": "!=",
        "filterOperator>": ">",
        "filterOperator>=": ">=",
        "filterOperator<": "<",
        "filterOperator<=": "<=",
      }}
      columns={columns}
      slots={{
        toolbar: isDashboard ? undefined : GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
      initialState={
        limitPagination
          ? {
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }
          : undefined
      }
      pagination
      pageSizeOptions={isDashboard ? [5] : [5, 10, 25, 100]}
      paginationMode="client"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none !important",
        },
        "& .MuiDataGrid-cell": {
          color: "hsl(var(--muted-foreground))",
        },
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: 400,
          color: "hsl(var(--muted-foreground))",
          borderRadius: "var(--none, 0px)",
          borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderLeft:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderRight:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderTop:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          //background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
          alignItems: "space-between !important",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiTablePagination-root": {
          color: "hsl(var(--muted-foreground))",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "hsl(var(--card))",
          padding: 0,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--muted-foreground))",
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: "hsl(var(--muted-foreground)) !important",
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
          color: "hsl(var(--muted-foreground)) !important",
        },
        "& .MuiDataGrid-withBorderColor": {
          border: "none",
        },
      }}
    />
  );
};
