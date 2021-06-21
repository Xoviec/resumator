describe("add resume", () => {
  beforeEach(() => {
    // cleanup
    cy.callFirestore("get", "resumes").then((resumes) => {
      resumes.forEach((resume: Resume) => {
        if (!resume?.personalia?.email) {
          cy.callFirestore("delete", `resumes/${resume.id}`);
        }
      });
    });

    cy.login().visit("/");
    cy.findByRole("button", { name: /Overview/i }).click();
  });

  it("adds a new resume", () => {
    let resumesCount: number;

    cy.findByTestId("overview-list").within(() => {
      cy.findAllByRole("listitem")
        .its("length")
        .then((count) => {
          resumesCount = count;
        });
    });

    cy.findByRole("button", { name: /Add Resume/i })
      .should("have.attr", "href", "/new")
      .click();

    cy.intercept({
      method: "POST",
      url: "https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/**",
    }).as("addResume");
    cy.wait("@addResume");
    cy.findByRole("button", { name: /Go to overview/i }).click();

    cy.findByRole("button", { name: /Overview/i }).click();
    cy.findByTestId("overview-list").within(() => {
      cy.findAllByRole("listitem").should("have.length", resumesCount + 1);
    });
  });
});
