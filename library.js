"use strict";

var plugin = {};

plugin.parse = function(postContent, callback) {

	//console.log(postContent);

	postContent = postContent

			//Handle line breaks inside a paragraph.
			.replace(/([^>]+)\n/g, "$1<br>")
			//Text align left
			.replace(/[^`]?<p>&lt;-((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-left">$1</p>')
			//Text align center
			.replace(/[^`\n]?<p>-&gt;((?:.|\n)*?)&lt;-<\/p>/gm,'<p class="text-center">$1</p>')
			//Text align right
			.replace(/[^`]?<p>-&gt;((?:.|\n)*?)-&gt;<\/p>/gm,'<p class="text-right">$1</p>')
			//Text align center
			.replace(/[^`]?<p>=&gt;((?:.|\n)*?)&lt;=<\/p>/gm,'<p class="text-justify">$1</p>')
			//Underlined text.
			.replace(/[^`]?~((?:.|\n)*?)~/g, "<u>$1</u>");

	callback(null, postContent);
};

module.exports = plugin;