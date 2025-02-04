import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { NotFound } from "@/view/components/NotFound";
import { TransformedManHoursData } from "@/app/utils/transformManHoursData";

interface ListDataGridProps {
  data: TransformedManHoursData[];
  isDashboard: boolean;
  windowWidth?: number;
  limitPagination?: boolean;
  onUpdateCell(id: string, month: string, value: string): void;
  isLoading?: boolean;
}

export const ManHoursDataGrid = ({
  data,
  isDashboard,
  onUpdateCell,
  isLoading,
}: ListDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "baseName",
      headerName: "Contrato",
      headerAlign: "center",
      flex: 0.6,
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
      field: "Janeiro",
      headerName: "Janeiro",
      headerAlign: "center",
      editable: true,

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
      field: "Fevereiro",
      headerName: "Fevereiro",
      headerAlign: "center",
      editable: true,
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
      field: "Março",
      headerName: "Março",
      headerAlign: "center",
      editable: true,
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
      field: "Abril",
      headerName: "Abril",
      headerAlign: "center",
      editable: true,
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
      field: "Maio",
      headerName: "Maio",
      headerAlign: "center",
      editable: true,
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
      field: "Junho",
      headerName: "Junho",
      headerAlign: "center",
      editable: true,
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
      field: "Julho",
      headerName: "Julho",
      headerAlign: "center",
      editable: true,
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
      field: "Agosto",
      headerName: "Agosto",
      headerAlign: "center",
      editable: true,
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
      field: "Setembro",
      headerName: "Setembro",
      headerAlign: "center",
      editable: true,
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
      field: "Outubro",
      headerName: "Outubro",
      headerAlign: "center",
      editable: true,
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
      field: "Novembro",
      headerName: "Novembro",
      headerAlign: "center",
      editable: true,
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
      field: "Dezembro",
      headerName: "Dezembro",
      headerAlign: "center",
      editable: true,
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
          <strong>Não</strong> existem dados para a <strong>sonda</strong> no{" "}
          <strong>período</strong> selecionado!
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
        // toolbar: isDashboard ? undefined : GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
      onCellEditStop={(params, event) =>
        //@ts-ignore
        onUpdateCell(params.id, params.field, event.target.value)
      }
      loading={isLoading}
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
          borderLeft: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderRight: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderTop: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
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
