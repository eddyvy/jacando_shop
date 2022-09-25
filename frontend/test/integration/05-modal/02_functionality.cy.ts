describe('Modal - Functionality', () => {
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

  it('Should add an item from cart modal correctly', () => {
    // Total price
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(2)
      .should('contain', 'Total Price')
      .should('contain', '11.00 CHF')

    // Count
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(2)
      .should('contain', '3')

    // Add button
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(3)
      .click()

    // Total price
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(2)
      .should('contain', 'Total Price')
      .should('contain', '13.50 CHF')

    // Count
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(2)
      .should('contain', '4')
  })

  it('Should remove an item from cart modal correctly', () => {
    // Total price
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(2)
      .should('contain', 'Total Price')
      .should('contain', '11.00 CHF')

    // Count
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(2)
      .should('contain', '3')

    // Delete button
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(1)
      .click()

    // Total price
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(2)
      .should('contain', 'Total Price')
      .should('contain', '8.50 CHF')

    // Count
    cy.contains('Your Shopping Cart')
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(2)
      .should('contain', '2')
  })

  it('Should create a new order for the database when buying the cart', () => {
    cy.intercept('http://localhost:4000', (req) => {
      expect(JSON.stringify(req.body.variables)).equal(
        JSON.stringify({
          products: [1, 1, 1, 2, 4],
        }),
      )
    }).as('Post')
    cy.contains('Buy').click()

    cy.get('.swal2-confirm').should('be.visible').click()

    cy.wait('@Post')

    cy.get('.swal2-popup').should('contain', 'Done!')
    cy.get('.swal2-popup').should('contain', 'Order correctly done!')
  })
})
