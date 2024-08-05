"use strict";

window.addEventListener("load", (event) => {
	pfInsertEmail();
	pfModalSystem();
})

// insert the email as two seperate spans to deter scrapers
function pfInsertEmail() {
	document.getElementById("emailaddress").innerHTML = '<div id="addresslabel"><span>angel@</span>' + '<span>twnk.tv</span></div>';
}

let timeoutID;
// mailto links are unfashionable now because no one uses email clients
function pfCopyEmail() {
	navigator.clipboard.writeText('angel@' + 'twnk.tv')
	document.getElementById("emailcopiednotif").style.display = "flex";
	clearTimeout(timeoutID);
	timeoutID = setTimeout(pfHideNotif, 3000)
}

function pfHideNotif() {
	document.getElementById("emailcopiednotif").style.display = "none";
}

// when an image is clicked on, display it in a large popup viewing area
function pfModalSystem() {
	var modal = document.getElementById("modal");
	var modalContent = document.getElementById("modalcontent");
	var modalCaption = document.getElementById("modalcaption");
	
	if (window.location.pathname === "/") {
		
	} else {
		const imgs = document.querySelectorAll('figure img');
		imgs.forEach(imgClicked);
		function imgClicked(img,index) {
			img.addEventListener('click',()=>{
				modal.showModal();
				modal.style.display = "flex";
				modalContent.src = imgs[index].src;
				modalCaption.innerHTML = imgs[index].alt;
			});
		};
		
		document.getElementById("modalclose").onclick = function() {
			modal.style.display = "none";
			modal.close();
		}
		
		modal.onclick = function() {
			modal.style.display = "none";
			modal.close();
		}
	}
}