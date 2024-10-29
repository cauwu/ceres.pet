A static website builder for https://ceres.pet.

In `pages_to_build.json` every `pages` object is a new file that will be 
written. Each object contains:

    • `article_url`: The url of the page and the name of the file. String
    • `article_title`: The title of the HTML page. (and also meta opengraph
    title) String
    • `head_extra_location`: The file URL for extra lines in the HTML head for
    this page. Leave blank if none. These files should be in `ceresbuilder/
    pages/headextra/` in a file without a file-ending, named the same as
    `article_url`. String
    • `page_modal`: If the page should have a modal for images. (index.html 
    does not) true|false
    • `page_article_location`: The file URL for the article, in HTML. This 
    should be in `ceresbuilder/pages/` in a file without a file-ending, named
    the same as `article_url`. String
    • `contents_pane`: If the page should have a contents pane. Used for
    articles with multiple sections. true|false

To build webpages, run
`$ node ./ceresbuilder/ceresbuilder.mjs`

Ceresbuilder will output the webpages in `ceresbuilder/ceres.pet/` as HTML.
