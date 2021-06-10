describe("renders the login page", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/");
  });

  it("renders correctly", () => {
    cy.findByRole("img", { name: /logo/i })
      .should("have.attr", "src")
      .should("include", "frontmen-logo");

    cy.findByRole("heading", { level: 1 }).contains(/Frontmen CV creator/i);

    cy.findByRole("button", { name: /Login with your Frontmen account/i }).should(
      "exist"
    );
  });
});
