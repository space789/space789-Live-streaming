let form = document.getElementById('welcome__form')

let displaName = sessionStorage.getItem('________')
if (displaName) {
    form.name.value = displaName
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    sessionStorage.setItem('display', e.target.name.value)

    let inviteCode = e.target.room.value
    if (!inviteCode) [
        inviteCode = String(Math.floor(Math.random() * 10000))
    ]

    let hostChb=e.target.Host_chb.checked;
    sessionStorage.setItem('host', hostChb)

    window.location = `room.html?room=${inviteCode}`;

})

form.name.focus();
