import React, { useState } from "react";
import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@rebass/forms";
import Card from "../Card";
import EditIcon from "./EditIcon";

const Introduction = ({ introduction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register } = useFormContext();

  return (
    <DescriptionContainer>
      {isEditing ? (
        <StyledTextArea
          onBlur={() => setIsEditing((prevState) => !prevState)}
          name={"introduction"}
          ref={register()}
        />
      ) : (
        <p>{introduction}</p>
      )}
      <EditIcon
        className="edit-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        isEditing={isEditing}
      />
    </DescriptionContainer>
  );
};

const StyledTextArea = styled(Textarea)`
  height: 280px;
`;

const DescriptionContainer = styled(Card)`
  font-size: 14px;
  max-height: 200px;
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;
export default Introduction;
