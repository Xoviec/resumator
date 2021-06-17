describe("admin logged in view", () => {
  beforeEach(() => {
    cy.login().visit("/");
  });

  it("title should be correct", () => {
    cy.findByRole("button", { name: /Overview/i }).should("exist");
  });
});
