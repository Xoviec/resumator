import { Personalia } from "../../../src/types/Resume";

const getLinkName = (personalia: Personalia, id: string) =>
  personalia.firstName || personalia.lastName
    ? `${personalia.firstName} ${personalia.lastName}`
    : `No name - ${id}`;

describe("resumes overview", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.findByRole("button", { name: /Overview/i }).click();
  });

  it("should display all resumes correctly", () => {
    cy.callFirestore("get", "resumes").then((resumes) => {
      cy.findByTestId("overview-list").within(() => {
        cy.findAllByRole("listitem")
          .should("have.length", resumes.length)
          .each(($listItem, index) => {
            const resume: Resume = resumes[index];
            const { id, personalia } = resume;

            cy.wrap($listItem).within(() => {
              cy.findByRole("link").contains(getLinkName(personalia, id));

              cy.findByRole("button", { name: /Delete/i }).should("not.be.visible");
            });
          });
      });
    });
  });

  it("should display the correct resume on visit", () => {
    cy.callFirestore("get", "resumes").then((resumes) => {
      cy.findByTestId("overview-list")
        .findAllByRole("listitem")
        .each(($_, index) => {
          const resume: Resume = resumes[index];
          const { id, personalia } = resume;

          cy.visit(`/resume/${id}`);

          const title = `${personalia.firstName || "John"} ${
            personalia.lastName || "Doe"
          }`;

          cy.findByRole("heading", { level: 3 }).contains(title);

          // Test up to 5 times
          if (index === 4) {
            return false;
          }
        });
    });
  });
});
