"use strict";

var plugin = {};

plugin.parse = function(data, callback) {
	var code = /(?:<pre>.*?<\/pre>|<code>.*?<\/code>)/g;

	if ( data && typeof data === 'string' ) {
		//preview
		data = parser(data, code);
	} else if ( data.postData && data.postData.content && data.postData.content ) {
		//post
		data.postData.content =  parser(data.postData.content, code);
	} else if ( data.userData && data.userData.signature && data.userData.signature ) {
		//signature
		data.userData.signature =  data.userData.signature
			//Handle line breaks inside a paragraph.
			.replace(/([^>]+)\n/g, "$1<br>")
			//Text align left
			.replace(/[^`]?<p>&lt;-((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-left">$1</p>')
			//Text align right
			.replace(/[^`]?<p>-&gt;((?:.|\n)*?)-&gt;<\/p>/gm,'<p class="text-right">$1</p>')
			//Text align center
			.replace(/[^`\n]?<p>-&gt;((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-center">$1</p>')
			//Text align justify
			.replace(/[^`]?<p>=&gt;((?:.|\n)*?)&lt;=<\/p>/gm,'<p class="text-justify">$1</p>')
			//Underlined text.
			.replace(/[^`]?~((?:.|\n)*?)~/g, "<u>$1</u>");
	}
	
	callback(null, data);
};

function parser(data, code) {
	//create a variable to capture code content
	var codesTag = [];
	//replace all codes tags by a var we can use in a regex later
	data = data.replace(code, function(match){
		codesTag.push(match);
		return '__CODE__';
	});
	//do the replace on the whole
	data = data
		//Handle line breaks inside a paragraph.
		.replace(/([^>]+)\n/g, "$1<br>")
		//Text align left
		.replace(/[^`]?<p>&lt;-((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-left">$1</p>')
		//Text align right
		.replace(/[^`]?<p>-&gt;((?:.|\n)*?)-&gt;<\/p>/gm,'<p class="text-right">$1</p>')
		//Text align center
		.replace(/[^`\n]?<p>-&gt;((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-center">$1</p>')
		//Text align justify
		.replace(/[^`]?<p>=&gt;((?:.|\n)*?)&lt;=<\/p>/gm,'<p class="text-justify">$1</p>')
		//Underlined text.
		.replace(/[^`]?~((?:.|\n)*?)~/g, "<u>$1</u>");

	//replace CODE with previously stocked code content
	data = data.replace(/__CODE__/g, function(){
		return codesTag.shift();
	});
	return data;
};

module.exports = plugin;