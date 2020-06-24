import React, { useState } from "react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { TextField, Typography } from "@material-ui/core";
import SideProjectItem from "./SideProjectItem";
import Card from "../Card";
import EmptyNotice from "./EmptyNotice";
import ActionIcon from "./ActionIcon";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const SideProjects = ({
  type,
  projects,
  onSubmit,
  onEditHandler,
  onDeleteHandler,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExisting, setIsEditingExisting] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const methods = useForm({});
  const typeLabel = type.toLowerCase();
  const tooltipText = `Add ${typeLabel}`;

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
    setIsEditingExisting(true);
    methods.reset(experienceEntry);
    setIsEditing(true);
  };

  return (
    <Card>
      <TopWrapper>
        <Typography gutterBottom variant="h4">
          {type}
        </Typography>

        <ActionIcon
          onClick={() => setIsEditing((prevState) => !prevState)}
          icon={faPlus}
          tooltipText={tooltipText}
        />
      </TopWrapper>

      {projects.map((e, i) => (
        <>
          <SideProjectItem
            projectItem={e}
            key={i}
            onDeleteHandler={onDeleteHandler}
            onClickEdit={onClickEdit}
          />
          {i > projects.length - 1 && (
            <Box mt={2}>
              <Divider />
            </Box>
          )}
        </>
      ))}

      <EmptyNotice items={projects} />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => {
          setIsEditingExisting(false);
          methods.reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel={`Add ${type} details`}
        heading={`Add ${type} details`}
        onPrimaryActionClicked={() => {
          if (editingExisting) {
            onEditHandler({ ...methods.getValues(), id: currentItemId });
          } else {
            onSubmit(methods.getValues());
          }
          setCurrentItemId(null);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          name="title"
          label="Title"
          rules={{ required: "title is required" }}
          errors={methods.errors}
          control={methods.control}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="description"
          label="Description"
          rules={{ required: "description is required" }}
          errors={methods.errors}
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="link"
          label="Link"
          rules={{ required: type === "Publications" ? "link is required" : false }}
          errors={methods.errors}
          control={methods.control}
          defaultValue=""
        />
      </EditModalWrapper>
    </Card>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SideProjects;
