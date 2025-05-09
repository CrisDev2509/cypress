describe('Pruebas del modulo TODO', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/heroes')
        
        cy.get('li > button').should('have.text', "Login")

        cy.get('li > .undefined').click()

        cy.get('.modal-container > .open')

        cy.get('[data-cy="email"]').type('admin@test.com')

        cy.get('[data-cy="password"]').type('test123{enter}')
    })

    it('Verificar que se puede crear un nuevo heroe', () => {

        cy.get('li > a > button').should('have.text', "Create New Hero")

        cy.get('li > a > button').should('have.text', "Create New Hero").click()

        cy.get('[data-cy="nameInput"]').type('Heroe de prueba')

        cy.get('[data-cy="priceInput"]').type('100')

        cy.get('[data-cy="fansInput"]').type('40')

        cy.get('[data-cy="savesInput"]').type('10')

        cy.get('select').select(['1', '2', '3'])

        cy.get('form > button').click()

        cy.get('[data-cy="name"]').should('contain.text', 'Heroe de prueba');

    })

    it('Probar que se puede dar like un heroe', () => {

        cy.get('[data-cy="hero-card"]').each(($card) => {
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
              
              cy.wrap($card).find('[data-cy="fans"]').should('have.text', '40');
              return false; 
            }
          });
        
        cy.get('[data-cy="hero-card"]').each(($card) => {
            // Si el texto del nombre es exactamente "Heroe de prueba"
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
              // Clic en el botón Eliminar dentro de esa tarjeta
              cy.wrap($card).find('[data-cy="like"]').click();
              return false; // Detiene el each después del primer match
            }
          });

        cy.get('[data-cy="hero-card"]').each(($card) => {
        // Si el texto del nombre es exactamente "Heroe de prueba"
        if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
            // Clic en el botón Eliminar dentro de esa tarjeta
            cy.wrap($card).find('[data-cy="fans"]').should('have.text', '41');
            return false; // Detiene el each después del primer match
        }
        });
          
    })

    it('Probar que se puede dar contratar un heroe', () => {

        cy.get('[data-cy="hero-card"]').each(($card) => {
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
              
              cy.wrap($card).find('[data-cy="saves"]').should('have.text', '10');
              return false; 
            }
          });
        
        cy.get('[data-cy="hero-card"]').each(($card) => {
            // Si el texto del nombre es exactamente "Heroe de prueba"
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
              // Clic en el botón Eliminar dentro de esa tarjeta
              cy.wrap($card).find('[data-cy="money"]').click();
              return false; // Detiene el each después del primer match
            }
          });

          cy.get('.modal')

          cy.get('.bg-red-600').click()

        cy.get('[data-cy="hero-card"]').each(($card) => {
            
        if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
            
            cy.wrap($card).find('[data-cy="saves"]').should('have.text', '11');
            return false; 
        }
        });
          
    })

    it('Probar que se puede editar un heroe', () => {
        
        cy.get('[data-cy="hero-card"]').each(($card) => {
            
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba') {
                
              cy.wrap($card).find('[data-cy="pencil"]').click();
              return false;
            }
          });
          
          cy.get('button').should('contain.text', 'Submit')

          cy.get('[data-cy="nameInput"]').type('-editado{enter}')

          cy.get('[data-cy="name"]').should('contain.text', 'Heroe de prueba-editado');
          
    })

    it('Probar que se puede eliminar un heroe', () => {
        
        cy.get('[data-cy="hero-card"]').each(($card) => {
            
            if ($card.find('[data-cy="name"]').text().trim() === 'Heroe de prueba-editado') {
                
              cy.wrap($card).find('[data-cy="trash"]').click();
              return false;
            }
          });
          
        cy.get('.modal')

        cy.get('.bg-red-600').click()
    })
})