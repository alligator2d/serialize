function serialize(numbers) {
	numbers.sort(function(a, b) {
		return a - b;
	});
	
	let result = '';
	
	result += String.fromCharCode(numbers[0]);
	
	for (let i = 1; i < numbers.length; i++) {
		let delta = numbers[i] - numbers[i - 1];
		
		while (delta > 0) {
			let code = delta % 128;
			delta = Math.floor(delta / 128);
			
			if (delta > 0) {
				code += 128;
			}
			
			result += String.fromCharCode(code);
		}
	}
	
	return result;
}

function deserialize(str) {
	let result = [];
	
	let number = str.charCodeAt(0);
	result.push(number);
	
	for (let i = 1; i < str.length; i++) {
		let code = str.charCodeAt(i);
		let delta = code - 128;
		if (code >= 128) {
			code = str.charCodeAt(++i);
			
			while (code >= 128) {
				delta = (delta + 1) * 128 + (code - 128);
				code = str.charCodeAt(++i);
			}
			
			delta = (delta + 1) * 128 + code;
		} else {
			delta = code;
		}
		
		number += delta;
		result.push(number);
	}
	
	return result;
}

const numbers = [1, 2, 5, 7, 10, 11, 12, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 29, 30, 31, 33, 35];
const serialized = serialize(numbers);
console.log(serialized);
console.log(deserialize(serialized));