const form = document.querySelector("form")
const errBox = document.getElementsByClassName('error')[0];
const subBtn = document.getElementById('sub-btn');

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    subBtn.innerHTML = `<div class="loader"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg></div>`


    const username = form.username.value
    const password = form.password.value

    let data = await myAjaxPOST('/api/auth/login', { "username": username, "password": password });
    if (data.error) {
        subBtn.innerHTML = 'LogIn'
        errBox.children[1].innerHTML = `${data.error}`;
        errBox.style.display = 'block';
    }
    else {
        console.log(data.data);
        window.localStorage.setItem('user', JSON.stringify(data.data));
        window.location.replace(`/api/user/home`);
    }
})


function myAjaxPOST(url, body) {
    return new Promise((Resolve, Reject) => {
        var request = {
            "url": url,
            "method": "POST",
            "data": body
        }
        $.ajax(request).done(function (response) {
            Resolve(response);
        })
    })
}

function hide_error() {
    errBox.style.display = 'none';
}