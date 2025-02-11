/*
A list of string literals (string templates) that are used to build webpages 
out of snippets of HTML. This file is the source of standard elements that are
consistent between all of the webpages ceresbuilder is responsible for.

Elements that don't require variable parts are provided to ceresbuilder.mjs as
strings. The ones that do require them are provided as functions that the
ceresbuilder loop can fill with variables as needed and return strings.
*/

const defaultModal = 
`<dialog id="modal"><span id="modalclose" autofocus>&times;</span><figure id="modalholder"><picture><img id="modalcontent" alt=""/></picture><span id="modalcaption"></span></figure></dialog>`;

const defaultNavpane = 
`<nav id="navcontainer" role="navigation">
<a id="desktoplogo" href="index.html"><img src="static/site/logo-01.svg" alt="site logo representing a link to the homepage" title="Home" role="img"></a>
<a href="index.html"><span>Home</span></a>
<a href="about.html"><span>About</span></a>
<a href="index.html#portfolio"><span>Portfolio</span></a>
<a href="gallery.html"><span>Gallery</span></a>
</nav>`;

const defaultFooter = 
`<div id="sitefooterlinks">
<a href="about.html" role="link">About</a>
<span>•</span>
<a href="about.html" role="link">Contact</a>
<span>•</span>
<a href="index.html#portfolio" role="link">Portfolio</a>
<span>•</span>
<a href="gallery.html" role="link">Gallery</a>
<span>•</span>
<button id="darkmodetoggle" onclick="pfDarkmodeToggle()">💡</button>
<span>•</span>
<span id="footerheart">&lt;3</span>
</div>
<span id="copyright">© Ceres Miller 2025 - All works on this website, unless otherwise noted, are licensed under the CC BY-SA 4.0 license.</span>`;

const defaultExtraPane = 
`<a id="hireme" href="about.html"><span>Hire Me</span></a>
<div id="contactemail">
<span>Contact:<br></span>
<button id="emailaddress"></button>
<span id="emailcopiednotif">copied!</span>
</div>
<div id="externallinkscontainer">
<a href="https://www.instagram.com/ceresmiller/" rel="external" target="_blank"><span>Instagram</span></a>
<a href="https://linkedin.com/in/ceres-miller/" rel="external" target="_blank"><span>LinkedIn</span></a>
<a href="https://github.com/cauwu" rel="external" target="_blank"><span>Github</span></a>
</div>`;

const defaultContentsPane = (contentsItems) =>
`<nav id="contentscontainer"><span id="contentsheading">Contents</span>${contentsItems}</nav>`;

const defaultHead = ({articleTitle, articleURL, extraStyling, headExtra}) => 
`<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="Product design portfolio website, Ceres Miller"/>
<meta name="keywords" content="portfolio,product design,ceres miller"/>
<link rel="apple-touch-icon" sizes="180x180" href="static/icon/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="static/icon/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="static/icon/favicon-16x16.png"/>
<link rel="manifest" href="static/icon/site.webmanifest"/>
<meta property="og:title" content="${articleTitle}"/>
<meta property="og:description" content="Product design portfolio website, Ceres Miller"/>
<meta property="og:url" content="${articleURL}"/>
<meta property="og:site_name" content="Ceres Miller / Product Designer"/>
<meta name="article:author" content="Ceres Miller"/>
<meta name="theme-color" content="#fbf4f6"/>
<title>${articleTitle}</title>
<link rel="canonical" href="${articleURL}"/>
<link rel="stylesheet" href="/static/css/style.css"/>
${extraStyling}
${headExtra}
<script src="./static/js/modules/cerespet.js"></script>`;

const defaultBody = ({pageModal, siteNavpane, contentsPane, pageArticle, siteFooter, siteExtraPane}) => 
`${pageModal}<div id="navpane">${siteNavpane}${contentsPane}</div><div id="contentpane"><main><a id="title" href="index.html"><img src="static/site/logo-01.svg" alt="site logo representing a link to the homepage" title="Home" role="img"/><h1>Ceres&nbsp;Kinnear&nbsp;Miller / Product&nbsp;Designer</h1></a><article>${pageArticle}</article><footer id="sitefooter" class="contentitem">${siteFooter}</footer></main><div id="extrapane">${siteExtraPane}</div></div>`;

const defaultPage = ({pageHead, pageBody}) => `<!DOCTYPE html><html dir="ltr" lang="en"><head>${pageHead}</head><body>${pageBody}</body></html>`;

export {defaultPage, defaultHead, defaultBody, defaultModal, defaultNavpane, defaultFooter, defaultExtraPane, defaultContentsPane};