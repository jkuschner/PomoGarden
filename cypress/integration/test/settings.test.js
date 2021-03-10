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
    it('Blue Theme', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('[value = "themeBlue"]').click({ force: true });

        cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');

        cy.get('#navButton').click();
    });

    it('Grey Theme', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('[value = "themeGrey"]').click({ force: true });

        cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
    });
});

describe('Alert Tests', () => {
    it('test skip pomo', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#timerStart').click();

        cy.get('#skip-confirm').click({ force: true });

        cy.get('#timerStart').should('have.text', 'Break');
    });
});

describe('Alert Tests', () => {
    it('test cancel skip pomo', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#timerStart').click();

        cy.get('#skip-cancel').click({ force: true });

        cy.get('#time').should('have.css', 'visibility', 'visible');
    });
});

/*describe('Break Tests', () => {
    it('test break', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        let cmp;
        cy.get('#innerCircle').should(($s) => {
            cmp = $s.text();
        });

        cy.get('#timerStart').click();

        cy.wait(7000);

        cy.get('#first-pomo')
            .invoke('attr', 'style', `border: ${background}`)
            .then(new_elem => {
                expect(new_elem).to.have.css('background-color', background);
            });
        //.should('have.css', 'background-color');
        //cy.get('#first-pomo').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    });
});*/

describe('Force time down', () => {
    it('make pomo 1 second', () => {
        
    });
});


describe('Counter Tests', () => {
    it('Assigning css color', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    
        /*cy.get('#timerStart').click();
    
        cy.wait(8000);*/
       
    });

    it('test', () => {
        cy.get('#outerCircle')
            .invoke('css', 'background-color')
            .then(background => {
                cy.wait(1000);
                /*cy.get('#first-pomo')
                    .invoke('attr', 'style', `background-color: ${background}`)
                    .then(new_element => {
                        expect(new_element).to.have.css('background-color', background);
                    });*/
                cy.get('#first-pomo').should('have.css', 'background-color', background);
            });
    });
});