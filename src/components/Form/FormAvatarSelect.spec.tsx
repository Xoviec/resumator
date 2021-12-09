import { render, fireEvent } from "@testing-library/react";
import { FunctionComponent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormAvatarSelect } from "./FormAvatarSelect";

describe("FormAvatarSelect", () => {
  it("renders correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormAvatarSelect name="test-form-name" label="test-form-label" />
      </FormProviderWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("updates the value when selected", () => {
    const fieldName = "test-form-name";

    const FormProviderWrapper: FunctionComponent<any> = ({ children, onChange }) => {
      const form = useForm();

      const fieldValue = form.watch(fieldName);

      useEffect(() => {
        onChange(fieldValue);
      }, [fieldValue, onChange]);

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const mockChange = jest.fn();

    const { getByTestId } = render(
      <FormProviderWrapper onChange={mockChange}>
        <FormAvatarSelect name={fieldName} label="test-form-label" />
      </FormProviderWrapper>
    );

    const avatar3 = getByTestId("avatar-3");
    fireEvent.click(avatar3);

    expect(mockChange).toHaveBeenCalledWith("3");
  });
});
