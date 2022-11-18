import { render } from "@testing-library/react";
import LanguagesHelpModal from "./LanguagesHelpModal";

describe("PageHeader", () => {
  it("It renders correctly", () => {
    const initialRender = render(
      <LanguagesHelpModal onClose={() => {}} isModalOpen={true} proficiencies={[]} />
    );
    expect(initialRender).toMatchSnapshot();
  });
});
