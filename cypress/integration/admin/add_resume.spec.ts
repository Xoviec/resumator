describe("add a new resume", () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it("checks if button exists", () => {
    cy.findByRole("button", { name: /Overview/i }).click();
    cy.findByRole("link", { name: /Add resume/i }).should(
      "have.attr",
      "href",
      "/creator"
    );
  });
});
