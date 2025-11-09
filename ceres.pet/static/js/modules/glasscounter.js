"use strict";

var totals = new Array();
totals[1] = 0;
totals[2] = 0;
totals[3] = 0;
totals[4] = 0;
totals[5] = 0;
totals[6] = 0;
totals[7] = 0;
totals[8] = 0;

// p for pseudonym
const p = new Array();
p[1] = "nn"
p[2] = "c"
p[3] = "hb"
p[4] = "r"
p[5] = "f"
p[6] = "wine"
p[7] = "s"
p[8] = "w"

window.addEventListener("load", () => {
  pfAttachButtons();
  pfAttachCounters();
})

const pfAttachButtons = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
		button.addEventListener('click', () => {
			pfChangeCount(button);
		});
	});
}

const pfAttachCounters = () => {
  const counters = document.querySelectorAll('[data-counter]')
  counters.forEach((span) => {
    span.innerHTML = totals[1];
  });
}

const pfUpdateCounters = (g, v) => {
  const span = document.querySelector("[data-counter=" + CSS.escape(v) + "]");
  span.innerHTML = totals[g];
}

const pfChangeCount = (button) => {
  const g = (element) => element === button.dataset.glass
  const glass = p.findIndex(g);
  totals[glass] = totals[glass]+parseInt(button.dataset.count);
  console.log(totals[glass])
  pfUpdateCounters(glass, button.dataset.glass);
  //console.log(button.dataset.count)
  //console.log(button.dataset.glass)
}
