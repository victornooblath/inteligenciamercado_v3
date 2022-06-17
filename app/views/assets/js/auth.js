$(document).ready(function () {
    document.getElementById("btnLogin").addEventListener("click",autenticar);
});

autenticar = function()
{
    var login = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    if(isValid(login, senha))
    {
        var url = caminhoApi() + '/auth/login';
        $.ajax({
            url: url,
            method: 'POST',
            contentType: "application/json",
            dataType : "json",
            crossDomain: true,
            headers: [{ "accept": "application/json"},{"Access-Control-Allow-Origin" : "*"}],
            data:{
                "email": login,
                "password": senha
            }
        }).done(function (resp) {
            if(resp.status){
                var usuario = resp.data;
                localStorage.setItem("usuario", usuario.nome);
                localStorage.setItem("accessToken", usuario.accessToken);
                localStorage.setItem("refreshToken", usuario.refreshToken);
                location.replace("http://localhost:3000/index.html");
            }
            else{
                alert("usuario e senha invalidos");
            }            
        });
        
    }
    else{
        alert("usuario e senha invalidos2");
    }
}

isValid = function(login, senha)
{
    var resp = false;
    login = login.trim();
    senha = senha.trim();
    if((login != null && login != "") && (senha != null && senha != ""))
    {
        resp = true;
    }
    return resp;
}