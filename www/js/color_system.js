function color_remember(inverse){
    var r = document.querySelector(':root');
    if((localStorage.getItem('favColor') == 'Dark') ^ inverse)
    {
        //把畫面變成暗的
        r.style.setProperty('--primary-back-color', '#1a1a1a');
        r.style.setProperty('--secondary-back-color', '#262625');
        r.style.setProperty('--tow-point-five-back-color', '#363739');
        r.style.setProperty('--third-back-color', '#3f434a');
        r.style.setProperty('--extinguish-back-color', '#124296');
        r.style.setProperty('--text-color', '#fff');
        // r.style.setProperty('--text-focus-back', '#fff');
        // r.style.setProperty('--text-focus', '#000');
        // document.cookie = `favColor=Dark; expires=${date.toUTCString()}`;
        localStorage.setItem('favColor', 'Dark');
    }
    else
    {
        //把畫面變成白的
        r.style.setProperty('--primary-back-color', '#e5e5e5');
        r.style.setProperty('--secondary-back-color', '#d9d9da');
        r.style.setProperty('--tow-point-five-back-color', '#c9c8c6');
        r.style.setProperty('--third-back-color', '#e7e7e7');
        r.style.setProperty('--extinguish-back-color', '#124296');
        r.style.setProperty('--text-color', '#000');
        // r.style.setProperty('--text-focus-back', '#fff');
        // r.style.setProperty('--text-focus', '#000');
        // document.cookie = `favColor=Light; expires=${date.toUTCString()}`;
        localStorage.setItem('favColor', 'Light');
    }
}
color_remember(false);