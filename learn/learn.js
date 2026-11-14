// Turns each <div class="example"> holding a <script type="text/compose-content"> into
// a highlighted code block, the live result and a "Try it Yourself" link to the /try/ page.
// Runs at the end of <body>, before compose-script replaces the scripts on DOMContentLoaded.
(function () {
    // The try page sits next to the learn folder.
    var TRY_IT = new URL("../try/", document.currentScript.src).href;

    // Removes the indentation shared by every line, and blank lines at both ends.
    function dedent(text) {
        var lines = text.replace(/\t/g, "    ").split("\n");
        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
        var indent = Math.min.apply(null, lines.filter(function (l) { return l.trim(); })
            .map(function (l) { return l.match(/^ */)[0].length; }));
        return lines.map(function (l) { return l.slice(indent); }).join("\n");
    }

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    var TOKENS = new RegExp([
        "(\\/\\/[^\\n]*)",                                          // 1 comment
        "(\"(?:[^\"\\\\\\n]|\\\\.)*\")",                            // 2 string
        "(@\\w+)",                                                  // 3 annotation
        "\\b(0x[0-9A-Fa-f]+|\\d+(?:\\.\\d+)?f?)\\b",                // 4 number
        "\\b(val|var|fun|if|else|by|for|in|when|return|true|false|null|while|class|data|object)\\b", // 5 keyword
        "\\b([A-Z]\\w*)\\b",                                        // 6 type or composable
        "\\b([a-z]\\w*)(?=\\s*[({])"                                // 7 function call
    ].join("|"), "g");
    var CLASSES = [null, "comment", "str", "ann", "num", "kw", "type", "fn"];

    // Wraps Kotlin tokens in spans for coloring.
    function highlight(code) {
        var out = "", last = 0, match;
        TOKENS.lastIndex = 0;
        while ((match = TOKENS.exec(code))) {
            out += escapeHtml(code.slice(last, match.index));
            for (var i = 1; i < CLASSES.length; i++) {
                if (match[i] !== undefined) {
                    out += '<span class="tok-' + CLASSES[i] + '">' + escapeHtml(match[0]) + "</span>";
                    break;
                }
            }
            last = TOKENS.lastIndex;
        }
        return out + escapeHtml(code.slice(last));
    }

    // Base64 (URL-safe, without padding) of the UTF-8 bytes, as the try page expects.
    function base64Url(text) {
        var bytes = new TextEncoder().encode(text), binary = "";
        bytes.forEach(function (b) { binary += String.fromCharCode(b); });
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function tryItLink(code) {
        return TRY_IT + "#code=" + base64Url(code);
    }

    function element(tag, className, html) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (html !== undefined) el.innerHTML = html;
        return el;
    }

    document.querySelectorAll(".example").forEach(function (example) {
        var script = example.querySelector('script[type="text/compose-content"]');
        if (!script) return;
        var code = dedent(script.textContent);

        var head = element("div", "example-head", "<span>Example</span>");
        var copy = element("button", "copy-btn", "Copy");
        copy.type = "button";
        copy.addEventListener("click", function () {
            navigator.clipboard.writeText(code).then(function () {
                copy.textContent = "Copied";
                setTimeout(function () { copy.textContent = "Copy"; }, 1500);
            });
        });
        head.appendChild(copy);

        var pre = element("pre");
        pre.appendChild(element("code", null, highlight(code)));

        var result = element("div", "result");
        result.appendChild(script);

        var foot = element("div", "example-foot");
        var tryIt = element("a", "try-btn", "Try it Yourself &raquo;");
        tryIt.href = tryItLink(code);
        tryIt.target = "_blank";
        tryIt.rel = "noopener";
        foot.appendChild(tryIt);
        foot.appendChild(element("span", "hint", "Edit the code and run it."));

        example.textContent = "";
        example.appendChild(head);
        example.appendChild(pre);
        example.appendChild(element("div", "result-label", "Result"));
        example.appendChild(result);
        example.appendChild(foot);
    });
})();
