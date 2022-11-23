import { act, fireEvent, render, screen } from "@testing-library/react";
import { sideProjects } from "../../mocks/mocks";
import { SideProjectModel } from "./SideProjectItem";
import { SideProjects } from "./SideProjects";

describe("SideProjects", () => {
  const defaultProps = {
    type: "Side Projects",
    projects: [sideProjects[0]] as SideProjectModel[],
    skills: [],
    onSubmit: jest.fn(),
  };

  test("expect text content of side projects to be displayed", () => {
    const { description, link, title } = defaultProps.projects[0];

    render(
      <SideProjects
        type={defaultProps.type}
        projects={defaultProps.projects}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(title);
    expect(screen.getByText(link)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test("expect edit dialog to be displayed on click AddIcon", async () => {
    render(
      <SideProjects
        type={defaultProps.type}
        projects={defaultProps.projects}
        onSubmit={defaultProps.onSubmit}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("AddIcon"));
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      `Add ${defaultProps.type}`
    );
  });

  test("expect onEdit to be called on click EditIcon", async () => {
    render(
      <SideProjects
        type={defaultProps.type}
        projects={defaultProps.projects}
        onSubmit={defaultProps.onSubmit}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      `Edit ${defaultProps.type}`
    );
  });

  test("expect edit dialog to be closed on click cancel", () => {
    render(
      <SideProjects
        type={defaultProps.type}
        projects={defaultProps.projects}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    fireEvent.click(screen.getByText(/cancel/i));

    const dialogTitle = screen.queryByText(`Edit ${defaultProps.type}`);
    expect(dialogTitle).not.toBeInTheDocument();
  });
});
