

const body = document.querySelector('body');
const H1 = document.querySelector('h1');
const H2 = document.querySelector('h2');
const dark = document.querySelector('#dark-theme');
const white = document.querySelector('#white-theme');

const root = document.documentElement;

if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'black') {
        root.style.setProperty('--main-color', '#333');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--task-bg', '#303841');
        root.style.setProperty('--task-color', 'black');
    } else {
        root.style.setProperty('--main-color', '#EDF1D6');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--task-bg', '#F2E7D5');
        root.style.setProperty('--task-color', 'white');
    }
} else {
    localStorage.setItem('theme', 'black')
    root.style.setProperty('--main-color', '#333');
    root.style.setProperty('--text-color', '#fff');
    root.style.setProperty('--task-bg', '#303841');
    root.style.setProperty('--task-color', 'black');
}





dark.addEventListener('click', function () {
    root.style.setProperty('--main-color', '#333');
    root.style.setProperty('--text-color', '#fff');
    localStorage.setItem('theme', 'black')

})

white.addEventListener('click', function () {
    root.style.setProperty('--main-color', '#EDF1D6');
    root.style.setProperty('--text-color', 'black');
    localStorage.setItem('theme', 'white')


}) 

