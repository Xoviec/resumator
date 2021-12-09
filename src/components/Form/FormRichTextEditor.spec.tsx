import { fireEvent, render } from "@testing-library/react";
import { FunctionComponent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormRichTextEditor } from "./FormRichTextEditor";

jest.mock("./FormRichTextDraftEditor", () => ({
  ...jest.requireActual("./FormRichTextDraftEditor"),
  FormRichTextDraftEditor: jest
    .requireActual("react")
    .forwardRef((props: any, ref: any) => {
      return (
        <input
          ref={ref}
          data-testid="test-input"
          value={props.value}
          onChange={props.onChange}
        />
      );
    }),
}));

describe("FormRichTextEditor", () => {
  it("should render correctly", () => {
    const FormProviderWrapper: FunctionComponent = ({ children }) => {
      const form = useForm();

      return <FormProvider {...form}>{children}</FormProvider>;
    };

    const { asFragment } = render(
      <FormProviderWrapper>
        <FormRichTextEditor name="test-form-name" label="test-form-label" />
      </FormProviderWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update field when the value changes", () => {
    const FormProviderWrapper: FunctionComponent<any> = ({ children, onChange }) => {
      const form = useForm();
      const fieldValue = form.watch("test-form-name");

      useEffect(() => {
        onChange(fieldValue);
      }, [fieldValue, onChange]);

      return <FormProvider {...form}>{children}</FormProvider>;
    };
    const mockChange = jest.fn();

    const { getByTestId } = render(
      <FormProviderWrapper onChange={mockChange}>
        <FormRichTextEditor name="test-form-name" label="test-form-label" />
      </FormProviderWrapper>
    );

    fireEvent.change(getByTestId("test-input"), {
      target: { value: "test-input-value" },
    });

    expect(mockChange).toHaveBeenCalledWith("test-input-value");
  });
});
