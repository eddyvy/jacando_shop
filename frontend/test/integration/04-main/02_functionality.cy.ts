describe('Main - Functionality', () => {
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
  const apiResponse2 = {
    data: {
      vegetables: [
        {
          id: 6,
          category: 'vegetable',
          name: 'potato',
          price: 3.42,
          description:
            'The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetableand a fruit native to the Americas.',
          stock: 20,
          image: 'potato.png',
          isLocal: false,
          __typename: 'Vegetable',
        },
        {
          id: 7,
          category: 'vegetable',
          name: 'tomato',
          price: 1.25,
          description:
            'They are usually red, scarlet, or yellow, though green and purple varieties do exist,and they vary in shape from almost spherical to oval and elongate to pear-shaped',
          stock: 14,
          image: 'tomato.png',
          isLocal: false,
          __typename: 'Vegetable',
        },
        {
          id: 8,
          category: 'vegetable',
          name: 'pumpkin',
          price: 8.45,
          description:
            'A pumpkin is a cultivar of winter squash that is round with smooth, slightly ribbed skin,and is most often deep yellow to orange in coloration. ',
          stock: 0,
          image: 'pumpkin.png',
          isLocal: false,
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

  it('When clicking to "ADD TO CART" it should add an item to the cart showing a badge', () => {
    cy.get('.MuiBadge-badge').should('not.be.visible')

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .contains('Add to cart')
      .click()

    cy.get('.MuiBadge-badge')
      .should('be.visible')
      .should('contain', '1')

    cy.get('[data-testid="RemoveIcon"]').should('be.visible')

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('not.contain', 'Add to cart')
  })

  it('When clicking to "ADD TO CART" it should display the counter with remove and add buttons', () => {
    cy.get('[data-testid="AddIcon"]').should('not.exist')
    cy.get('[data-testid="RemoveIcon"]').should('not.exist')

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .contains('Add to cart')
      .click()

    cy.get('[data-testid="AddIcon"]').should('be.visible')
    cy.get('[data-testid="RemoveIcon"]').should('be.visible')

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('not.contain', 'Add to cart')
  })

  it('Add and Remove buttons are working correctly', () => {
    cy.get('.productsGrid')
      .children()
      .eq(0)
      .contains('Add to cart')
      .click()

    cy.get('[data-testid="AddIcon"]').click()

    cy.get('.MuiBadge-badge')
      .should('be.visible')
      .should('contain', '2')

    cy.get('[data-testid="RemoveIcon"]').click()

    cy.get('.MuiBadge-badge')
      .should('be.visible')
      .should('contain', '1')

    cy.get('[data-testid="RemoveIcon"]').click()

    cy.get('[data-testid="AddIcon"]').should('not.exist')
    cy.get('[data-testid="RemoveIcon"]').should('not.exist')

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('contain', 'Add to cart')
  })

  it('Should do the correct call when clicking the pagination button', () => {
    cy.intercept('http://localhost:4000', (req) => {
      expect(JSON.stringify(req.body.variables)).equal(
        JSON.stringify({
          offset: 5,
          limit: 5,
        }),
      )
    }).as('Post')

    cy.get(
      '.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root',
    ).click()

    cy.wait('@Post')

    cy.intercept('http://localhost:4000', (req) => {
      expect(JSON.stringify(req.body.variables)).equal(
        JSON.stringify({
          offset: 0,
          limit: 5,
        }),
      )
    }).as('Post')

    cy.get(
      '.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root',
    ).click()

    cy.wait('@Post')
  })

  it('Should display correctly the new data after pagination', () => {
    cy.intercept('http://localhost:4000', apiResponse2).as('Post')

    cy.get(
      '.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root',
    ).click()

    cy.get('.productsGrid')
      .should('be.visible')
      .children()
      .should('have.length', 3)
      .each((prod) => {
        expect(prod).to.be.visible
      })

    cy.get('.productsGrid')
      .children()
      .eq(0)
      .should('contain', 'Potato')
  })
})
