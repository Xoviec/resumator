import React from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditIcon = ({ onClick, icon, className }) => {
  return (
    <Edit
      className={className ? className : "edit-button"}
      onClick={onClick}
      icon={icon || faPen}
    />
  );
};

const Edit = styled(FontAwesomeIcon)`
  visibility: hidden;
  position: absolute;
  right: 16px;
  top: 16px;
`;
export default EditIcon;
