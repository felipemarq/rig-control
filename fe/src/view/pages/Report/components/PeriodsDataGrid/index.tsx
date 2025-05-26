import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { NotFound } from "../../../../components/NotFound";
import { translateType } from "../../../../../app/utils/translateType";
import { translateClassification } from "../../../../../app/utils/translateClassification";
import { Period } from "../../../../../app/entities/Period";
import { formatDate } from "../../../../../app/utils/formatDate";
import { localeTextDataGridConfig } from "../../../../../app/utils/localeTextDataGridConfig";
import { GetByPeriodTypeFilters } from "../../../../../app/services/periodsService/getByPeriodType";
import { translateRepairClassification } from "../../../../../app/utils/translateRepairClassification";
import { getDiffInMinutes } from "@/app/utils/getDiffInMinutes";
import { parse } from "date-fns";
import { PeriodType } from "@/app/entities/PeriodType";

interface ListPeriodsDataGridProps {
  periods: Array<Period>;
  totalItems: number;
  filters: GetByPeriodTypeFilters;
  isLoading: boolean;
  onPaginationModelChange(model: GridPaginationModel): void;
}

export const PeriodsDataGrid = ({
  periods,
  totalItems,
  filters,
  onPaginationModelChange,
  isLoading,
}: ListPeriodsDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Sonda",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {params.row.efficiency.rig.name}
            </div>
          </div>
        );
      },
    },
    {
      field: "startHour",
      headerName: "Data",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {formatDate(new Date(params.row.efficiency.date))}
            </div>
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Tipo",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {translateType(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {translateClassification(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "minutes",
      headerName: "Minutos",
      flex: 0.2,
      headerAlign: "center",
      align: "center",

      renderCell(params: GridRenderCellParams) {
        const parsedStartHour = parse(
          params.row.startHour.split("T")[1].slice(0, 5),
          "HH:mm",
          new Date(),
        );
        const parsedEndHour = parse(
          params.row.endHour.split("T")[1].slice(0, 5),
          "HH:mm",
          new Date(),
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter ">
              {getDiffInMinutes(parsedEndHour, parsedStartHour)}
            </div>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div
            style={{
              maxHeight: "100px",
              overflowY: "auto",
              overflowX: "hidden", // <-- impede scroll horizontal
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "left", // opcional, melhora legibilidade
            }}
            className="text-gray-800 font-medium tracking-tighter"
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  if (filters.periodType.includes("REPAIR" as PeriodType)) {
    columns.splice(3, 0, {
      field: "repairClassification",
      headerName: "Reparo",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div
            className="text-gray-800 font-medium tracking-tighter"
            style={{
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "left", // opcional, melhora legibilidade
            }}
          >
            {translateRepairClassification(params.value)}
          </div>
        );
      },
    });
  }

  const NotFoundDataGrid = () => {
    return (
      <NotFound>
        <span className="text-white">
          <strong>Não</strong> existem dados para a <strong>sonda</strong> no{" "}
          <strong>período</strong> selecionado!
        </span>
      </NotFound>
    );
  };

  return (
    <DataGrid
      loading={isLoading}
      rows={periods}
      disableVirtualization
      paginationModel={{
        page: Number(filters.pageIndex) - 1,
        pageSize: Number(filters.pageSize),
      }}
      rowHeight={120}
      density="comfortable"
      onPaginationModelChange={(model) => onPaginationModelChange(model)}
      localeText={localeTextDataGridConfig}
      paginationMode="server"
      rowCount={totalItems}
      pageSizeOptions={[5, 10, 25, 100]}
      columns={columns}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
      //getRowId={(row) => row.rigid}
      className="border-none"
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
        "& .MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
        "& .MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
          py: "15px",
        },
        "& .MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "22px",
        },
        "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
        "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "15px" },
        "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "22px",
        },
      }}
    />
  );
};
