import { render, fireEvent } from "@testing-library/react";
import { FormRichTextDraftEditor } from "./FormRichTextDraftEditor";
import * as draftJs from "draft-js";
import { mocked } from "jest-mock";

jest.mock("draft-js", () => {
  const reactLib = jest.requireActual("react");

  // unfortunately once we have a component with forwardRef, we can't spy on it or mock it, so workaround
  const editorPropReceiver = jest.fn();
  const Editor = reactLib.forwardRef((props: any, ref: any) => {
    editorPropReceiver(props);
    return (
      <input
        ref={ref}
        data-testid="editor-input"
        onChange={(e) => {
          props.onChange({
            ...props.editorState,
            id: `input-change-${e.target.value}`,
            getCurrentContent: () => ({
              inputValue: e.target.value,
              getBlockForKey: jest.fn(() => ({
                getType: jest.fn(() => "test"),
              })),
            }),
          });
        }}
      />
    );
  });
  const draftJsMock: any = jest.createMockFromModule("draft-js");

  return {
    ...draftJsMock,
    editorPropReceiver,
    Editor,
  };
});

const {
  EditorState,
  convertFromRaw,
  convertToRaw,
  convertFromHTML,
  RichUtils,
  ContentState,
} = draftJs;
const editorPropReceiver = mocked(
  // @ts-ignore
  draftJs.editorPropReceiver
);

const testStyleButton = (styleType: string) => {
  mocked(RichUtils.toggleInlineStyle).mockImplementation(
    (editorState) =>
      ({
        ...editorState,
        id: `${styleType}-set`,
        getCurrentContent: () => ({
          inputValue: `${styleType}-input-value`,
          getBlockForKey: jest.fn(() => ({
            getType: jest.fn(() => "test"),
          })),
        }),
      } as any)
  );

  const onChange = jest.fn();
  const { getByTestId } = render(
    <FormRichTextDraftEditor
      value={JSON.stringify({ test: "value" })}
      onChange={onChange}
    />
  );

  mocked(editorPropReceiver).mockClear();

  fireEvent.click(getByTestId(`${styleType}-style-button`));

  expect(mocked(RichUtils.toggleInlineStyle)).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "default-editor-state",
    }),
    `${styleType}`
  );
  expect(mocked(editorPropReceiver)).toHaveBeenCalledWith(
    expect.objectContaining({
      editorState: expect.objectContaining({
        id: `${styleType}-set`,
      }),
    })
  );

  fireEvent.blur(getByTestId("form-rich-text-draft-editor-container"));
  expect(onChange).toHaveBeenCalledWith(
    JSON.stringify({ value: `${styleType}-input-value` })
  );
};

const testBlockTypeButton = (blockType: string) => {
  mocked(RichUtils.toggleBlockType).mockImplementation(
    (editorState) =>
      ({
        ...editorState,
        id: `${blockType}-set`,
        getCurrentContent: () => ({
          inputValue: `${blockType}-input-value`,
          getBlockForKey: jest.fn(() => ({
            getType: jest.fn(() => "test"),
          })),
        }),
      } as any)
  );

  const onChange = jest.fn();
  const { getByTestId } = render(
    <FormRichTextDraftEditor
      value={JSON.stringify({ test: "value" })}
      onChange={onChange}
    />
  );

  mocked(editorPropReceiver).mockClear();

  fireEvent.click(getByTestId(`${blockType}-block-type-button`));

  expect(mocked(RichUtils.toggleBlockType)).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "default-editor-state",
    }),
    `${blockType}`
  );
  expect(mocked(editorPropReceiver)).toHaveBeenCalledWith(
    expect.objectContaining({
      editorState: expect.objectContaining({
        id: `${blockType}-set`,
      }),
    })
  );

  fireEvent.blur(getByTestId("form-rich-text-draft-editor-container"));
  expect(onChange).toHaveBeenCalledWith(
    JSON.stringify({ value: `${blockType}-input-value` })
  );
};

