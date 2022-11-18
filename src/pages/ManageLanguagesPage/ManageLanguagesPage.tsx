import { Button, capitalize, Grid } from "@mui/material";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColumns,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Page } from "../../components/layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useFetchData } from "../../hooks/useFetchData";
import { MainLayout } from "../../layouts/MainLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageLanguagesDialog from "./ManageLanguagesDialog";
import { NavLink } from "react-router-dom";
import { Language } from "../../types/language";
import { styled } from "@mui/system";

const PAGE_TITLE = "Manage Languages";

const columns: GridColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 130, editable: true },
];

const DeleteButton = styled(Button)`
  margin-right: 16px;
`;

const RightSideGrid = styled(Grid)`
  margin-left: auto;
`;

const ManageLanguagesPage: FC = () => {
  const [rowsToDelete, setRowsToDelete] = useState<GridRowId[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, addToCollection, updateFieldsById, deleteByIds } =
    useFetchData<Language[]>({
      collectionName: "languages",
    });

  const onSubmit = async (data: FieldValues) => {
    await addToCollection({ ...data });
    setIsDialogOpen(false);
  };

  const onEditSave = (params: GridCellEditCommitParams) => {
    const { field, value, id } = params;
    updateFieldsById(id as string, { [field]: capitalize(value as string) });
  };

  const setIsDialogOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <Page title={PAGE_TITLE}>
      <MainLayout>
        <ManageLanguagesDialog
          setIsDialogOpen={setIsDialogOpen}
          onSubmit={onSubmit}
          open={isOpen}
        />
        <Grid mb={4} container alignItems="center">
          <Grid item>
            <PageHeader title={PAGE_TITLE} />
          </Grid>
          <Grid>
            <Button
              style={{ marginLeft: 16 }}
              color="primary"
              variant="contained"
              component={NavLink}
              to="/proficiencies"
            >
              manage language proficiencies
            </Button>
          </Grid>
          <RightSideGrid>
            <DeleteButton
              startIcon={<DeleteIcon />}
              variant="contained"
              disabled={!rowsToDelete.length}
              color="secondary"
              onClick={() => deleteByIds(rowsToDelete as string[])}
            >
              Delete selected languages ({rowsToDelete.length})
            </DeleteButton>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="contained"
              color="primary"
            >
              New Language
            </Button>
          </RightSideGrid>
        </Grid>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10]}
          onCellEditCommit={onEditSave}
          loading={isLoading}
          onSelectionModelChange={(selectionModel) => {
            setRowsToDelete(selectionModel);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          autoHeight
        />
      </MainLayout>
    </Page>
  );
};

export default ManageLanguagesPage;
