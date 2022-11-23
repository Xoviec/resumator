import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import {
  useFirebaseApp,
  FirebaseAppContextType,
} from "../../context/FirebaseContext/FirebaseContext";
import { personalia } from "../../mocks/mocks";
import { TopSection } from "./TopSection";

jest.mock("../../context/FirebaseContext/FirebaseContext");

const defaultProps = {
  personalia,
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
    const fallbackText = `${personalia.firstName} has nothing to tell you.`;

    render(
      <TopSection
        personalia={defaultProps.personalia}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });

  test("expect name to be displayed", () => {
    const name = `${defaultProps.personalia.firstName} ${defaultProps.personalia.lastName}`;

    render(
      <TopSection
        personalia={defaultProps.personalia}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(name);
  });

  test("expect role to be displayed", () => {
    render(
      <TopSection
        personalia={defaultProps.personalia}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByText(defaultProps.personalia.role)).toBeInTheDocument();
  });

  test("expect email to be displayed", () => {
    render(
      <TopSection
        personalia={defaultProps.personalia}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByText(defaultProps.personalia.email)).toBeInTheDocument();
  });
});