describe("FormRichTextDraftEditor", () => {
  const getDefaultEditorState = () =>
    ({
      id: "default-editor-state",
      getSelection: jest.fn(() => ({
        getStartKey: jest.fn(() => "test"),
      })),
      getCurrentContent: jest.fn(() => ({
        getBlockForKey: jest.fn(() => ({
          getType: jest.fn(() => "test"),
        })),
      })),
      getCurrentInlineStyle: jest.fn(() => ({
        has: jest.fn(() => true),
      })),
    } as any);

  beforeEach(() => {
    jest.resetAllMocks();

    mocked(convertFromRaw).mockImplementation(() => "default-test-content" as any);

    const convertToRawImplementation: any = (currentContent: any) => {
      if (currentContent?.inputValue) {
        return { value: currentContent?.inputValue };
      }

      return { value: "default-test-content" };
    };
    mocked(convertToRaw).mockImplementation(convertToRawImplementation);
    mocked(EditorState.createWithContent).mockImplementation(getDefaultEditorState);
  });

  it("should render correctly", () => {
    const { asFragment } = render(
      <FormRichTextDraftEditor
        value={JSON.stringify({ test: "value" })}
        onChange={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the Editor with given value", () => {
    render(
      <FormRichTextDraftEditor
        value={JSON.stringify({ test: "value" })}
        onChange={() => {}}
      />
    );

    expect(mocked(convertFromRaw)).toHaveBeenCalledWith({ test: "value" });
    expect(mocked(EditorState.createWithContent)).toHaveBeenCalledWith(
      "default-test-content"
    );
    expect(editorPropReceiver).toHaveBeenCalledWith(
      expect.objectContaining({
        editorState: expect.objectContaining({
          id: "default-editor-state",
        }),
      })
    );
  });

  it("should fallback to the convertFromHTML when JSON parse fails", () => {
    mocked(convertFromHTML).mockImplementation(
      () =>
        ({
          contentBlocks: "content-blocks",
          entityMap: "entity-map",
        } as any)
    );
    mocked(ContentState.createFromBlockArray).mockImplementation(
      () => "default-test-content" as any
    );

    render(
      <FormRichTextDraftEditor value={"unparsable-value"} onChange={() => {}} />
    );

    expect(mocked(convertFromHTML)).toHaveBeenCalledWith("unparsable-value");
    expect(mocked(ContentState.createFromBlockArray)).toHaveBeenCalledWith(
      "content-blocks",
      "entity-map"
    );
    expect(editorPropReceiver).toHaveBeenCalledWith(
      expect.objectContaining({
        editorState: expect.objectContaining({
          id: "default-editor-state",
        }),
      })
    );
  });

  it("should forward focus to the Editor", () => {
    const { getByTestId } = render(
      <FormRichTextDraftEditor
        value={JSON.stringify({ test: "value" })}
        onChange={() => {}}
      />
    );

    fireEvent.click(getByTestId("form-rich-text-draft-editor-container"));
    expect(getByTestId("editor-input")).toHaveFocus();
  });

  it("should call onChange with correct values on blur", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <FormRichTextDraftEditor
        value={JSON.stringify({ test: "value" })}
        onChange={onChange}
      />
    );

    fireEvent.change(getByTestId("editor-input"), {
      target: { value: "test-value-from-input-event" },
    });
    fireEvent.blur(getByTestId("form-rich-text-draft-editor-container"));

    expect(onChange).toHaveBeenCalledWith(
      JSON.stringify({ value: "test-value-from-input-event" })
    );
  });

  it.each(["BOLD", "ITALIC", "UNDERLINE"])(
    "should have correct text when %s style button is clicked",
    (styleType: string) => {
      testStyleButton(styleType);
    }
  );

  it.each(["unordered-list-item", "ordered-list-item"])(
    "should have correct text when %s block type button is clicked",
    (blockType: string) => {
      testBlockTypeButton(blockType);
    }
  );
});
