import { act, fireEvent, render, screen } from "@testing-library/react";
import { MockTheme } from "../../mocks/MockTheme";
import {
  SocialLinks,
  SocialLinksProps,
  SocialLinkTypeToInfoMapping,
} from "./SocialLinks";

describe("SocialLinks", () => {
  const defaultProps = {
    socialLinks: [
      {
        link: "github.com/john",
        linkType: "github",
        title: null,
      },
      {
        link: "linkedin.com/john",
        linkType: "linkedin",
        title: null,
      },
    ],
    onSubmit: jest.fn(),
  } as SocialLinksProps;

  test("expect text content of social links to be displayed", () => {
    render(
      <MockTheme>
        <SocialLinks
          socialLinks={defaultProps.socialLinks}
          onSubmit={defaultProps.onSubmit}
        />
      </MockTheme>
    );
    defaultProps.socialLinks.forEach((item) => {
      const title = item.title || SocialLinkTypeToInfoMapping[item.linkType].title;
      expect(screen.getByText(item.link));
      expect(screen.getByText(title));
    });
  });

  test("expect edit dialog to be displayed on click AddIcon", async () => {
    render(
      <MockTheme>
        <SocialLinks
          socialLinks={defaultProps.socialLinks}
          onSubmit={defaultProps.onSubmit}
        />
      </MockTheme>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("AddIcon"));
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Add link");
  });

  test("expect edit dialog to be displayed on click EditIcon", async () => {
    render(
      <MockTheme>
        <SocialLinks
          socialLinks={defaultProps.socialLinks}
          onSubmit={defaultProps.onSubmit}
        />
      </MockTheme>
    );

    await act(async () => {
      fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Edit link");
  });

  test("expect onSubmit to be called on save social link", async () => {
    render(
      <MockTheme>
        <SocialLinks
          socialLinks={defaultProps.socialLinks}
          onSubmit={defaultProps.onSubmit}
        />
      </MockTheme>
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
