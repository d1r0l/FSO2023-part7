// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', `${Cypress.env('server_api_url')}/testing/reset`)
})

Cypress.Commands.add('createUser', (username, password, name) => {
  cy.request('POST', `${Cypress.env('server_api_url')}/users`, {
    username: username,
    password: password,
    name: name
  })
})

Cypress.Commands.add('createBlog', (title, author, url, likes) => {
  const userData = JSON.parse(localStorage.getItem('loggedBloglistAppUser'))
  cy.request({
    url: `${Cypress.env('server_api_url')}/blogs`,
    method: 'POST',
    body: {
      title: title,
      author: author,
      url: url,
      likes: likes ? likes : 0,
      user: userData.id
    },
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${Cypress.env('server_api_url')}/login`, {
    username: username,
    password: password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistAppUser', JSON.stringify(body))
  })
  cy.visit('')
})
