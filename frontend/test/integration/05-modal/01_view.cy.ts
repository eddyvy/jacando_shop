describe('Modal - View', () => {
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

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .contains('Add to cart')
      .click()

    cy.get('[data-testid="AddIcon"]').click()
    cy.get('[data-testid="AddIcon"]').click()

    cy.get('.productsGrid')
      .children()
      .eq(1)
      .contains('Add to cart')
      .click()

    cy.get('.productsGrid')
      .children()
      .eq(3)
      .contains('Add to cart')
      .click()

    cy.get('[data-testid="ShoppingCartIcon"] > path').click()
  })

  it('Should display all the selected items', () => {
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .should('contain', 'Broccoli')
      .should('contain', 'Spinach')
      .should('contain', 'Cucumber')
      .should('contain', '2.5 CHF')
      .should('contain', '1.75 CHF')
  })

  it('Should display the total cost', () => {
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(2)
      .should('contain', 'Total Price')
      .should('contain', '11.00 CHF')
  })

  it('Should display a "BUY" button', () => {
    cy.contains('Buy').should('exist')
  })
})
