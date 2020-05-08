import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import EditIcon from "./EditIcon";

const Education = ({ education }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EducationContainer>
      <Title>Education</Title>
      {education.map((e) => (
        <EducationItem key={e.id}>
          <p>
            <b>{e.name}</b>
          </p>
          <p>{e.institute}</p>
          <p>
            {e.startDate} - {e.endDate}
          </p>
        </EducationItem>
      ))}
      <EditIcon
        className="edit-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        isEditing={isEditing}
      />
    </EducationContainer>
  );
};
const EducationItem = styled.div`
  margin: 16px 0;
`;
const Title = styled.h2`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

const EducationContainer = styled(Card)`
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;
export default Education;
