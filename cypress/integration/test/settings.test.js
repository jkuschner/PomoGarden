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




describe('Counter Tests', () => {
    it('error handling, no tests', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    
    });

    //random test to see if I can modify elements with JS
    //makes settings text disappear with background color
    it('test', () => {
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

/*describe('Force time down', () => {
    it('make pomo 1 second', () => {
        //cy.get('#timerStart').click();

        cy.window().then(win => win.startTimer(2 - 1));

        //cy.wait(8000);

        cy.get('[type="checkbox"]')
            .first()
            .check({force:true});
    });
});*/

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

/*  this test fails because of the way volume-slider is implemented
 *  ideally we would want to replicate the design of the Air Horn lab's volume slider
 *  but for our purposes, this is not an issue the user would run across
 */
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
describe('Volume slider test', () => {
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
  });

