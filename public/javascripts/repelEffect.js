let mouse = { x: 0, y: 0 };

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

document.addEventListener('mousemove', (e) => {
	mouse = { x: e.pageX, y: e.pageY };
});

const characters = document.querySelectorAll('.char');

characters.forEach((el) => {
	el.dataset.repelX = parseInt(getComputedStyle(el).left);
	el.dataset.repelY = parseInt(getComputedStyle(el).top);
});

setInterval(() => {
	characters.forEach((el) => {
		const position = el.getBoundingClientRect();

		const distancex = mouse.x - position.left;
		const distancey = mouse.y - position.top;

		const distance = Math.sqrt(distancex * distancex + distancey * distancey);

		const magnet = Math.min(Math.max(parseInt(distance - 50000), -50000), 0);

		const powerx = ((distancex / distance) * magnet) / screenWidth;
		const powery = ((distancey / distance) * magnet) / screenHeight;

		el.style.left = powerx + 'px';
		el.style.top = powery + 'px';
	});
}, 100);
