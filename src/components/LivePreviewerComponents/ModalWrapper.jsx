import React from "react";
import { FormProvider } from "react-hook-form";
import styled from "@emotion/styled";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import ModalActionButtons from "./ModalActionButtons";

const BackdropComponent = ({ open, ...backdropProps }) => (
  <Fade in={open}>
    <Backdrop open={open} {...backdropProps} />
  </Fade>
);

const EditModalWrapper = ({
  isOpen,
  onRequestClose,
  methods,
  heading,
  children,
  primaryText = "Save",
  secondaryText = "Cancel",
  onPrimaryActionClicked,
  onSecondaryActionClicked,
  fullWidth = true,
}) => {
  return (
    <CustomModal
      open={isOpen}
      onClose={() => onRequestClose(false)}
      BackdropComponent={BackdropComponent}
      aria-labelledby="modal"
      aria-describedby="modal"
      onSubmit={methods.handleSubmit(onPrimaryActionClicked)}
    >
      <Fade in={isOpen}>
        <ModalContent fullWidth={fullWidth}>
          <FormProvider {...methods}>
            <StyledForm>
              <ScrollableWrapper>
                {heading && <h1>{heading}</h1>}
                {children}
              </ScrollableWrapper>

              <CustomModalActionButtons
                primaryText={primaryText}
                secondaryText={secondaryText}
                onPrimaryActionClicked={onPrimaryActionClicked}
                onSecondaryActionClicked={onSecondaryActionClicked}
              />
            </StyledForm>
          </FormProvider>
        </ModalContent>
      </Fade>
    </CustomModal>
  );
};

const MODAL_MARGIN = 24;

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - ${MODAL_MARGIN * 2}px);
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 6px;
  margin: ${MODAL_MARGIN * 2}px;
  max-width: 1200px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &:focus {
    outline: none;
  }
`;

const ScrollableWrapper = styled.div`
  overflow: auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomModalActionButtons = styled(ModalActionButtons)`
  position: sticky;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
  height: 64px;
  flex: 0 0 auto;
`;

export default EditModalWrapper;
