import { fireEvent, render, screen } from "@testing-library/react";
import { sideProjects } from "../../mocks/mocks";
import { SideProjectItem, SideProjectModel } from "./SideProjectItem";

describe("SideProjectItem", () => {
  const defaultProps = {
    type: "Side projects",
    projectItem: sideProjects[0] as SideProjectModel,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  test("expect text content of side project to be displayed", () => {
    const { description, link, title } = defaultProps.projectItem;
    render(
      <SideProjectItem
        type={defaultProps.type}
        projectItem={defaultProps.projectItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(title);
    expect(screen.getByText(link)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test("expect onDelete to be called on click DeleteIcon", () => {
    render(
      <SideProjectItem
        type={defaultProps.type}
        projectItem={defaultProps.projectItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    fireEvent.click(screen.getByText(/yes/i)); // Confirm delete
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  test("expect onEdit to be called on click EditIcon", () => {
    render(
      <SideProjectItem
        type={defaultProps.type}
        projectItem={defaultProps.projectItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });
});
