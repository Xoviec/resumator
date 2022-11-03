import { FC, ReactElement } from "react";
import { usePageTitle } from "../../hooks";

type Props = {
  title?: string;
  children: ReactElement;
};

export const Page: FC<Props> = ({ title = "", children }) => {
  usePageTitle(title);
  return <>{children}</>;
};
