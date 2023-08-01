describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB()
    cy.createUser('tester', 'p455w0rd', 'Cypress Will')
    cy.createUser('tester2', 'p455w0rd2', 'Cypress Kill')
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#input-username')
    cy.get('#input-password')
    cy.get('#button-login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('tester')
      cy.get('#input-password').type('p455w0rd')
      cy.get('#button-login').click()
      cy.contains('login successful').should(
        'have.css',
        'border-color',
        'rgb(0, 128, 0)'
      )
      cy.contains('Cypress Will logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('username')
      cy.get('#input-password').type('password')
      cy.get('#button-login').click()
      cy.contains('wrong credentials').should(
        'have.css',
        'border-color',
        'rgb(255, 0, 0)'
      )
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login('tester', 'p455w0rd')
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#input-title').type('A scientific tests')
        cy.get('#input-author').type('Dr Tester')
        cy.get('#input-url').type('blogurl.io')
        cy.get('#button-create').click()
        cy.contains('a new blog "A scientific tests" by "Dr Tester" added')
        cy.contains('A scientific tests by Dr Tester')
      })

      describe('When logged in', function () {
        beforeEach(function () {
          cy.createBlog('A scientific tests', 'Dr Tester', 'blogurl.io')
          cy.visit('')
        })

        it('User can like a blog', function () {
          cy.contains('A scientific tests by Dr Tester')
            .parent()
            .contains('view')
            .click()
          cy.contains('likes: 0')
            .parent()
            .find('button')
            .contains('like')
            .click()
          cy.contains('likes: 1')
        })

        it('User who created a blog can delete it', function () {
          cy.contains('A scientific tests by Dr Tester')
            .parent()
            .contains('view')
            .click()
          cy.contains('delete').click()
          cy.contains(
            'a blog "A scientific tests" by "Dr Tester" deleted'
          ).should('have.css', 'border-color', 'rgb(0, 128, 0)')
          cy.should('not.contain', 'A scientific tests by Dr Tester')
        })

        it('Another user can not see delete button', function () {
          cy.login('tester2', 'p455w0rd2')
          cy.contains('A scientific tests by Dr Tester')
            .parent()
            .contains('view')
            .click()
          cy.should('not.contain', 'delete')
        })

        it('If there several blogs they sorted by like count descending', function () {
          cy.createBlog('Another tests', 'Mc Tester', 'anotherblogurl.io', 14)
          cy.createBlog(
            'Superior tests',
            'Lil Tester',
            'superiorblogurl.io',
            13
          )
          cy.visit('')
          cy.get('.blog')
            .contains('A scientific tests by Dr Tester')
            .parent()
            .contains('view')
            .click()
            .wait(100)
          cy.get('.blog')
            .contains('Another tests')
            .parent()
            .contains('view')
            .click()
            .wait(100)
          cy.get('.blog')
            .contains('Superior tests')
            .parent()
            .contains('view')
            .click()
            .wait(100)
          cy.get('.blog')
            .eq(0)
            .should('contain', 'likes: 14')
            .and('contain', 'Another tests')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'likes: 13')
            .and('contain', 'Superior tests')
          cy.get('.blog')
            .eq(2)
            .should('contain', 'likes: 0')
            .and('contain', 'A scientific tests by Dr Tester')
          cy.get('.blog')
            .contains('Superior tests')
            .parent()
            .parent()
            .and('contain', 'likes: 13')
            .find('button')
            .contains('like')
            .click()
            .wait(100)
          cy.get('.blog')
            .contains('Superior tests')
            .parent()
            .parent()
            .and('contain', 'likes: 14')
            .find('button')
            .contains('like')
            .click()
            .wait(100)
          cy.get('.blog')
            .eq(0)
            .should('contain', 'likes: 15')
            .and('contain', 'Superior tests')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'likes: 14')
            .and('contain', 'Another tests')
          cy.get('.blog')
            .eq(2)
            .should('contain', 'likes: 0')
            .and('contain', 'A scientific tests by Dr Tester')
        })
      })
    })
  })
})
