import React from "react";
import { FormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { Modal } from "@material-ui/core";
import ModalActionButtons from "./ModalActionButtons";

const EditModalWrapper = ({
  isOpen,
  onRequestClose,
  methods,
  heading,
  children,
  primaryText,
  secondaryText,
  onPrimaryActionClicked,
  onSecondaryActionClicked,
}) => {
  return (
    <StyledModal
      open={isOpen}
      onClose={() => onRequestClose(false)}
      aria-labelledby="modal"
      aria-describedby="modal"
    >
      <ModalContent>
        <FormContext {...methods}>
          <StyledForm>
            {heading && <h1>{heading}</h1>}
            {children}
            <ModalActionButtons
              primaryText={primaryText}
              secondaryText={secondaryText}
              onPrimaryActionClicked={onPrimaryActionClicked}
              onSecondaryActionClicked={onSecondaryActionClicked}
            />
          </StyledForm>
        </FormContext>
      </ModalContent>
    </StyledModal>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledModal = styled(Modal)``;

const ModalContent = styled.div`
  background-color: white;
  margin: 32px auto;
  padding: 32px;
  max-width: 1440px;
`;

export default EditModalWrapper;
