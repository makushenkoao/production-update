let currentArticleId: string;

describe('User visits article page', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });
    it('And sees the content of the article', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });
    it('User sees recommendations', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('And leave a comment', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('test');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('And puts an evaluation', () => {
        // cy.intercept('GET', '**/articles/*', {
        //     fixture: 'article-details.json',
        // });
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
