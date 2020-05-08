import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import EditIcon from "./EditIcon";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Experience = ({ type, experience }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <Title>{type}</Title>
      <AddNew
        className="add-new-button"
        onClick={() => console.log("test")}
        icon={faPlus}
      />
      {experience.map((e) => (
        <ExperienceItem key={e.id}>
          <TopSection>
            <h3> {e.role}</h3>
            <h3>
              {e.startDate} - {e.endDate}
            </h3>
          </TopSection>
          <Description>{e.description}</Description>
          <Techniques>
            <span>
              Techniques:{" "}
              {e.stackAndTechniques.map((t) => (
                <span key={t.name}>{t.name} </span>
              ))}
            </span>
          </Techniques>
          <EditIcon
            className="edit-button"
            onClick={() => setIsEditing((prevState) => !prevState)}
            isEditing={isEditing}
          />
        </ExperienceItem>
      ))}
    </Card>
  );
};

const AddNew = styled(FontAwesomeIcon)`
  position: absolute;
  right: 32px;
  top: 48px;
`;
const TopSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-family: Stratum;
`;

const Techniques = styled.div`
  padding: 4px;
  margin: 0;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.gray};
`;
const Description = styled.p`
  font-size: 14px;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

const ExperienceItem = styled.div`
  position: relative;
  margin: 24px 0;
  padding: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    .edit-button {
      visibility: visible;
    }
  }
`;

export default Experience;
