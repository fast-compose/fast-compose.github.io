<div align="center">

<img src="logo.png" width="160" alt="Fast Compose logo">

# fast-compose.github.io

**The Fast Compose website: [fast-compose.github.io](https://fast-compose.github.io)**

</div>

---

## Pages

| Path | Page |
|---|---|
| [`/`](https://fast-compose.github.io) | Home page: what Fast Compose is, the playground, compose-script, the Android Studio plugin, the VS Code extension, the KMP library and the CLI |
| [`/playground/`](https://fast-compose.github.io/playground/) | [Fast Compose Playground](https://github.com/fast-compose/playground): run Jetpack Compose online |
| [`/try/`](https://fast-compose.github.io/try/) | Run Jetpack Compose online with compose-script: an editor beside a live result |
| [`/learn/`](https://fast-compose.github.io/learn/) | Jetpack Compose lessons with live examples: [Text](https://fast-compose.github.io/learn/text/), [Column, Row and Box](https://fast-compose.github.io/learn/layouts/), [Button and State](https://fast-compose.github.io/learn/state/) |

## Home page

The home page is one Compose app inside a single `<script type="text/compose-content">` tag in
[`index.html`](index.html), rendered by [compose-script](https://github.com/fast-compose/compose-script), styled by an `AppTheme` Material 3 theme. The HTML
holds only the meta tags, a loader shown until compose-script starts, and a `<noscript>` fallback with links.

## Try page

[`try/index.html`](try/index.html) is an editor beside a result pane, running the code with compose-script.

- The editor is [CodeMirror 5](https://codemirror.net/5/) from cdnjs, in the site's colors: Kotlin, plus an overlay
  that colors capitalized names and function calls. With **Show HTML**, the HTML is colored and the code inside
  `<script type="text/compose-content">` and `text/compose-preview` tags is colored as Kotlin. If CodeMirror doesn't
  load, the plain textarea is used.

- The code is the body of a composable. **Show HTML** (off by default) turns it into the whole web page that holds it,
  which can be edited and run as is; turning it off reads the code back from the page's first
  `<script type="text/compose-content">`.
- **Run** or Ctrl + Enter writes a new document into the result iframe, since compose-script reads its tags once.
- The page address keeps the code as `#code=…`, or the page as `#html=…`, in URL-safe Base64 without padding, so a
  reload or a shared link brings it back.
- **Open in Playground** opens the code as a `@Preview` function in the playground.
- The bar between the panes resizes them: drag it, use the arrow keys (Shift for bigger steps) or double click it to
  reset. The panes are side by side, or stacked on screens up to 760 px wide. The size is saved in `localStorage`.

## Learn pages

Plain HTML pages, one per lesson, so search engines can read the text. Each example is a
`<script type="text/compose-content">` inside a `<div class="example">`. [`learn/learn.js`](learn/learn.js) turns it
into a highlighted code block, the live result rendered by compose-script, a **Copy** button and a **Try it Yourself**
link that opens the code in the try page. Paths are relative, so the pages also open from local files.

To add a lesson, copy a lesson folder, change its text and examples, and add it to every page's sidebar and to
`sitemap.xml`.

## Files

| File | Contents |
|---|---|
| `index.html` | The home page |
| `try/` | The try page |
| `learn/` | The Learn pages: `index.html`, a folder per lesson, `learn.css` (also used by the try page) and `learn.js` |
| `logo.png` | The Fast Compose logo, used by the loader and link previews |
| `images/` | Screenshots of the Android Studio plugin and the VS Code extension |
| `playground/` | The playground's web build |
| `sitemap.xml` | Lists the home page, the playground, the try page and the Learn pages for search engines |
| `robots.txt` | Allows all crawlers and points to the sitemap |
| `google5c60200d1c49780f.html` | Google Search Console verification |

## License

[Apache 2.0](https://github.com/fast-compose/fast-compose/blob/main/LICENSE)
