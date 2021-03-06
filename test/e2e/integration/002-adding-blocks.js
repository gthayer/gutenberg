describe( 'Adding blocks', () => {
	before( () => {
		cy.newPost();
	} );

	it( 'Should insert content using the placeholder, the quick inserter, the regular inserter', () => {
		const lastBlockSelector = '.editor-block-list__block-edit:last [contenteditable="true"]:first';

		// Using the placeholder
		cy.get( '.editor-default-block-appender' ).click();
		cy.get( lastBlockSelector ).type( 'Paragraph block' );

		// Using the slash command
		cy.get( '.editor-inserter-with-shortcuts [aria-label="Add Paragraph"]' ).click();
		cy.get( lastBlockSelector ).type( '/quote{enter}' );
		cy.get( lastBlockSelector ).type( 'Quote block' );

		// Using the regular inserter
		cy.get( '.edit-post-header [aria-label="Add block"]' ).click();
		cy.get( '[placeholder="Search for a block"]' ).type( 'code' );
		cy.get( '.editor-inserter__block' ).contains( 'Code' ).click();
		cy.get( '[placeholder="Write code…"]' ).type( 'Code block' );

		// Switch to Text Mode to check HTML Output
		cy.get( '.edit-post-ellipsis-menu [aria-label="More"]' ).click();
		cy.get( 'button' ).contains( 'Code Editor' ).click();

		// Assertions
		cy.get( '.edit-post-text-editor' )
			.should( 'contain', 'Paragraph block' )
			.should( 'contain', 'Quote block' )
			.should( 'contain', 'Code block' );
	} );
} );
