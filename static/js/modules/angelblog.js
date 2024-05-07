"use strict";

window.onload = pfInsertEmail;
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