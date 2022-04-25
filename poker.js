import { timer, flop, turn, river } from "./utils.js";
import { readTable } from "./logic.js";
const [deckBtn, dealBtn, flopBtn, turnBtn, riverBtn] =
	document.querySelector(".buttons").children;

deckBtn.addEventListener("click", newDeck);

function newDeck() {
	flopBtn.classList.add("d-none");
	turnBtn.classList.add("d-none");
	riverBtn.classList.add("d-none");
	document.querySelectorAll(".card").forEach(
		(c) =>
			(c.style = `
        border: 2px solid #fffeeec1;
    	background-image: none !important`)
	);
	fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
		.then((res) => res.json())
		.then((d) =>
			fetch(`https://deckofcardsapi.com/api/deck/${d.deck_id}/draw/?count=52`)
				.then((res) => res.json())
				.then((d) => deal(d.cards))
		);
}

async function deal(cards) {
	const comCardsHtml = document.querySelector(".community-cards").children;
	const playerCardsHtml = document.querySelector(".player-cards").children;
	const playerCardsArr = cards.slice(0, 2);

	for (let i = 0; i < 2; i++) {
		playerCardsHtml[i].style = `
            background-image: url(${playerCardsArr[i].image}); 
            border: none`;
		await timer(100);
	}
	flopBtn.classList.remove("d-none");

	flopBtn.addEventListener(
		"click",
		async () => {
			console.log("Trigger");
			await flop(cards.slice(2, 5), comCardsHtml);
			flopBtn.classList.add("d-none");
			turnBtn.classList.remove("d-none");
			updateResponseHtml(readTable(cards.slice(0, 5)));
		},
		{ once: true }
	);
	turnBtn.addEventListener(
		"click",
		async () => {
			await turn(cards[5], comCardsHtml);
			turnBtn.classList.add("d-none");
			riverBtn.classList.remove("d-none");
			updateResponseHtml(readTable(cards.slice(0, 6)));
		},
		{ once: true }
	);
	riverBtn.addEventListener(
		"click",
		async () => {
			await river(cards[6], comCardsHtml);
			riverBtn.classList.add("d-none");
			updateResponseHtml(readTable(cards.slice(0, 7)));
		},
		{ once: true }
	);
}
function updateResponseHtml(obj) {
	document.querySelector(".response").innerHTML = ``;
	for (let i in obj) {
		document.querySelector(".response").innerHTML += `<p>${i}: ${obj[i]}</p>`;
	}
}
