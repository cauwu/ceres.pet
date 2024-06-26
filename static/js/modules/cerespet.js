"use strict";

window.addEventListener("load", (event) => {
	pfInsertEmail();
	pfPopupSystem();
})

// insert the email as two seperate spans to deter scrapers
function pfInsertEmail() {
	const emails = document.querySelectorAll('#emailaddress');
	for (var i = 0; i < emails.length; i++) {
		emails[i].innerHTML = '<div id="addresslabel"><span>ceres@</span>' + '<span>ceres.pet</span></div>';
	}
}

let timeoutID;
let timeoutID2;
// mailto links are unfashionable now because no one uses email clients
function pfCopyEmail(v) {
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
// hide the "copied!" notification
function pfHideNotif() {
	document.getElementById("emailcopiednotif").style.display = "none";
}

function pfHideNotif2() {
	document.getElementById("emailcopiednotifmobile").style.display = "none";
}

// "show more" dropdown button
function pfDropdownToggle() {
    if (document.getElementById("showmoredropdown").style.display === "none") {
		document.getElementById("showmoredropdown").style.display = "flex"
		document.getElementById("showmorebutton").innerHTML = "^ Show Less ^";
	} else {
		document.getElementById("showmoredropdown").style.display = "none";
		document.getElementById("showmorebutton").innerHTML = "v Show More v";
	}
}

// when an image is clicked on, display it in a large popup viewing area
function pfPopupSystem() {
	var popup = document.getElementById("popup");
	var popupContent = document.getElementById("popupcontent");
	var popupCaption = document.getElementById("popupcaption");
	
	if (window.location.pathname === "/") {
		
	} else {
		const imgs = document.querySelectorAll('figure img');
		imgs.forEach(imgClicked);
		function imgClicked(img,index) {
			img.addEventListener('click',()=>{
				popup.showModal();
				popup.style.display = "flex";
				popupContent.src = imgs[index].src;
				popupCaption.innerHTML = imgs[index].alt;
			});
		};
		
		document.getElementById("popupclose").onclick = function() {
			popup.style.display = "none";
			popup.close();
		}
		
		popup.onclick = function() {
			popup.style.display = "none";
			popup.close();
		}
	}
}

// turn on and off dark mode
function pfDarkmodeToggle() {
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
function pfDarkmodeSet(newmode) {
	document.querySelector(":root").style.setProperty('color-scheme', newmode);
}