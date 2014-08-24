$('document').ready(function() {
	require(['composer', 'composer/controls'], function(composer, controls) {
		composer.addButton('fa fa-eye-slash', function(textarea, selectionStart, selectionEnd) {
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, '```\n"Insert Language Name"\n```');
				controls.updateTextareaSelection(textarea, selectionStart + 3, selectionStart + 26);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '```\n','\n```');
				controls.updateTextareaSelection(textarea, selectionStart + 3, selectionEnd + 3);
			}
		});
	});
});
