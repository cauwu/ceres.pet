"use strict";

window.addEventListener("load", () => {
	pfInsertEmail();
	/* 	modalsystem doesnt run on the index page because i dont want a modal
		to open when someone clicks a link that is an image */
	if (window.location.pathname !== "/") {
		pfModalSystem();
	}
})

// insert the email as two seperate spans to deter scrapers
const pfInsertEmail = () => {
	const emails = document.querySelectorAll('#emailaddress');
	emails.forEach((button) => {
		button.innerHTML = '<div id="addresslabel"><span>ceres@</span>' + '<span>ceres.pet</span></div>';
		button.addEventListener('click', () => {
			pfCopyEmail();
		});
	});
}

let timeoutID;
let timeoutID2;
// mailto links are unfashionable now because no one uses email clients
const pfCopyEmail = (v) => {
	if (v === 1) {
		navigator.clipboard.writeText('ceres@' + 'ceres.pet')
		document.getElementById("emailcopiednotifmobile").style.display = "";
		clearTimeout(timeoutID2);
		timeoutID2 = setTimeout(pfHideNotif2, 3000)
	} else {
		navigator.clipboard.writeText('ceres@' + 'ceres.pet')
		document.getElementById("emailcopiednotif").style.display = "flex";
		clearTimeout(timeoutID);
		timeoutID = setTimeout(pfHideNotif, 3000)
	}
}
// hide the "copied!" notification after the email is clicked
const pfHideNotif = () => {
	document.getElementById("emailcopiednotif").style.display = "none";
}

const pfHideNotif2 = () => {
	document.getElementById("emailcopiednotifmobile").style.display = "none";
}

// "show more" dropdown button
const pfDropdownToggle = () => {
    if (document.getElementById("showmoredropdown").style.display === "none") {
		document.getElementById("showmoredropdown").style.display = "flex"
		document.getElementById("showmorebutton").innerHTML = "^ Show Less ^";
	} else {
		document.getElementById("showmoredropdown").style.display = "none";
		document.getElementById("showmorebutton").innerHTML = "v Show More v";
	}
}

const thumbToImg = (data) => {
	if (data.indexOf("thumbs/") === -1) {
		return data;
	} else {
		const regexPattern = /(thumbs\/thumb-)/;
		return data.replace(regexPattern, 'img/');
	}
};

const closeModal = ({modalContent, modalCaption, modal}) => {
	modalContent.src = '';
	modalCaption.innerHTML = '';
	modal.close();
}

// when an image is clicked on, display it in a large popup viewing area called a modal
const pfModalSystem = () => {
	const modalProps = {
		modal: document.querySelector("dialog"),
		modalCaption: document.getElementById("modalcaption"),
		modalContent: document.getElementById("modalcontent"),
		modalClose: document.getElementById("modalclose"),
	};
	const imgs = document.querySelectorAll('figure img');
	imgs.forEach((img, index) => {
		img.addEventListener('mouseover', () => {
			modalProps.modalCaption.innerHTML = imgs[index].alt;
			modalProps.modalContent.src = thumbToImg(imgs[index].src);
		});
		img.addEventListener('mousedown', () => {
			modalProps.modal.showModal();
		});
	});
	modalProps.modalClose.addEventListener('click', () => {
		closeModal(modalProps);
	});
	modalProps.modal.addEventListener('click', () => {
		closeModal(modalProps);
	});
	/*
	// create an interaction observer to find when thumbs are on the screen
	// and then start loading the original img
	const observerOptions = {
		root: document.querySelector("article"),
		rootMargin: "0px",
		threshold: 0,
	};
	const observer = new IntersectionObserver (callback, options);

	const callback = (entries, observer) => {
		entries.forEach(())
	}
	*/
	
}

// turn on and off dark mode
const pfDarkmodeToggle = () => {
	const root = document.querySelector(":root")
	const mode = window.getComputedStyle(root).getPropertyValue('color-scheme');
	let newmode;
	if (mode === "light") {
		newmode = "dark";
		pfDarkmodeSet(newmode);
	} else {
		newmode = "light";
		pfDarkmodeSet(newmode);
	}
}
const pfDarkmodeSet = (newmode) => {
	document.querySelector(":root").style.setProperty('color-scheme', newmode);
}