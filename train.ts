function satrniKebabga(satr) {
	return satr.toLowerCase().replaceAll(' ', '-');
}

console.log(satrniKebabga('I love kebab'));

// function reverseInteger(number) {
// 	const reversed = number.toString().split('').reverse().join('');
// 	return parseInt(reversed);
// }

// console.log(reverseInteger(123456789));
// function printNumbers() {
// 	let i = 1;

// 	const interval = setInterval(() => {
// 		console.log(i);
// 		if (i === 5) {
// 			clearInterval(interval);
// 		}
// 		i++;
// 	}, 1000);
// }

// printNumbers();
