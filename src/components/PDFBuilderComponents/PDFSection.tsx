import styled from "@react-pdf/styled-components";
import { FC } from "react";

const Root = styled.View`
  font-family: "TTCommonsPro";
  padding: 0 36px;
  width: 100%;
  color: #000;
  font-size: 9px;
`;

const FlexView = styled.View`
  display: flex;
  flex-direction: row;
`;

const ColumnView = styled.View`
  display: flex;
  flex-direction: column;
`;

const Header = styled.Text`
  font-weight: medium;
  font-style: medium;
  font-size: 10px;
  padding-bottom: 10px;
`;

const Hr = styled.View`
  height: 1px;
  border: 0.5px solid #000000;
  width: 87px;
  margin-bottom: 14px;
`;

type Props = {
  title: string;
};

export const PDFSection: FC<Props> = ({ children, title }) => {
  return (
    <Root>
      <FlexView>
        <ColumnView style={{ marginRight: "51px" }} fixed>
          <Hr />
          <Header>{title}</Header>
        </ColumnView>

        <ColumnView>
          <Hr style={{ width: "388px" }} fixed />
          {children}
        </ColumnView>
      </FlexView>
    </Root>
  );
};
