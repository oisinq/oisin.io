const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const striptags = require("striptags");
const fetch = require("node-fetch");

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts", "project"].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter("filterTagList", filterTagList);

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter("slug"),
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  // @oisinq_ enables excerpts for posts (via 11ty docs)
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!--more-->",
  });

  eleventyConfig.addShortcode("spotify", (id) => {
    return `<iframe
        src="https://open.spotify.com/embed/track/${id}"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"></iframe>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode("twitter", async (url) => {
    return await fetch(`https://publish.twitter.com/oembed?url=${url}`)
      .then((res) => res.json())
      .then((json) => {
        return json.html;
      });
  });

  eleventyConfig.addFilter("permalinkDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy/LL/dd");
  });

  eleventyConfig.addFilter("addEllipses", (content) => {
    const trimmed = content.trim();

    if (trimmed.slice(-1) === ".") return `${trimmed}..`;
    return `${trimmed}...`;
  });

  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    );
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  excerpt = striptags(content)
    .trim()
    .split(" ")
    .splice(0, 50)
    .join(" ")
    .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
    .trim()
    .concat("...");
  return excerpt;
}

async function imageShortcode(src, alt, sizes = "100vw", classes = "") {
  let metadata = await Image(src, {
    widths: [50, 300, 600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: classes,
  };

  return Image.generateHTML(metadata, imageAttributes);
}
