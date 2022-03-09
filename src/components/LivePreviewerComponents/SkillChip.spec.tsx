import { fireEvent, render, screen } from "@testing-library/react";
import { SkillChip, SkillChipProps } from "./SkillChip";

describe("SkillChip", () => {
  const defaultProps = {
    label: "Label",
    onDelete: jest.fn(),
    onActiveChange: jest.fn(),
    isActive: true,
  } as SkillChipProps;

  test("expect label to be displayed", () => {
    render(
      <SkillChip
        label={defaultProps.label}
        onDelete={defaultProps.onDelete}
        onActiveChange={defaultProps.onActiveChange}
        isActive={defaultProps.isActive}
      />
    );
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  test("expect onActiveChange to be called on click", () => {
    render(
      <SkillChip
        label={defaultProps.label}
        onDelete={defaultProps.onDelete}
        onActiveChange={defaultProps.onActiveChange}
        isActive={defaultProps.isActive}
      />
    );

    fireEvent.click(screen.getByText(defaultProps.label));
    expect(defaultProps.onActiveChange).toHaveBeenCalledTimes(1);
  });
});
