function timer(){

const deadLine = '2022-12-31 GMT+0200';
// получиім разницн между датами
function getTimeRemaining(endTime) {
	// Date.parse(endTime) количество милисекунд до которого нам нужно дойти
	// Date.parse(new Date()) текущее время в милисекундах
	const t = Date.parse(endTime) - Date.parse(new Date());
	let days, hours, minutes, seconds;

	if (t < 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		   days = Math.floor    ( t / (1000 * 60 * 60 * 24) );
			hours = Math.floor   ((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor ((t / (1000 * 60)) % 60);
			seconds = Math.floor  ((t /  1000) % 60);
	}

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'second': seconds
	};
}

function getZero(num) {
	if(num >= 0 &&  num < 10){
		return `0${num}`;
	} else {
		return num;
	}
}

function setClock(selector, endTime){
	const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			second = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)
			;

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endTime);

		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		second.innerHTML = getZero(t.second);

		if(t.total <= 0) {
			clearInterval(timeInterval);
		}

	}
}
	setClock('.timer', deadLine);
}
module.exports = timer;
