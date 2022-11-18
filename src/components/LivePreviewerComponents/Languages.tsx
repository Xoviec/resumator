import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import { HelpSharp } from "@mui/icons-material";
import React, { useState } from "react";
import { colors } from "../../config/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModal } from "../../hooks";
import { useFetchData } from "../../hooks/useFetchData";
import { FormColumn, FormRow } from "../Form";
import { FormSelect } from "../Form/FormSelect";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import {
  Language,
  LanguageProficiencyMap,
  Proficiency,
  ProficiencyLevel,
  ResumeLanguage,
} from "../../types/language";
import LanguagesHelpModal from "./LanguagesHelpModal";

type Props = {
  resumeLanguages: ResumeLanguage[];
  onSubmit: (languages: LanguageProficiencyMap[]) => void;
};

const iconButtonStyle = { color: colors.black };

const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  min-width: 420px;
  ${({ theme: { breakpoints } }) => breakpoints.between(1200, 1400)} {
    min-width: 260px;
  }
`;

const StyledListItemText = styled("div")`
  max-width: 280px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const MenuItemContainer = styled(Box)`
  display: "flex";
  flexdirection: "row";
  gap: "10px";
  alignitems: "center";
`;

const Dash = styled(Typography)`
  margin-right: 10px;
  margin-left: 10px;
`;

const Languages: React.FC<Props> = ({ resumeLanguages, onSubmit }) => {
  const { data: availableLanguages } = useFetchData<Language[]>({
    collectionName: "languages",
  });

  const { data: proficiencies } = useFetchData<Proficiency[]>({
    collectionName: "proficiencies",
  });

  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [selectedProficiency, setSelectedProficiency] = useState(0);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const canAddMoreLanguages = availableLanguages.length > resumeLanguages.length;

  const {
    isEditing,
    editItem,
    editItemIndex,
    handleEdit,
    handleEditCancel,
    setIsEditing,
  } = useModal();

  const onCancel = () => {
    setSelectedLanguage(0);
    setSelectedProficiency(0);
    handleEditCancel();
  };

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;

    if (name === "proficiency") {
      setSelectedProficiency(value as number);
    } else {
      setSelectedLanguage(value as number);
    }
  };

  const transformLanguagesToIdMap = () => {
    return resumeLanguages.map(({ language, proficiency }) => {
      return {
        languageId: language?.id,
        proficiencyId: proficiency?.id,
      };
    });
  };

  const handleDelete = (languageId?: string) => {
    if (languageId) {
      const updatedLanguages = transformLanguagesToIdMap().filter(
        (language) => language.languageId !== languageId
      );
      onSubmit(updatedLanguages);
    }
  };

  const onSave = () => {
    const isEditing = editItemIndex !== null;

    const addedLanguage = {
      languageId: availableLanguages[selectedLanguage].id,
      proficiencyId: proficiencies[selectedProficiency].id,
    };

    const userLanguages = transformLanguagesToIdMap();

    if (isEditing) {
      userLanguages[editItemIndex] = addedLanguage;
    } else {
      userLanguages.push(addedLanguage);
    }

    onSubmit(userLanguages);
    onCancel();
  };

  const onEdit = (index: number, language?: Language, proficiency?: Proficiency) => {
    handleEdit({ language, proficiency }, index);
    const languageIndex = availableLanguages.findIndex(
      (availableLanguage) => availableLanguage.id === language?.id
    );

    const proficiencyIndex = proficiencies.findIndex(
      (availableProficiency) => availableProficiency.id === proficiency?.id
    );
    setSelectedLanguage(languageIndex);
    setSelectedProficiency(proficiencyIndex);
  };

  const renderAvailableLanguages = () => {
    return availableLanguages.map((availableLanguage, index) => {
      const isAlreadyAddedToResume = !!resumeLanguages.find(
        (language) => language?.language?.id === availableLanguage.id
      );
      const isBeingEdited = availableLanguage.id === editItem?.language.id;
      const isDisabled = editItem ? !isBeingEdited : isAlreadyAddedToResume;
      return (
        <MenuItem key={availableLanguage.id} disabled={isDisabled} value={index}>
          <MenuItemContainer>{availableLanguage.name}</MenuItemContainer>
        </MenuItem>
      );
    });
  };

  const onAddPress = () => {
    setIsEditing(true);
    const availableLanguage = availableLanguages.find((availableLanguage) => {
      const foundLanguage = !!resumeLanguages.find(
        (resumeLanguage) => resumeLanguage.language?.name === availableLanguage.name
      );
      return !foundLanguage;
    });

    setSelectedLanguage(
      availableLanguage ? availableLanguages.indexOf(availableLanguage) : 0
    );
  };

  const renderAvailableProficiencies = () => {
    return sortProficiencies(proficiencies).map((proficiency, index: number) => {
      return (
        <MenuItem key={proficiency.id} value={index}>
          <MenuItemContainer>{proficiency.name}</MenuItemContainer>
        </MenuItem>
      );
    });
  };

  const sortProficiencies = (proficiency: Proficiency[]) =>
    proficiency.sort(
      (a, b) =>
        Object.values(ProficiencyLevel).indexOf(a.name as ProficiencyLevel) -
        Object.values(ProficiencyLevel).indexOf(b.name as ProficiencyLevel)
    );

  return (
    <>
      <LanguagesHelpModal
        proficiencies={proficiencies}
        onClose={() => setIsHelpModalOpen(false)}
        isModalOpen={isHelpModalOpen}
      />
      <Section
        action="add"
        disabled={!canAddMoreLanguages}
        tooltipTitle="click to see more details about the languages"
        actionTooltip="Add language"
        tooltipIcon={<HelpSharp />}
        onTooltipIconClick={() => setIsHelpModalOpen(true)}
        actionOnClick={onAddPress}
        title="Languages"
      >
        <StyledList>
          {resumeLanguages.map(
            ({ language, proficiency }: ResumeLanguage, index: number) => {
              return (
                <ListItem key={language?.id} color="secondary">
                  <StyledListItemText>
                    <Typography>{language?.name}</Typography>
                    <Dash>-</Dash>
                    <Typography style={{ color: colors.darkGray }} variant="caption">
                      {proficiency?.name}
                    </Typography>
                  </StyledListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete link"
                      onClick={() => handleDelete(language?.id)}
                      size="large"
                    >
                      <DeleteIcon style={iconButtonStyle} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit link"
                      onClick={() => onEdit(index, language, proficiency)}
                      size="large"
                    >
                      <EditIcon style={iconButtonStyle} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }
          )}
        </StyledList>
        <SectionEditDialog
          title={editItemIndex ? `Edit language` : `Add new language`}
          data={resumeLanguages}
          open={isEditing}
          onCancel={onCancel}
          onSave={onSave}
        >
          <FormColumn>
            <FormRow>
              <FormSelect
                onChange={handleChange}
                value={selectedLanguage}
                name="languages_form"
              >
                {renderAvailableLanguages()}
              </FormSelect>
            </FormRow>
            <FormRow>
              <FormSelect
                onChange={handleChange}
                value={selectedProficiency}
                label="proficiency"
                name="proficiency"
              >
                {renderAvailableProficiencies()}
              </FormSelect>
            </FormRow>
          </FormColumn>
        </SectionEditDialog>
      </Section>
    </>
  );
};

export default Languages;
