$(document).ready(function () {
    isAutenticado();
});

isAutenticado = function()
{
    var token = localStorage.getItem('accessToken');
    //precisa chamar o endpoint que testa se o token é valido
    /*$.ajax({
        url: "",
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
    }).done(function (resp) {
    });*/

    if((token == undefined) || (token == null))
    {
        location.replace("http://localhost:3000/auth/login.html");
    }
}

logout = function()
{
    var token = localStorage.setItem('accessToken', '');
    location.replace("http://localhost:3000/auth/login.html");
}
