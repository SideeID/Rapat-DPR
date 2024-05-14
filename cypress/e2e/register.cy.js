/**
 * - Registrasi
 *   - harus menampilkan halaman registrasi dengan benar
 *   - harus menampilkan peringatan ketika nama kosong
 *   - harus menampilkan peringatan ketika email kosong
 *   - harus menampilkan peringatan ketika password kosong
 *   - harus menampilkan peringatan ketika nama, email, dan password kosong
 *   - harus menampilkan peringatan ketika email tidak valid
 *   - harus menampilkan peringatan ketika fungsi registrasi mengembalikan error
 */

describe('Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('harus menampilkan halaman registrasi dengan benar', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('harus menampilkan peringatan ketika nama kosong', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika email kosong', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika password kosong', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');

    cy.get('input[placeholder="Email"]').type('johndoe@example.com');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika nama, email, dan password kosong', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('harus menampilkan peringatan ketika email tidak valid', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');

    cy.get('input[placeholder="Email"]').type('invalidemail');

    cy.get('input[placeholder="Password"]').type('password123');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('harus menampilkan peringatan ketika fungsi registrasi mengembalikan error', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');

    cy.get('input[placeholder="Email"]').type('dimas@gmail.com');

    cy.get('input[placeholder="Password"]').type('password123');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Register failed');
    });
  });
});
