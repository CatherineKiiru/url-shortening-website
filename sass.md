The SCSS syntax uses the file extension .scss which is a superset of CSS. 
Sass stylesheets are mainly made up of style rules that contain property declarations. 

SCSS also allows us to create reusable variables that you can store CSS values and reuse across your stylesheet. Here's an example:

```Bash
$font-stack: Poppins, sans-serif;
$primary-color: #3464B;

Heading {
    font: 50% $font-stack;
    color: $primary-color;
}
```

Sass will process the variables above and output CSS with the variable values into the CSS file. 

### Core SCSS Elements
Nesting
Mixins
Partials
Extend/Inheritance

### How to Structure your Sass Project
Sass allows you to seperate stylesheet files into different components called *partials*. These partials are imported into a master file using the `@import` directive. This is similar to how we seperate files into components in React. You'll import files into a master stylsheet that houses all your imports. You can name it anything, so for this article we'll call it the `main.scss`.



