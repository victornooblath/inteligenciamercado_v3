$(document).ready(function () {
    getIES();    
    getAll();
});

getIES = function()
{
    $.ajax({
        url: "https://api-inteligenciamercado.herokuapp.com/api/v1/ies/getAll?page=1",
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjUyMGZhLWJiN2YtNTA1NS05ZjYyLTlhYjc2YjA5OTYwNSIsImNvZGUiOiI3NTIzMzhhNi04YzFmLTQ2NDEtOTljZS04MDgwZTcyYTViNzEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTUwNzI4MTgsImV4cCI6MTY1NTY3NzYxOH0.lUnmOEUlyWXkAPGDQ16F_S8paSU_5QvxHiVNivp7Ckk" }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        $("#ies").find('option').remove();
        $('<option>').val(0).text("Selecione...").appendTo($("#ies"));
        $.each(resp.data, function (i, d) {
            $('<option>').val(d.cod_ies).text(d.nome).appendTo($("#ies"));
        });
    });
}

getAll = function(){
    $.ajax({
        url: "https://api-inteligenciamercado.herokuapp.com/api/v1/matrizParticipacao/getAll?page=1",
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjUyMGZhLWJiN2YtNTA1NS05ZjYyLTlhYjc2YjA5OTYwNSIsImNvZGUiOiI3NTIzMzhhNi04YzFmLTQ2NDEtOTljZS04MDgwZTcyYTViNzEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTUwNzI4MTgsImV4cCI6MTY1NTY3NzYxOH0.lUnmOEUlyWXkAPGDQ16F_S8paSU_5QvxHiVNivp7Ckk" }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        var dados = "";
        $.each(resp.data, function (i, d) {
            dados += "<tr>"+
            "<td>"+ d.nome+"</td>" +
            "<td>"+ d.matriculas+"</td>" +
            "<td>"+ d.ingressos+"</td>" +
            "<td>"+ d.inscritos+"</td>" +
            "<td>"+ d.ano+"</td>" +
            '<td>'+
                '<div class="btn-group" role="group" aria-label="Basic mixed styles example">' +
                    '<button type="button" class="btn btn-info">Editar</button>' +
                    '<button type="button" class="btn btn-danger">Excluir</button>' +
                '</div>' +
            '</td>' +
            "</tr>";
        });
        $("#tbcompetitividade tbody").append(dados);        
        $('#tbcompetitividade').DataTable();
    });
}