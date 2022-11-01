import { fireEvent, render } from "@testing-library/react";
import { FunctionComponent } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { FormCountrySelect } from "./FormCountrySelect";

describe("FormCountrySelect", () => {
  it("should render correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormCountrySelect name="countryCode" />
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

    const { container } = render(
      <FormProviderWrapper>
        <FormCountrySelect name="countryCode" />
      </FormProviderWrapper>
    );

    const input = container.querySelector('input[name="countryCode"]');
    if (!input) return expect(false).toBeTruthy();
    fireEvent.change(input, { target: { value: "BE" } });

    expect(form.getValues()).toEqual({ countryCode: "BE" });
  });
});
