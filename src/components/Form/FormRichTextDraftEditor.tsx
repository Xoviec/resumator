import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// Icons
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Box, Divider } from "@mui/material";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  MouseEvent,
  ReactNode,
  useRef,
  useState,
  VoidFunctionComponent,
} from "react";
import { TooltipIconButton } from "../Material";

interface FormRichTextDraftEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormRichTextDraftEditor: VoidFunctionComponent<
  FormRichTextDraftEditorProps
> = ({ value, onChange }) => {
  let content;

  // Setup the editor.
  try {
    content = convertFromRaw(JSON.parse(value));
  } catch (err) {
    // If parsing fails, treat it as a raw text string.
    const { contentBlocks, entityMap } = convertFromHTML(value);
    content = ContentState.createFromBlockArray(contentBlocks, entityMap);
  }

  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );

  const handleFocus = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    editorRef?.current?.focus();
  };

  /**
   * Save the changes to the form when focus is lost.
   */
  const handleBlur = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    onChange(JSON.stringify(raw));
  };

  const renderBlockTypeButton = (type: string, tooltip: string, icon: ReactNode) => (
    <TooltipIconButton
      data-testid={`${type}-block-type-button`}
      tooltip={tooltip}
      active={hasBlockType(type)}
      onClick={() => toggleBlockType(type)}
      onMouseDown={(event) => event.preventDefault()}
    >
      {icon}
    </TooltipIconButton>
  );

  /**
   * Set a block type on the current cursor location or selected text.
   */
  const toggleBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const hasBlockType = (type: string) => {
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    return block.getType() === type;
  };

  const renderStyleButton = (style: string, tooltip: string, icon: ReactNode) => (
    <TooltipIconButton
      data-testid={`${style}-style-button`}
      tooltip={tooltip}
      active={hasStyle(style)}
      onClick={() => toggleStyle(style)}
      onMouseDown={(event) => event.preventDefault()}
    >
      {icon}
    </TooltipIconButton>
  );

  /**
   * Set a style on the current cursor location or selected text.
   */
  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const hasStyle = (style: string) => editorState.getCurrentInlineStyle().has(style);

  return (
    <Box
      data-testid="form-rich-text-draft-editor-container"
      onClick={handleFocus}
      onBlur={handleBlur}
      sx={{
        "& .DraftEditor-root": {
          padding: "4.5px",
          height: "unset",
          overflow: "auto",
        },
        "& ul, ol": {
          margin: 0,
        },
        display: "flex",
        flexDirection: "column",
        gridGap: 4,
        paddingX: 1,
        paddingY: 1,
        height: 400,
        flex: 1,
      }}
    >
      {/* Styling options */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Unordered list */}
        {renderBlockTypeButton(
          "unordered-list-item",
          "Unordered List",
          <FormatListBulletedIcon fontSize="small" />
        )}
        {/* Ordered list */}
        {renderBlockTypeButton(
          "ordered-list-item",
          "Ordered List",
          <FormatListNumberedIcon fontSize="small" />
        )}
        <Divider
          orientation="vertical"
          sx={{
            margin: "0 4px",
            height: "80%",
          }}
        />
        {/* Bold */}
        {renderStyleButton("BOLD", "Bold", <FormatBoldIcon fontSize="small" />)}
        {/* Italic */}
        {renderStyleButton(
          "ITALIC",
          "Italic",
          <FormatItalicIcon fontSize="small" />
        )}
        {/* Underlined */}
        {renderStyleButton(
          "UNDERLINE",
          "Underlined",
          <FormatUnderlinedIcon fontSize="small" />
        )}
      </Box>
      <Divider />
      <Editor
        spellCheck
        ref={editorRef}
        onTab={(e) => {
          e.preventDefault();
          setEditorState(RichUtils.onTab(e, editorState, 4));
        }}
        editorState={editorState}
        onChange={(state) => setEditorState(state)}
      />
    </Box>
  );
};
