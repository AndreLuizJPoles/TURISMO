function sair(){
    localStorage.setItem('token', null);
    window.location.replace('../Login/login.html');
}