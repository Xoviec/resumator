import { fireEvent, render } from "@testing-library/react";
import { FunctionComponent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormSkillsSelect } from ".";

jest.mock("./FormSkillsSelectAutocomplete", () => ({
  ...jest.requireActual("./FormSkillsSelectAutocomplete"),
  FormSkillsSelectAutocomplete: jest
    .requireActual("react")
    .forwardRef(({ value, onChange }: any, ref: any) => (
      <input
        ref={ref}
        value={value || ""}
        onChange={onChange}
        data-testid="input-field"
      />
    )),
}));

describe("FormSkillsSelect", () => {
  it("should render correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormSkillsSelect name="test-form-name" />
      </FormProviderWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the value when changed", () => {
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
        <FormSkillsSelect name={fieldName} label="test-form-label" />
      </FormProviderWrapper>
    );

    fireEvent.change(getByTestId("input-field"), {
      target: { value: "test-input-value" },
    });

    expect(mockChange).toHaveBeenCalledWith("test-input-value");
  });
});
