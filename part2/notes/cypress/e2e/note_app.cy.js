describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'andrew',
            username: 'bean',
            password: '123456seven'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('bean')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .contains('Wrong credentials')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
            .should('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })


    it('can open front page', () => {
        cy.contains('Notes')
    })

    it('can open login form', function() {
        cy.contains('login').click()
    })

    it('can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('bean')
        cy.get('#password').type('123456seven')
        cy.get('#login-button').click()
        cy.contains('andrew logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#username').type('bean')
            cy.get('#password').type('123456seven')
            cy.get('#login-button').click()
        })

        it('a new note can be created',
            function() {
                cy.contains('new note').click()
                cy.get('#note-input').type('a note created by cypress')
                cy.contains('save').click()
                cy.visit('http://localhost:3000')
                cy.contains('a note created by cypress')
            })

        describe('and a note exists', function() {

            beforeEach(function() {
                cy.contains('new note').click()
                cy.get('#note-input').type('another note cypress')
                cy.contains('save').click()
                cy.visit('http://localhost:3000')
            })

            it('it can be made not important', function() {
                cy.contains('another note cypress')
                    .contains('make not important')
                    .click()

                cy.contains('another note cypress')
                    .contains('make important')
            })

        })
    })
})
