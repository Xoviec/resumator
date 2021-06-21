describe("renders the login page", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/");
  });

  it("renders correctly", () => {
    cy.findByRole("img", { name: /logo/i }).should("have.attr", "src");

    cy.findByRole("heading", { level: 1 }).contains(/Login/i);
    cy.findByRole("button", { name: /Login/i }).should("exist");
  });
});
