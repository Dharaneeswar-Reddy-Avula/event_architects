/*let left = document.getElementById('left');
let right = document.getElementById('right');
let moon = document.getElementById('moon');
let poster = document.getElementById('poster')*/

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    left.style.transform = `translate(${value * -0.3 + 'px'}, -50%)`;
    right.style.transform = `translate(${value * 0.3 + 'px'}, -50%)`
    title.style.transform = `translate(-50%,${value * 0.5 + 'px'})`;
    moon.style.transform = `translate(-50%,${value * -0.4 + 'px'})`;
})



