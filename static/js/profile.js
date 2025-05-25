window.onload = () => {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        let helper = document.getElementsByClassName('about-user')[0];
        helper.children[0].innerHTML = user.username;
        getInfo();
    } else {
        window.location.replace('/api/auth/login');
    }
}

const getInfo = async () => {
    let info = await fetch('/api/user/info');
    info = await info.text();
    info = JSON.parse(info);
    console.log(info)
    let helper = document.getElementsByClassName('contact-list')[0];
    helper.children[0].innerHTML = info?.add || "No data Found";
    helper.children[1].innerHTML = info?.phone || "No data Found";
    helper.children[2].innerHTML = info?.email || "No data Found";
}