window.onload = () => {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        document.getElementById('isUser').innerHTML = `<a href="/api/user/profile" class="bttn"><i class="fa fa-user fa-lg"></i>${user.username}</a><span onClick="logout()" class="bttn"><i class="fa fa-user fa-lg"></i>Logout</span>`
    } else {
        document.getElementById('isUser').innerHTML = `<a href="/api/auth/login" class="bttn"><i class="fa fa-user fa-lg"></i>Login/Sign up</a>`
    }
}

const logout = () => {
    localStorage.removeItem('user');
    location.reload();
}