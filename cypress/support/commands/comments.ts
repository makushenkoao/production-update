export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();
};

export const removeComment = (commentId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/comments/${commentId}`,
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(test: string): Chainable<void>;
            removeComment(commentId: string): Chainable<void>;
        }
    }
}
