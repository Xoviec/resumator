import { fireEvent, render, screen } from "@testing-library/react";
import MockDate from "mockdate";
import { FunctionComponent } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { FormDatePicker } from "./FormDatePicker";

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  MockDate.reset();
});

describe("FormDatePicker", () => {
  it("should render correctly", () => {
    MockDate.set("2021-11-22T00:00:00.000Z");

    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    render(
      <FormProviderWrapper>
        <FormDatePicker name="test-form-name" label="test-form-label" />
      </FormProviderWrapper>
    );

    expect(document.body).toMatchSnapshot();
  });

  it("should update the value when selected", () => {
    MockDate.set("2021-11-03T00:00:00.000Z");

    let form: UseFormReturn<FieldValues, Record<string, unknown>> = {} as any;
    const fieldName = "test-form-name";

    const FormProviderWrapper: FunctionComponent<any> = ({ children, onChange }) => {
      form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    render(
      <FormProviderWrapper>
        <FormDatePicker name={fieldName} label="test-form-label" />
      </FormProviderWrapper>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "05-2021" },
    });

    expect(form.getValues()).toEqual({
      "test-form-name": new Date("2021-05-01T00:00:00.000Z"),
    });
  });
});
