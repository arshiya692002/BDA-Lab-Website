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


    const Username = form.Username.value
    const Email_id = form.Email_id.value
    const Password = form.Password.value
    const Confirm_password = form.Confirm_password.value

    const authenticated = authentication(Username, Email_id, Password, Confirm_password)

    if (authenticated) {
        let data = await myAjaxPOST('/api/auth/register', { "username": Username, "email": Email_id, "password": Password });
        if (data.error) {
            subBtn.innerHTML = 'Sign Up'
            errBox.children[1].innerHTML = `${data.error}`;
            errBox.style.display = 'block';
        }
        else {
            window.location.replace('/api/auth/login');
        }
    } else {
        subBtn.innerHTML = 'Sign Up'
        errBox.children[1].innerHTML = 'Password mismatch';
        errBox.style.display = 'block';
    }
})

// function for checking username and password

function authentication(Username, Email_id, Password, Confirm_password) {
    if (Password == Confirm_password) return true;
    return false;
}

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


let verify_username = document.getElementById('verify_username');
document.getElementById('username_input').addEventListener('change', () => {
    console.log("hello")
    subBtn.style.display = 'none'
    verify_username.style.display = 'block';
})
verify_username.addEventListener('click', async (e) => {
    e.preventDefault();
    let username = document.getElementById('username_input').value;
    verify_username.setAttribute('disabled', true);
    verify_username.innerHTML = 'Loading';
    username = username.trim();
    if (username !== '') {
        let data = await myAjaxPOST('/api/auth/verifyUsername', { username });
        verify_username.removeAttribute('disabled')
        verify_username.innerHTML = 'Verify Username';
        if (data.success) {
            document.getElementById('username_input').style.borderBottom = '1px solid #00c100'
            document.getElementById('username_input').style.color = '#00c100'
            subBtn.style.display = 'block'
            verify_username.style.display = 'none';
           
        } else {
            document.getElementById('username_input').style.borderBottom = '1px solid #d30000'
            document.getElementById('username_input').style.color = '#d30000'
        }
    }
})