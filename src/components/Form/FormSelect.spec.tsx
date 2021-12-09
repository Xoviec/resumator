import { render, fireEvent } from "@testing-library/react";
import { FunctionComponent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormSelect } from "./FormSelect";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Select: jest
    .requireActual("react")
    .forwardRef(({ value, onChange }: any, ref: any) => (
      <input
        ref={ref}
        value={value || ""}
        onChange={onChange}
        data-testid="select-field"
      />
    )),
}));

describe("FormSelect", () => {
  it("should render correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormSelect name="test-form-name" value="test" />
      </FormProviderWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the value when selected", () => {
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
        <FormSelect name={fieldName} label="test-form-label" />
      </FormProviderWrapper>
    );

    fireEvent.change(getByTestId("select-field"), {
      target: { value: "test-input-value" },
    });

    expect(mockChange).toHaveBeenCalledWith("test-input-value");
  });
});
