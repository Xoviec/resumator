import { capitalize, Grid } from "@mui/material";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColumns,
  GridToolbar,
} from "@mui/x-data-grid";
import { FC } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Page } from "../../components/layout";
import { useFetchData } from "../../hooks/useFetchData";
import { MainLayout } from "../../layouts/MainLayout";
import { Proficiency } from "../../types/language";

const PAGE_TITLE = "Manage Proficiencies";

const columns: GridColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 130 },
  { field: "description", headerName: "Description", flex: 1, editable: true },
];

export const ManageLanguageProficiencies: FC = () => {
  const { data, isLoading, updateFieldsById } = useFetchData<Proficiency[]>({
    collectionName: "proficiencies",
  });

  const onEditSave = (params: GridCellEditCommitParams) => {
    const { field, value, id } = params;
    updateFieldsById(id as string, { [field]: capitalize(value as string) });
  };

  return (
    <Page title={PAGE_TITLE}>
      <MainLayout>
        <Grid mb={4} container alignItems="center">
          <Grid item>
            <PageHeader title={PAGE_TITLE} />
          </Grid>
        </Grid>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellEditCommit={onEditSave}
          loading={isLoading}
          components={{
            Toolbar: GridToolbar,
          }}
          autoHeight
        />
      </MainLayout>
    </Page>
  );
};
