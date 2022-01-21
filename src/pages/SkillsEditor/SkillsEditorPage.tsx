import { FC, useState, useEffect, useCallback } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridRowId,
  GridFilterModel,
} from "@mui/x-data-grid";
import Alert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SkillHeader } from "./SkillHeader";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

const columns: GridColDef[] = [
  {
    field: "skillName",
    headerName: "Skill Name",
    width: 150,
    editable: true,
  },
];

export const SkillsEditorPage: FC = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { skillList, updateSkillList } = useSkillsContext();
  const [rowsToDelete, setRowsToDelete] = useState<GridRowId[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: "skillName",
        operatorValue: "contains",
        value: newSkill,
      },
    ],
  });

  useEffect(() => {
    const skillsWithIDs = skillList.map((skill, index) => ({
      id: `${index}-${skill}`,
      skillName: skill,
    }));
    setRows(skillsWithIDs);
  }, [skillList]);

  function isSkillUnique() {
    const isUnique = rows.every(
      (row) => row.skillName.toLowerCase() !== newSkill.toLowerCase()
    );
    return isUnique;
  }

  function handleDelete() {
    const rowsToKeep = rows.filter(
      (row) => !rowsToDelete.find((rowToDelete) => rowToDelete === row.id)
    );
    setRows(rowsToKeep);
    setRowsToDelete([]);
  }

  function handleNewSkill(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newSkill = event.target.value;
    setNewSkill(newSkill);
    setFilterModel({
      items: [
        { columnField: "skillName", operatorValue: "contains", value: newSkill },
      ],
    });
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSkillUnique()) return;
    setRows(rows.concat({ id: `${rows.length}-${newSkill}`, skillName: newSkill }));
    setSnackbar({
      children: `Skill "${newSkill}" has been added successfully`,
      severity: "success",
    });
    setNewSkill("");
  }

  return (
    <MainLayout>
      <SkillHeader
        isBtnDisabled={!newSkill || !isSkillUnique()}
        saveNewSkill={handleSave}
        newSkill={newSkill}
        editCount={rowsToDelete.length}
        saveEditedSkills={handleDelete}
        handleNewSkill={handleNewSkill}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        autoHeight
        checkboxSelection
        onSelectionModelChange={(selectionModel) => setRowsToDelete(selectionModel)}
        loading={skillList.length === 0}
        components={{
          Toolbar: GridToolbar,
        }}
        filterModel={filterModel}
      />

      {snackbar && (
        <Snackbar open onClose={() => setSnackbar(null)} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </MainLayout>
  );
};
