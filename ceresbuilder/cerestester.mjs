import fs from 'fs';
import fsP from 'node:fs/promises';
import * as htmlparser2 from "htmlparser2";
import * as cssselect from "css-select";
import render from "dom-serializer";

const defaultContentsPane = (contentsItems) =>
`<nav id="contentscontainer"><span id="contentsheading">Contents</span>${contentsItems}</nav>`;

const getPageArticle = (index) => {
	return fs.readFileSync(index).toString();
};

const getContentsItems = (w, data) => {
	if (w == true) {
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

const getContentsPane = (w, data) => {
	if (w == true) {
		return defaultContentsPane(data);
	} else {
		return '';
	}
};

const i = `./../ceres.pet/mindseye.html`
const wantcontents = true;
const article = getPageArticle(i);
const contentsItems = getContentsItems(wantcontents, article);
const contentsPane = getContentsPane(wantcontents, contentsItems);
console.log(contentsPane);