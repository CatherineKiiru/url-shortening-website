### How to add a horizontal line in CSS

There are two ways to do this:

.header .main-navgation div:first-child {
border-bottom: 1px solid white;
}

Add a <hr> tag in HTML and give it a 100% width

```html
<nav class="main-navigation">
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="#resources">Resources</a>
  </div>
  <hr class="line" />
  <div class="nav-buttons">
    <a href="#" class="log-in">Login</a>
    <a href="#" class="sign-up btn btn-sm">Sign Up</a>
  </div>
</nav>
```

```css
.line {
  width: 100%;
}
```

```html
<nav class="navigation">
    <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#resources">Resources</a>
        </div>
        <div class="nav-buttons">
            <a href="#" class="log-in">Login</a>
              <a href="#" class="sign-up btn btn-sm">Sign Up</a>
            </div>
          </nav>         
```


