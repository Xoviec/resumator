import { Text, View, StyleSheet } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentBlock,
  RawDraftContentState,
} from "draft-js";
import { VoidFunctionComponent } from "react";
// helpers
import { checkListType } from "../../helpers";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontStyle: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
  italic: {
    fontWeight: "normal",
    fontStyle: "italic",
  },
  "header-one": {
    fontSize: 18,
  },
  "header-two": {
    fontSize: 16,
  },
  "header-three": {
    fontSize: 14,
  },
  "header-four": {
    fontSize: 12,
  },
  "header-five": {
    fontSize: 10,
  },
  "header-six": {
    fontSize: 8,
  },
});
const TextArea = styled.Text`
  font-size: 8px;
  width: 280px;
  margin-top: 6px;
  font-family: "TTCommonsPro";
`;

const generateInlineStyle = (block: RawDraftContentBlock) => {
  const inlineStyleRanges = block.inlineStyleRanges;
  const text = block.text;
  const nestedTexts = [];
  let offset = 0;

  if (inlineStyleRanges.length === 0) {
    return block.text;
  }

  for (let i = 0; i < inlineStyleRanges.length; i++) {
    const inlineStyle = inlineStyleRanges[i];
    const extractUnstyledText = text.slice(offset, inlineStyle.offset);
    const extractStyledText = text.slice(
      inlineStyle.offset,
      inlineStyle.offset + inlineStyle.length
    );

    offset = inlineStyle.offset + inlineStyle.length;
    nestedTexts.push(<Text>{extractUnstyledText}</Text>);

    let styledText = <Text></Text>;
    switch (inlineStyle.style) {
      case "UNDERLINE":
        styledText = <Text style={styles.underline}>{extractStyledText}</Text>;
        break;
      case "ITALIC":
        styledText = <Text style={styles.italic}>{extractStyledText}</Text>;
        break;
      case "BOLD":
        styledText = <Text style={styles.bold}>{extractStyledText}</Text>;
        break;
    }

    nestedTexts.push(styledText);
  }

  return nestedTexts;
};

const generatePrefix = (block: RawDraftContentBlock, counter: number) => {
  if (block.type === "unordered-list-item")
    return "\u00A0\u00A0\u00A0\u00A0\u00A0\u2022\u00A0\u00A0";
  if (block.type === "ordered-list-item")
    return `\u00A0\u00A0\u00A0\u00A0\u00A0${counter}.\u00A0\u00A0`;
};

type MaybeEditorState = ContentState | RawDraftContentState | EditorState | null;

interface PDFDescriptionProps {
  description: string;
}

export const PDFDescription: VoidFunctionComponent<PDFDescriptionProps> = ({
  description,
}) => {
  if (!description || !description.length) {
    return null;
  }

  let editor: MaybeEditorState;
  try {
    editor = convertFromRaw(JSON.parse(description));
    editor = EditorState.createWithContent(editor);
    editor = convertToRaw(editor.getCurrentContent());
  } catch (e) {
    editor = null;
  }

  if (!editor) {
    return <TextArea>{description}</TextArea>;
  }
  let counter = 0;
  return (
    <View>
      {editor.blocks.map((block, index) => {
        if (block.type === "ordered-list-item") {
          counter += 1;
        } else {
          counter = 0;
        }
        return (
          <View key={`${index}`} style={{ position: "relative" }}>
            <TextArea
              style={{
                position: "absolute",
                left: (() => {
                  if (checkListType(block.type) && block.depth >= 1) {
                    return block.depth * 10 + "px";
                  }
                  return "-10px";
                })(),
                ...styles[block.type],
              }}
            >
              {generatePrefix(block, counter)}
            </TextArea>

            <TextArea
              style={{
                ...styles[block.type],
                marginLeft: (() => {
                  if (checkListType(block.type) && block.depth === 0) {
                    return "10px";
                  }

                  if (checkListType(block.type) && block.depth >= 1) {
                    return block.depth * 10 + 20 + "px";
                  }

                  return "0px";
                })(),
              }}
            >
              {generateInlineStyle(block)}
            </TextArea>
          </View>
        );
      })}
    </View>
  );
};
