describe("renders the login page", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  
  it("renders correctly", () => {
    cy.findByRole('button', {name: /Login with your Frontmen account/}).should("exist")
  })
})