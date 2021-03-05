//import "cypress-localstorage-commands"

describe('Initial Test', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('http://127.0.0.1:5500/src');
    });

    it('First Test', () => {
        expect(true).to.equal(true);
    });
});

describe('Theme Tests', () => {
    it('Grey Theme', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('#themeGrey').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
    });
});

describe('Break Tests', () => {
    it('test skip pomo', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#timerStart').click();

        cy.get('#end').click();

        cy.get('#timerStart').should('have.text', 'Break');
    })
})