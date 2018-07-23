---
title: "Flexbox"
path: "/blog/flexbox"
---
# Flexbox

## Пример шаблона страницы с хидером, футером и контентом:

```css
//main.css


html,
body {
  height: 100%;
  margin: 0
}

.box {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.box .row {
  border: 1px dotted grey;
}

.box .row.header {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.content {
  flex: 1 1 auto;
}

.box .row.footer {
  flex: 0 1 40px;
}
```

```html
//index.html

<div class="box">
  <div class="row header">
    <p><b>header</b>
      <br />
      <br />(sized to content)</p>
  </div>
  <div class="row content">
    <p>
      <b>content</b>
      (fills remaining space)
    </p>
  </div>
  <div class="row footer">
    <p><b>footer</b> (fixed height)</p>
  </div>
</div>
```