/// <reference types="cypress" />

context("Overview page", () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it("title should be correct", () => {
    cy.get("h6").should("have.text", "Resumes Overview");
  });
});
