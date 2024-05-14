/**
 * - Komponen Login
 *   - harus menampilkan halaman login dengan benar
 *   - harus menampilkan peringatan ketika email kosong
 *   - harus menampilkan peringatan ketika password kosong
 *   - harus menampilkan peringatan ketika email dan password salah
 *   - harus menampilkan halaman utama ketika email dan password benar
 */

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('harus menampilkan peringatan ketika email kosong', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika password kosong', () => {
    cy.get('input[placeholder="Email"]').type('testuser@example.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika email dan password salah', () => {
    cy.get('input[placeholder="Email"]').type('testuser@example.com');

    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is incorrect');
    });
  });

  it('harus menampilkan halaman utama ketika email dan password benar', () => {
    cy.get('input[placeholder="Email"]').type('dimastest@gmail.com');

    cy.get('input[placeholder="Password"]').type('dimastest');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Verify the homepage URL
    cy.url().should('include', '/');
    cy.get('button').contains('Sign out').should('be.visible');

    // Verify the homepage elements
    cy.get('option').contains(/^All Categories$/);
  });
});
