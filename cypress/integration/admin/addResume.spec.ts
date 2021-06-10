describe('add a new resume', () => {
  beforeEach(() => {
    cy.login().visit("/overview");
  });

  it('add a new resume', () => {
    cy.findByRole('link').should('have.attr', 'href').and('include', 'Add Resume')
  })
})