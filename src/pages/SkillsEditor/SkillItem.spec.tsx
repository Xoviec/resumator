import { fireEvent, render, waitFor } from "@testing-library/react";
import { SkillItem, SkillItemProps } from "./SkillItem";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Skill Item", () => {
  const history = createMemoryHistory();

  it("should always render content", () => {
    const props = {
      handleChangeSkill: jest.fn(),
      didChange: false,
      setDeleteIndex: jest.fn(),
      setOpenConfirmation: jest.fn(),
      skill: "",
    } as SkillItemProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillItem {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });

  it("should render input typed and handler called 1 time", async () => {
    const props = {
      handleChangeSkill: jest.fn(),
      didChange: false,
      setDeleteIndex: jest.fn(),
      setOpenConfirmation: jest.fn(),
      skill: "",
    } as SkillItemProps;

    const utils = render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillItem {...props} />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const input = utils.getByTestId("content-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "2" } });
      expect(input.value).toBe("2");
    });

    expect(props.handleChangeSkill).toBeCalledTimes(1);
  });

  it("should render input typed with changed style", async () => {
    const props = {
      handleChangeSkill: jest.fn(),
      didChange: true,
      setDeleteIndex: jest.fn(),
      setOpenConfirmation: jest.fn(),
      skill: "",
    } as SkillItemProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillItem {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });

  it("should render fire click event", async () => {
    const props = {
      handleChangeSkill: jest.fn(),
      didChange: false,
      setDeleteIndex: jest.fn(),
      setOpenConfirmation: jest.fn(),
      skill: "",
    } as SkillItemProps;

    const utils = render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillItem {...props} />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const btn = utils.getByLabelText("delete") as HTMLButtonElement;
      fireEvent.click(btn);
      expect(props.setDeleteIndex).toBeCalledTimes(1);
      expect(props.setOpenConfirmation).toBeCalledTimes(1);
    });
  });
});
