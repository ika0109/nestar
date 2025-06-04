function printNumbers() {
	let i = 1;

	const interval = setInterval(() => {
		console.log(i);
		if (i === 5) {
			clearInterval(interval);
		}
		i++;
	}, 1000);
}

printNumbers();
