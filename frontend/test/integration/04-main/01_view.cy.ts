describe('Main - View', () => {
  const apiResponse = {
    data: {
      vegetables: [
        {
          id: 1,
          category: 'vegetable',
          name: 'broccoli',
          price: 2.5,
          description:
            'Broccoli, Brassica oleracea, is an herbaceous annual or biennialgrown for its edible flower heads which are used as a vegetable.',
          stock: 22,
          image: 'broccoli.png',
          isLocal: true,
          __typename: 'Vegetable',
        },
        {
          id: 2,
          category: 'vegetable',
          name: 'spinach',
          price: 1.75,
          description:
            'Spinach is a herbaceous plant whose leaves, green and arrangedin rosette, are eaten raw or cooked.',
          stock: 14,
          image: 'spinach.png',
          isLocal: false,
          __typename: 'Vegetable',
        },
        {
          id: 3,
          category: 'vegetable',
          name: 'peas',
          price: 1.02,
          description:
            'A pea is a most commonly green, occasionally golden yellow, or infrequently purplepod-shaped vegetable, widely grown as a cool-season vegetable crop.',
          stock: 1,
          image: 'peas.png',
          isLocal: true,
          __typename: 'Vegetable',
        },
        {
          id: 4,
          category: 'vegetable',
          name: 'cucumber',
          price: 1.75,
          description:
            'Cucumber is a summer vegetable, with elongate shape and 15cm long. Its skinis of a green colour, turning into yellow in maturation.',
          stock: 2,
          image: 'cucumber.png',
          isLocal: false,
          __typename: 'Vegetable',
        },
        {
          id: 5,
          category: 'vegetable',
          name: 'eggplant',
          price: 3.03,
          description:
            'The fruit is a large egg-shaped berry with a glossy surface that varies in colourfrom dark purple to red, pink, yellowish, or white and is sometimes striped;the colour and shape of the white variety is the source of the common name',
          stock: 9,
          image: 'eggplant.png',
          isLocal: true,
          __typename: 'Vegetable',
        },
      ],
    },
  }

  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.intercept('http://localhost:4000', apiResponse).as('Post')
    cy.visit('/vegetables')
    cy.wait('@Post')
  })

  it('Should display the 5 items correctly', () => {
    cy.get('.productsGrid')
      .should('be.visible')
      .children()
      .should('have.length', 5)
      .each((prod) => {
        expect(prod).to.be.visible
      })
  })

  it('Should display the price', () => {
    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('contain', 'Price')
      .should('contain', '2.5 CHF')
  })

  it('Should display the description', () => {
    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should(
        'contain',
        'Broccoli, Brassica oleracea, is an herbaceous annual or biennialgrown for its edible flower heads which are used as a vegetable.',
      )
  })

  it('Should display the amount in stock', () => {
    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('contain', 'Stock')
      .should('contain', '22')
  })

  it('Should display the pagination buttons correctly', () => {
    cy.get(
      '.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root',
    ).should('be.visible')
    cy.get(
      '.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root',
    ).should('be.visible')
    cy.get(
      '.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root',
    ).should('be.visible')
    cy.get(
      '.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root',
    ).should('be.visible')
    cy.get(
      '.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root',
    ).should('be.visible')
  })
})
