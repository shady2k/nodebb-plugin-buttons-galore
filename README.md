# NodeBB: Buttons Galore

This plugin aims to add several buttons to the NodeBB composer in the future. As for now, I'm still trying to learn how to accomplish this without breaking everything (which this plugin has, a few times). This plugin is designed for those using Github flavored Markdown (why wouldn't you be?). As a result, make sure that your NodeBB install is using this Markdown flavor.


##Accomplished
~~Strikethrough effect~~
```
  Code tags
  ```
  
> Easy Quote button for websites or a user
  

##Future? 
* Underline (fa-underline) - _Will require an HTML span_
* Alignments - _Will require an HTML span, as GitHub Markdown only allows for alignment of tables by default_
  * Left (fa-align-left)
  * Center (fa-align-center)
  * Right (fa-align-right)
* Change order of buttons in composer / mesh with default ones - _This way Undersline and strikethrough could be closer to Bold and Italics_

### Regarding Colors and Spoilers
There are already plugins for NodeBB that allow the use of spoilers and colors in posts, so I won't be incorporating them into this plugin. As a side note, this entire project is already a fork from psychobunny's spoilers plugin. I don't want to step on the toes of these plugin authors.

## Installation

npm install nodebb-plugin-buttons-galore
