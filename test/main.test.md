## NOTE:

Our repo has a testing branch named **testing**. Along with the manual tests, we run some cypress testing. This document is simply to show the code for the cypress tests we run from that branch using the command `./node_modules/.bin/cypress open`

```
//This test simply opens the localsite and does a true test
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

//This test checks if theme switching works
describe('Theme Tests', () => {
    it('Orange Theme', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('[value = "themeOrange"]').click({ force: true });

        cy.get('#outerCircle').should('have.css', 'border', '19.7969px solid rgb(255, 180, 34)');

        cy.get('#navButton').click();
    });

    it('Onion Theme', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('[value = "themeOnion"]').click({ force: true });

        cy.get('#outerCircle').should('have.css', 'border', '19.7969px solid rgb(143, 90, 136)');

        cy.get('#navButton').click();
    });
});

//This test checks if the alert modal boxes function appropriately
describe('Alert Tests', () => {
    it('test skip pomo', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#timerStart').click();

        cy.get('#skip').click({ force: true });
        cy.get('#modal-confirm').click({ force: true});

        cy.get('#timerStart').should('have.text', 'Break');
    });

    it('test cancel skip pomo', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#timerStart').click();

        cy.get('#skip').click({ force: true });
        cy.get('#modal-cancel').click({ force: true});

        cy.get('#time').should('have.css', 'visibility', 'visible');

        cy.wait(5000);
    });
});

//This test is an experiment to see if I can modify elements within cypress
describe('Counter Tests', () => {
    it('error handling, no tests', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

    });

    it(' modify nav bar text colors test', () => {
        cy.get('body')
            .invoke('css', 'background-color')
            .then(background => {
                cy.wait(1000);
                cy.get('h2')
                    .invoke('attr', 'style', `color: ${background}`)
                    .then(new_element => {
                        expect(new_element).to.have.css('color', background);
                    });
                cy.get('h2').should('have.css', 'color', background);
            });
    });
});

//Test the visibility of animations under various button press conditions
describe('Test animation visibility', () => {
    it('Test if animations are present', () => {
        cy.get('#pulseCircle1').should('have.css', 'display', 'block');
        cy.get('#pulseCircle2').should('have.css', 'display', 'block');
        cy.get('#pulseCircle3').should('have.css', 'display', 'block');
        cy.get('#pulseCircle4').should('have.css', 'display', 'block');
    });

    it('Test if animations disappear after click', () => {
        cy.get('#timerStart').click();

        cy.get('#pulseCircle1').should('have.css', 'display', 'none');
        cy.get('#pulseCircle2').should('have.css', 'display', 'none');
        cy.get('#pulseCircle3').should('have.css', 'display', 'none');
        cy.get('#pulseCircle4').should('have.css', 'display', 'none');
    });
});

//  This test fails because of the way volume-slider is implemented
//  ideally we would want to replicate the design of the Air Horn lab's volume slider
//  but for our purposes, this is not an issue the user would run across.
//  However, improving the slider would prove beneficial to simplify future dev work

//  Test if volume slider works as intended and changes volume icons
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
describe('Volume slider test (fails due to implementation, not error)', () => {
    it('Updates the value when changing a range input', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.get('#navButton').click();

        cy.get('input[type="range"]').then(($range) => {
            // get the DOM node
            const range = $range[0];
            // set the value manually
            nativeInputValueSetter.call(range, 15);
            // now dispatch the event
            range.dispatchEvent(new Event('change', { value: 15, bubbles: true }));
        });

        cy.wait(5000);

        cy.get('#volume-slider').should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(193, 168, 180) 0%, rgb(193, 168, 180) 15%, rgb(255, 255, 255) 15%, rgb(255, 255, 255) 100%) repeat scroll 0% 0% / auto padding-box border-box')

    });

    it('Check on volume number', () => {
        cy.get('#volume-number').should('have.text', '15')

    });

    it('Check on volume image', () => {
        cy.get('#volume-image')
            .then(function($el) {
                expect($el).to.have.attr('src', './images/volume-level-1.svg')
            });
    });
  });
```
