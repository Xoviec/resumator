describe("add a new resume", () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it("tests if button exists", () => {
    cy.findByRole("link", { name: /Add resume/i }).should(
      "have.attr",
      "href",
      "/creator"
    );
  });
});
