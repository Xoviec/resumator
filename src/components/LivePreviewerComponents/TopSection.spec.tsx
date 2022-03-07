import { render, screen } from "@testing-library/react";
import {
  useFirebaseApp,
  FirebaseAppContextType,
} from "../../context/FirebaseContext/FirebaseContext";
import { TopSection, PersonaliaModel } from "./TopSection";
import { mocked } from "jest-mock";

jest.mock("../../context/FirebaseContext/FirebaseContext");

const defaultProps = {
  personalia: {} as PersonaliaModel,
  onSubmit: jest.fn(),
};

describe("TopSection Tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: true },
    } as FirebaseAppContextType);
  });

  test("expect fallback introduction to be displayed", () => {
    const personalia = {
      firstName: "Donald",
      lastName: "Trump",
      email: "donald.trump@frontmen.nl",
    } as PersonaliaModel;
    const fallbackText = `Donald has nothing to tell you.`;

    render(<TopSection personalia={personalia} onSubmit={defaultProps.onSubmit} />);
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });

  const personalia = {
    firstName: "Donald",
    lastName: "Trump",
    email: "donald.trump@frontmen.nl",
  } as PersonaliaModel;

  test("expect name to be Donald Trump", () => {
    const name = `${personalia.firstName} ${personalia.lastName}`;

    render(<TopSection personalia={personalia} onSubmit={defaultProps.onSubmit} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(name);
  });

  test("expect email to be displayed", () => {
    render(<TopSection personalia={personalia} onSubmit={defaultProps.onSubmit} />);
    expect(screen.getByText(personalia.email)).toBeInTheDocument();
  });
});
