describe("add a new resume", () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it("tests if button exists", () => {
    cy.findByRole("link")
      .should("have.attr", "href", "/creator")
      .and("include", "Add Resume");
  });
});
