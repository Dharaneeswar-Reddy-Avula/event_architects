let left = document.getElementById('left');
let right = document.getElementById('right');
let moon = document.getElementById('moon');
let poster = document.getElementById('poster')

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    left.style.left = value * -1 + 'px';
    right.style.right = value * -1 + 'px'; 
    moon.style.top = value * 0.5 + 'px';
    bottom.style.bottom = value * -0.1 + 'px'
})



