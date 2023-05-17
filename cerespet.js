"use strict";

function pfDropdownToggle() {
    if (document.getElementById("showmore").style.display === "none") {
		document.getElementById("showmore").style.display = "flex"
		document.getElementById("showmorebutton").innerHTML = "^ Show Less ^";
	} else {
		document.getElementById("showmore").style.display = "none";
		document.getElementById("showmorebutton").innerHTML = "v Show More v";
	}
}

window.onload = popupSystem;
function popupSystem() {
	var popup = document.getElementById("popuparea");
	var popupImg = document.getElementById("popupimg");
	var popupCaption = document.getElementById("popupcaption");
	
	const imgs = document.querySelectorAll('.thumbnail');
	imgs.forEach(imgClicked);
	function imgClicked(img,index) {
		img.addEventListener('click',()=>{
			popup.style.display = "block";
			popupImg.src = imgs[index].src;
			popupCaption.innerHTML = imgs[index].alt;
		});
	};
	
	document.getElementsByClassName("popupclose")[0].onclick = function() {
		popup.style.display = "none";
	}
	
	popup.onclick = function() {
		popup.style.display = "none";
	}
}

