//import "cypress-localstorage-commands"

describe('Initial Test', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        //cy.request('test.html');
        //cy.visit('https://jkuschner.github.io/cse110-w21-team19/');
        cy.visit('http://127.0.0.1:5500/src');
        //cy.request('/src');
    });

    it('First Test', () => {
        expect(true).to.equal(true);
    });
});

describe('Theme Tests', () => {
    it('Grey Theme', () => {
        /*cy.get('#navButton').click();

        cy.get('#themeGrey').click();*/

        cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });


});