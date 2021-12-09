import { fireEvent, render } from "@testing-library/react";
import { FunctionComponent } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { FormTextField } from "./FormTextField";

describe("FormTextField", () => {
  it("should render correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormTextField name="test-form-name" />
      </FormProviderWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update field when value changes", () => {
    let form: UseFormReturn<FieldValues, Record<string, unknown>> = {} as any;
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { getByRole } = render(
      <FormProviderWrapper>
        <FormTextField name="test-field" value="test-value-1" />
      </FormProviderWrapper>
    );

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test-value-2" } });

    expect(form.getValues()).toEqual({ "test-field": "test-value-2" });
  });
});
