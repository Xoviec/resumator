import React from "react";
import { FormContext } from "react-hook-form";
import { Heading } from "rebass";
import styled from "@emotion/styled";
import Modal from "react-modal";

const EditModalWrapper = ({
  isOpen,
  onRequestClose,
  methods,
  contentLabel,
  heading,
  children,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      <ModalContent>
        <FormContext {...methods}>
          <form>
            <Heading as="legend" color="white" pb={4}>
              {heading}
            </Heading>
            {children}
          </form>
        </FormContext>
      </ModalContent>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  margin: 32px auto;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.secondary};
  max-width: 1440px;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default EditModalWrapper;
