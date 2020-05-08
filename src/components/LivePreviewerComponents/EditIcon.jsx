import React from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditIcon = ({ isEditing, onClick }) => {
  if (!isEditing) {
    return <Edit className="edit-button" onClick={onClick} icon={faPen} />;
  }

  return null;
};

const Edit = styled(FontAwesomeIcon)`
  visibility: hidden;
  position: absolute;
  right: 16px;
  top: 16px;
`;
export default EditIcon;
