import fs from 'fs';
import fsP from 'node:fs/promises';

import json from './pages_to_build.json' assert {type: 'json'};

import * as d from './default_elements.mjs';

const getArticleUrl = (index) => {
	const url = json.pages[index].article_url;
	return `https://ceres.pet/${url}`;
}

const getPageArticle = (index) => {
	const article = fs.readFileSync(json.pages[index].page_article_location);
	return (article.toString());
};

const getHeadExtra = (index) => {
	try {
		const extra = fs.readFileSync(json.pages[index].head_extra_location);
		return (extra.toString());
	} catch (e) {
		return '';
	};
};

const getPageModal = (index) => {
	if (json.pages[index].page_modal == true) {
		const modal = d.defaultModal;
		return modal;
	} else {
		return '';
	};
};

const getContentsPane = (index) => {
	if (json.pages[index].contents_pane == true) {
		const contents = d.defaultContentsPane;
		return contents;
	} else {
		return '';
	};
};

// Compares an existing file and the new string to see if they've changed 
const compare = (data, index) => {
	try {
		const data2 = fs.readFileSync(`./../ceres.pet/${json.pages[index].article_url}.html`);
		return data === data2.toString();
	} catch (e) {
		return false;
	}
};

// Main loop; iterates over every `pages` object in `pages_to_build.json`
for (let i = 0; i < Object.keys(json.pages).length; i++) {
	const props = {
	articleURL: getArticleUrl(i),
	articleTitle: json.pages[i].article_title,
	pageArticle: getPageArticle(i),
	headExtra: getHeadExtra(i),
	pageModal: getPageModal(i),
	contentsPane: getContentsPane(i),
	siteNavpane: d.defaultNavpane,
	siteFooter: d.defaultFooter,
	siteExtraPane: d.defaultExtraPane,
	};
	const props2 = {
		pageHead: d.defaultHead(props),
		pageBody: d.defaultBody(props),
	};
	const page = d.defaultPage(props2);
	const compareResult = compare(page, i)
	if (compareResult == true) {
		console.log(`${json.pages[i].article_url}.html untouched`)
	} else {
		fs.writeFile(`./../ceres.pet/${json.pages[i].article_url}.html`, page, function (err) {
			if (err) throw err; else console.log(`${json.pages[i].article_url}.html SAVED`)
		});
	};
}