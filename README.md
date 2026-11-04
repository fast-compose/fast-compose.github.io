<div align="center">

<img src="logo.png" width="160" alt="Fast Compose logo">

# fast-compose.github.io

**The Fast Compose website: [fast-compose.github.io](https://fast-compose.github.io)**

</div>

---

## Pages

| Path | Page |
|---|---|
| [`/`](https://fast-compose.github.io) | Home page: what Fast Compose is, the playground, compose-script, the IDE plugin, the KMP library and the CLI |
| [`/playground/`](https://fast-compose.github.io/playground/) | [Fast Compose Playground](https://github.com/fast-compose/playground): run Jetpack Compose online |

## Home page

The home page is one Compose app inside a single `<script type="text/compose-content">` tag in
[`index.html`](index.html), rendered by [compose-script](https://github.com/fast-compose/compose-script). The HTML
holds only the meta tags, a loader shown until compose-script starts, and a `<noscript>` fallback with links.

## Files

| File | Contents |
|---|---|
| `index.html` | The home page |
| `logo.png` | The Fast Compose logo, used by the loader and link previews |
| `playground/` | The playground's web build |
| `google5c60200d1c49780f.html` | Google Search Console verification |

## License

[Apache 2.0](https://github.com/fast-compose/fast-compose/blob/main/LICENSE)
