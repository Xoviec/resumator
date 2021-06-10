describe("resumes overview", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should display all resumes correctly", () => {
    cy.visit("/overview");

    cy.callFirestore("get", "resumes").then((resumes) => {
      cy.get("tbody").within(() => {
        cy.findAllByRole("cell")
          .parent()
          .should("have.length", resumes.length)
          .each((row, index) => {
            const resume: Resume = resumes[index];

            cy.wrap(row).within(() => {
              cy.findByRole("img")
                .should("have.attr", "src")
                .should("include", `${resume.personalia.avatar}.`);

              cy.findAllByRole("cell")
                .eq(1)
                .contains(
                  `${resume.personalia.firstName} ${resume.personalia.lastName}`
                );

              cy.findAllByRole("cell")
                .eq(2)
                .within(($city) => {
                  if (Cypress._.isEmpty(resume.personalia.city)) {
                    expect($city).to.be.empty;
                  } else {
                    expect($city).to.have.text(resume.personalia.city);
                  }
                });

              cy.findAllByRole("cell")
                .eq(3)
                .contains(resume.isImport ? /Inactive/i : /Active/i);

              cy.findByRole("button", { name: /Edit resume/i }).should("exist");
              cy.findByRole("button", { name: /Download PDF/i }).should("exist");
              cy.findByRole("button", { name: /Delete resume/i }).should("exist");
            });
          });
      });
    });
  });
});
