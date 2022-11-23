import { fireEvent, render } from "@testing-library/react";
import { mocked } from "jest-mock";
import { SortableContainer } from "react-sortable-hoc";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import { FormSkillsSelectAutocomplete } from "./FormSkillsSelectAutocomplete";

jest.mock("../../context/SkillsContext/SkillsContext");
jest.mock("react-sortable-hoc");

beforeEach(jest.clearAllMocks);

describe("FormSkillsSelectAutocomplete", () => {
  it("should render SortableSelect with correct props", async () => {
    const SortableSelect = jest.fn(() => <div>sortable-container</div>);

    mocked(SortableContainer).mockImplementation(() => SortableSelect as any);

    mocked(useSkillsContext).mockImplementation(
      () =>
        ({
          skillList: [],
          updateSkillList: () => {},
        } as any)
    );

    render(
      <FormSkillsSelectAutocomplete
        label="test-label"
        value={[{ name: "test-skill1" }]}
        onChange={() => {}}
      />
    );

    expect(SortableSelect).toMatchSnapshot();
  });

  it("should call onChange when sorting ends", async () => {
    const SortableSelect = ({ onSortEnd }: any) => {
      return (
        <button
          onClick={() => {
            onSortEnd({ oldIndex: 0, newIndex: 1 });
          }}
          data-testid="sortable-select"
        >
          sortable-select
        </button>
      );
    };

    mocked(SortableContainer).mockImplementation(() => SortableSelect as any);

    mocked(useSkillsContext).mockImplementation(
      () =>
        ({
          skillList: [],
          updateSkillList: () => {},
        } as any)
    );

    const onChange = jest.fn();

    const { getByTestId } = render(
      <FormSkillsSelectAutocomplete
        label="test-label"
        value={[{ name: "test-skill1" }, { name: "test-skill2" }]}
        onChange={onChange}
      />
    );

    fireEvent.click(getByTestId("sortable-select"));
    expect(onChange).toHaveBeenCalledWith([
      { name: "test-skill2", value: "test-skill2", label: "test-skill2" },
      { name: "test-skill1", value: "test-skill1", label: "test-skill1" },
    ]);
  });

  it("should call onChange when data changes", async () => {
    const SortableSelect = ({ onChange }: any) => {
      return (
        <button
          onClick={() => {
            onChange([
              { name: "test-skill2", value: "test-skill2", label: "test-skill2" },
              { name: "test-skill1", value: "test-skill1", label: "test-skill1" },
            ]);
          }}
          data-testid="sortable-select"
        >
          sortable-select
        </button>
      );
    };

    mocked(SortableContainer).mockImplementation(() => SortableSelect as any);

    mocked(useSkillsContext).mockImplementation(
      () =>
        ({
          skillList: [],
          updateSkillList: () => {},
        } as any)
    );

    const onChange = jest.fn();

    const { getByTestId } = render(
      <FormSkillsSelectAutocomplete
        label="test-label"
        value={[{ name: "test-skill1" }, { name: "test-skill2" }]}
        onChange={onChange}
      />
    );

    fireEvent.click(getByTestId("sortable-select"));
    expect(onChange).toHaveBeenCalledWith([
      { name: "test-skill2", value: "test-skill2", label: "test-skill2" },
      { name: "test-skill1", value: "test-skill1", label: "test-skill1" },
    ]);
  });

  it("should provide options from skillList", async () => {
    const SortableSelect = jest.fn(() => <div>sortable-container</div>);

    mocked(SortableContainer).mockImplementation(() => SortableSelect as any);

    mocked(useSkillsContext).mockImplementation(
      () =>
        ({
          skillList: ["skill1", "skill2"],
          updateSkillList: () => {},
        } as any)
    );

    const onChange = jest.fn();

    render(
      <FormSkillsSelectAutocomplete
        label="test-label"
        value={[{ name: "test-skill1" }, { name: "test-skill2" }]}
        onChange={onChange}
      />
    );

    const sortableSelect: [][] = SortableSelect.mock.calls[0];

    expect(sortableSelect[0]).toMatchObject({
      options: [
        { value: "skill1", label: "skill1", isActive: true },
        { value: "skill2", label: "skill2", isActive: true },
      ],
    });
  });
});
