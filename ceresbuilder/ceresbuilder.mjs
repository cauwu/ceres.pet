import fs from 'fs';
import fsP from 'node:fs/promises';
import * as htmlparser2 from "htmlparser2";
import * as cssselect from "css-select";

import json from './pages_to_build.json' with {type: 'json'};

import * as d from './default_elements.mjs';

const getArticleUrl = (index) => {
	const url = json.pages[index].article_url;
	return `https://ceres.pet/${url}`;
}

const getPageArticle = (index) => {
	return fs.readFileSync(json.pages[index].page_article_location).toString();
};

const getExtraStyling = (index) => {
	const pagetype = json.pages[index].page_type;
	if (pagetype.toString() === '') {
		return '';
	} else {
		return `<link rel="stylesheet" href="/static/css/${pagetype.toString()}.css"/>`
	}
}

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

const getContentsItems = (index, data) => {
	if (json.pages[index].contents_pane == true) {
		const dom = htmlparser2.parseDocument(data);
        const template = (id, data) => `<a href="#${id}"><span class="contentslinkspan">${data}</span></a>`;
        let items = '';
		cssselect.selectAll('h2', dom)
        .forEach(h2 => {
            const item = template(h2.attribs.id, h2.children[0].data);
            items = items.concat(item);
        });
        return items;
	} else {
		return '';
	};
};

const getContentsPane = (index, data) => {
	if (json.pages[index].contents_pane == true) {
		return d.defaultContentsPane(data);
	} else {
		return '';
	}
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
	const article = getPageArticle(i);
	const contentsItems = getContentsItems(i, article);
	const props = {
		articleURL: getArticleUrl(i),
		articleTitle: json.pages[i].article_title,
		pageArticle: article,
		extraStyling: getExtraStyling(i),
		headExtra: getHeadExtra(i),
		pageModal: getPageModal(i),
		contentsPane: getContentsPane(i, contentsItems),
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