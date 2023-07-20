describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', '/api/users', {
      username: 'jake222',
      name: 'Jake22',
      password: 'jake22'
    })
    cy.request('POST', '/api/users', {
      username: 'käyttisjokaeilisää',
      name: '234',
      password: 'salasana'
    })
  })


  it('Login form is shown', function() {
    cy.contains('login')
  })




  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('jake222')
      cy.get('input:last').type('jake22')
      cy.contains('login').click()

    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('asdfsadf')
      cy.get('input:last').type('asdfsadf')
      cy.contains('login').click()
      cy.contains('väärä käyttis tai').should('be.visible')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('jake222')
      cy.get('input:last').type('jake22')
      cy.contains('login').click()
      cy.contains('Uus blogi').click()
      cy.get('input:first').type('testausblogi')
      cy.get('input:eq(1)').type('aaa')
      cy.get('input:last').type('aaa')
      cy.contains('Submit').click()
    
    })

    it('A blog can be created', function() {
      cy.contains('Uus blogi').click()
      cy.get('input:first').type('TESTIBLOGICYPRESS')
      cy.get('input:eq(1)').type('aaa')
      cy.get('input:last').type('aaa')
      cy.contains('Submit').click()
      cy.contains('TESTIBLOGICYPRESS').should('be.visible')

    })
    it('A blog can be liked', function() {
      cy.contains('Info').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1').should('be.visible')
    })
    it('A blog can be deleted', function() {
      cy.contains('Info').click()
      cy.contains('Delete').click()
      cy.contains('TESTIBLOGICYPRESS').should('not.exist')
    })

    it('Delete doesnt show for wrong user', function() {
      cy.contains('Logout').click()
      cy.get('input:first').type('käyttisjokaeilisää')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Info').click()
      cy.contains('Delete').should('not.exist')
      cy.contains('hide').click()

    })


    it('Blogs are in the right order', function() {

      cy.document().then((doc) => {
        const htmlContent = doc.documentElement.outerHTML;
        console.log(htmlContent);
      });

      cy.contains('Uus blogi').click()
      cy.get('input:first').type('testi2')
      cy.get('input:eq(1)').type('aaa')
      cy.get('input:last').type('aaa')
      cy.contains('Submit').click()
      cy.contains('testausblogitesti2').should('be.visible')
    




      cy.contains('Uus blogi').click()
      cy.get('input:first').type('testi3')
      cy.get('input:eq(1)').type('aaa')
      cy.get('input:last').type('aaa')
      cy.contains('Submit').click()
      cy.contains('testausblogitesti2testi3').should('be.visible')

     
        cy.contains('testausblogitesti2').contains('button', 'Info').click();
        cy.contains('testausblogitesti2').contains('button', 'Like').click();
        cy.contains('testausblogitesti2').contains('Likes: 1').should('be.visible');
   
 
        cy.contains('testausblogi').contains('button', 'Info').click();
        cy.contains('testausblogi').contains('button', 'Like').click();
        cy.contains('testausblogi').contains('Likes: 1').should('be.visible');
        cy.contains('testausblogi').contains('button', 'Like').click();
        cy.contains('testausblogi').contains('Likes: 2').should('be.visible');
    

     cy.get('.blogii').eq(0).should('contain', 'testausblogi')
     cy.get('.blogii').eq(1).should('contain', 'testausblogitesti2')

    })
    

  })



})

