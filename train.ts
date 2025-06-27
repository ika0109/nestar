// function countNumberAndLetters(str) {
// 	let result = { number: 0, letter: 0 };

// 	for (let char of str) {
// 		if (/[0-9]/.test(char)) {
// 			result.number++;
// 		} else if (/[a-zA-Z]/.test(char)) {
// 			result.letter++;
// 		}
// 	}

// 	return result;
// }


// console.log(countNumberAndLetters('string152%\\¥'));


// function areParenthesesBalanced(str) {
// 	let count = 0;

// 	for (let char of str) {
// 		if (char === '(') count++;
// 		else if (char === ')') count--;

// 		if (count < 0) return false;
// 	}

// 	return count === 0;
// }

// console.log(areParenthesesBalanced('string()ichida(qavslar)soni()balansda'));
// console.log(areParenthesesBalanced('string((ichida)qavslar)'));
// console.log(areParenthesesBalanced('string(ichida(qavslar)'));
// console.log(areParenthesesBalanced(')('));

// / function rotateArray(arr, index) {
// 	return arr.slice(index + 1).concat(arr.slice(0, index + 1));
// }
// console.log(rotateArray([1, 2, 3, 4, 5, 6], 3));

// function satrniKebabga(satr) {
// 	return satr.toLowerCase().replaceAll(' ', '-');
// }

// console.log(satrniKebabga('I love kebab'));

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
