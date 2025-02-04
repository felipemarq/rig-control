import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { translateType } from "../../../../../app/utils/translateType";
import { translateClassification } from "../../../../../app/utils/translateClassification";
import { Period } from "../../../../../app/entities/Period";
import { localeTextDataGridConfig } from "../../../../../app/utils/localeTextDataGridConfig";
import { translateRepairClassification } from "../../../../../app/utils/translateRepairClassification";
import { formatIsoStringToHours } from "@/app/utils/formatIsoStringToHours";
import { formatDate } from "@/app/utils/formatDate";
import { getDiffInMinutes } from "@/app/utils/getDiffInMinutes";
import { parse } from "date-fns";

interface ListPeriodsDataGridProps {
  periods: Array<Period>;

  isLoading?: boolean;
}

export const PeriodsDataGrid = ({
  periods,

  isLoading,
}: ListPeriodsDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Data",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter">
              {formatDate(new Date(params.row.efficiency.date)).slice(0, 5)}
            </div>
          </div>
        );
      },
    },
    {
      field: "startHour",
      headerName: "Hora Inicial",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter">
              {formatIsoStringToHours(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "endHour",
      headerName: "Hora Final",
      flex: 0.2,
      headerAlign: "center",
      align: "center",

      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter">
              {formatIsoStringToHours(params.value)}
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
          new Date()
        );
        const parsedEndHour = parse(
          params.row.endHour.split("T")[1].slice(0, 5),
          "HH:mm",
          new Date()
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
      field: "type",
      headerName: "Tipo",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter">
              {translateType(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-medium tracking-tighter">
              {translateClassification(params.value)}
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
          <div className="w-full flex justify-center items-center py-5">
            <div className="text-gray-800 font-medium tracking-tighter">
              {params.value}
            </div>
          </div>
        );
      },
    },
  ];

  columns.splice(3, 0, {
    field: "repairClassification",
    headerName: "Reparo",
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    renderCell(params: GridRenderCellParams) {
      return (
        <div className="w-full flex justify-center items-center py-5">
          <div className="text-gray-800 font-medium tracking-tighter">
            {translateRepairClassification(params.value)}
          </div>
        </div>
      );
    },
  });

  return (
    <DataGrid
      loading={isLoading}
      rows={periods}
      disableVirtualization
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      localeText={localeTextDataGridConfig}
      pageSizeOptions={[5, 10, 25, 100]}
      columns={columns}
      /*  slots={{
        toolbar: GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }} */
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
          borderLeft: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderRight: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderTop: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          //background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
          alignItems: "space-between !important",
        },
        "& .MuiDataGrid-columnHeadersInner": {
          backgroundColor: "hsl(var(--card))",
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
