describe("admin logged in view", () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it("title should be correct", () => {
    cy.findByRole("heading", { level: 6 }).should("have.text", "Resumes Overview");
  });
});
