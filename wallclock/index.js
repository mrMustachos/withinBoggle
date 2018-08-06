// Wallclock
// Write a function that accepts a wallclock time in digital format, e.g. "3:20" or "12:42", and returns
// what the angle between the hands would be on an analog clock that matches the given time.
// For example, with an input time of "12:30", the minute hand would be at the "6" (180 degrees)
// and the hour hand would be midway between the "12" and "1" (15 degrees). The return value
// would be 165 degrees (180 - 15).


const wallclock = (time) => {
	const parts = time.split(':').map((num, i) => i === 0 && num === '12' ? num = 0 : num = parseInt(num));
	const minsMoved = parts[1] / 60;
	const minsDeg = 360 * minsMoved;
	const hoursDeg = (parts[0] * 30) + (30 * minsMoved);
	const totalDeg = minsDeg - hoursDeg;
	
	return totalDeg < 0 ? -(totalDeg) : totalDeg;
}

const input = ['12:30','3:20','3:05','12:00','11:30'];
const expected = [165, 20, 62.5, 0, 165];

const output = () => (
	input.forEach((test, i) => {
		const attempt = wallclock(test);
		const answer = expected[i];
		const results = attempt === answer ? `True: ${answer}` : `False:\n expected: ${answer},\n got: ${attempt}`;
		console.log(results);
	})
);

output();