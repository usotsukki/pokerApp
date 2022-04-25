const VALUES = [
	"ACE",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"JACK",
	"QUEEN",
	"KING",
	"ACE",
];
const STREETS = streets();

export function readTable(cards) {
	const values = {};
	const suits = {};
	cards.forEach((c) => {
		values[c.value] = c.value in values ? +values[c.value] + 1 : 1;
		suits[c.suit] = c.suit in suits ? +suits[c.suit] + 1 : 1;
	});
	const hand = valueRelated(Object.keys(values), values);
	const isFlash = Object.keys(suits)
		.filter((v) => v > 4)
		.toString();
	hand.flash = isFlash ? isFlash : false;
	return hand;
}

function valueRelated(values, keys) {
	const result = {};
	const pairs = values.filter((k) => keys[k] > 1).join(", ");
	const sets = values.filter((k) => keys[k] > 2).join(", ");
	const quads = values.filter((k) => keys[k] == "4").join(", ");
	const sorted = values.sort((v) => VALUES.indexOf(v));
	const street = isStreet(sorted);

	if (pairs) result.pairs = pairs;
	if (sets) result.sets = sets;
	if (quads) result.quads = quads;
	result.street = street;
	return result;
}
function isStreet(arr) {
	const result = [];
	if ("ACE" in arr) arr = arr.shift("ACE");
	for (let i = 0; i < arr.length; i++) {
		const contendor = arr.slice(i, i + 5);
		if (contendor == "ACE" && contendor.concat(arr.slice(0, 4)) in STREETS)
			result.shift(contendor.concat(arr.slice(0, 4)));
		if (contendor.length == 5) if (contendor in STREETS) result.push(contendor);
	}
	return result[result.length - 1] ? result[result.length - 1] : false;
}

function streets() {
	const streets = {};
	for (let i = 0; i < 9; i++) {
		let street = VALUES.slice(i, i + 5);
		streets[street] = i;
	}
	streets[("ACE", "2", "3", "4", "5")] = 9;
	return streets;
}
