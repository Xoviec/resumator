describe("resumes overview", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should display all resumes correctly", () => {
    cy.visit("/overview");

    cy.callFirestore("get", "resumes").then((resumes) => {
      cy.findByRole("button", { name: /Overview/i }).click();

      cy.findByTestId("overview-list").within(() => {
        cy.findAllByRole("listitem")
          .should("have.length", resumes.length)
          .each(($listItem, index) => {
            const resume: Resume = resumes[index];
            const { id, personalia, avatar } = resume;
            const { firstName, lastName, avatar: pAvatar } = personalia;

            cy.wrap($listItem).within(() => {
              const name =
                firstName || lastName
                  ? `${firstName} ${lastName}`
                  : `No name - ${id}`;

              cy.findByRole("img")
                .should("have.attr", "src")
                .should("include", `${pAvatar || avatar}.`);

              cy.findByRole("link").contains(name);

              cy.findByRole("button", { name: /Delete resume/i }).should(
                "not.be.visible"
              );
            });
          });
      });
    });
  });
});
