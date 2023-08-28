### Sass Architecture
One of the benefits of using a preprocessor like Sass is the ability to modularize your codebase into seperate files, giving you the flexibility and maintainablitiy benefit that a typical CSS project often lacks.

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
Sass allows you to seperate stylesheet files into different components called *partials*. These partials are imported into a master file using the `@import` directive. This is similar to how we seperate features or sections into different component files in React. You'll import files into a master stylsheet that houses all your imports. You can name it anything, so for this article we'll call it the `main.scss`.

There is a recommended pattern according to the [Sass Architecture Guideline](https://sass-guidelin.es/#architecture). It's the 7-1 Pattern which represents 7 folders and 1 root file (typically main.scss or style.scss). The `main.scss` file holds all imports which are compiled into the CSS stylesheet during production. You can name this file anyway you prefer, it does not have to be called main.scss

The 7 folders include:

- abstracts/
- base/
- components/
- layout/
- pages/
- themes/
- vendors/
- main.scss

Within these folders, we now have several files representing different functionalities across your aoplication. These files are follow a standard naming convention where they are hyphen-delimited. Here's an example from Sass Guidelines on how to name the files:

![Image](/images/file-structure.png)

What Does Each Folder Represent?

#### Abstracts Folder
Holds all the global variables,tools and Sass helpers used throughout your project. E.g. Mixins, variables, functions, and placeholders. These files use the hyphen-delimited naming convention. E.g. _mixins.scss

#### Base Folder
This folder holds your project's boilerplate code and acts as the root directory for your project.

#### Components Folder
Contains bits and sections of your project. E.g buttons, slider section, Navbar, carousel, etc - similar to how we have seperate components in React or Vue. This is one of the features that makes Sass a greate CSS preprocessor because it allows you to seperate concerns and simplifies debugging. 

#### Layout Folder


