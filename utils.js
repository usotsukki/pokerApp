export const timer = (ms) =>
	new Promise(
		(res) => setTimeout(res, ms),
		(err) => reset
	);
export async function flop(cards, placeholders) {
	for (let i = 0; i < 3; i++) {
		placeholders[i].style = `
                background-image: url(${cards[i].image}); 
                border: none`;
		await timer(100);
	}
}
export async function turn(card, placeholder) {
	placeholder[3].style = `
                background-image: url(${card.image}); 
                border: none`;
	await timer(100);
}
export async function river(card, placeholder) {
	placeholder[4].style = `
                background-image: url(${card.image}); 
                border: none`;
	await timer(100);
}
