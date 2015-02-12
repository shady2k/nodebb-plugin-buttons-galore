(function(module) {
        "use strict";
        var plugin = {};

        plugin.parse = function(postContent, callback) {

                var code = /(?:<pre>.*?<\/pre>|<code>.*?<\/code>)/g;

                //console.log(postContent);

                if (postContent && typeof postContent === 'string') {
                        //preview
                        postContent = parser(postContent, code);
                } else if (postContent.postData && postContent.postData.content) {
                        //post
                        postContent.postData.content =  parser(postContent.postData.content, code);
                } else if (postContent.userData && postContent.userData.signature) {
                        //signature
                        postContent.userData.signature =  parser(postContent.userData.signature);
                }

                callback(null, postContent);
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
                //Handle line breaks inside a paragraph
                data = data.replace(/[^\S](\n)/g, "<br>");
                //Text align left
                data = data.replace(/<p>&lt;-([^-]*(?:(?!&lt;-+|&lt;-)*)*)&lt;-<\/p>/gm,'<p class="text-left">$1</p>');
                //Text align center
                data = data.replace(/<p>-&gt;([^-]*(?:(?!-&gt;+|&lt;-)*)*)&lt;-<\/p>/gm,'<p class="text-center">$1</p>');
                //Text align right
                data = data.replace(/<p>-&gt;([^-]*(?:(?!-&gt;+|-&gt;)*)*)-&gt;<\/p>/gm,'<p class="text-right">$1</p>');
                //Text align justify
                data = data.replace(/<p>=&gt;([^=]*(?:(?!=&gt;+|&lt;=)*)*)&lt;=<\/p>/gm,'<p class="text-justify">$1</p>');
                //Underlined text
                data = data.replace(/~([\S\s]*?)~/g, "<u>$1</u>");
                //replace CODE with previously stocked code content
                data = data.replace(/__CODE__/, function(){
                        return codesTag.shift();
                });
                return data;
        }

        module.exports = plugin;

}(module));
