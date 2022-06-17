$(document).ready(function () {
    getIES();
    getAll();
});

getIES = function (pagina = 1) {
    var url = caminhoApi() + "/ies/getAll?page=" + pagina;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": localStorage.getItem('accessToken') }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        $("#ies").find('option').remove();
        $('<option>').val(0).text("Selecione...").appendTo($("#ies"));
        $.each(resp.data, function (i, d) {
            $('<option>').val(d.cod_ies).text(d.nome).appendTo($("#ies"));
        });
    });
}

getAll = function (pagina = 1) {
    var url = caminhoApi() + "/matrizCompetitividade/getAll?page=" + pagina;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": localStorage.getItem("accessToken") }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        var dados = "";
        $.each(resp.data, function (i, d) {
            dados += "<tr>" +
                "<td>" + d.cod_ies + "</td>" +
                "<td>" + d.concorrente + "</td>" +
                "<td>" + d.preco_medio + "</td>" +
                "<td>" + d.igc_continuo + "</td>" +
                "<td>" + d.igc_faixa + "</td>" +
                "<td>" + d.ano + "</td>" +
                '<td>' +
                '<div class="btn-group" role="group" aria-label="Basic mixed styles example">' +
                '<button type="button" class="btn btn-info" onclick="getById(' + d.cod_ies + ',' + d.ano + ')">Editar</button>' +
                '<button type="button" class="btn btn-danger" onclick="excluir(' + d.cod_ies + ')">Excluir</button>' +
                '</div>' +
                '</td>' +
                "</tr>";
        });
        
        $("#tbcompetitividade tbody").append(dados);
        $('#tbcompetitividade').DataTable();
    });
}

$("#btnNovo").click(function () {
    limparForm();
    $("#staticBackdrop").modal('show');
});

$("#btnCadastrar").click(function () {
    var url = caminhoApi() + "/matrizCompetitividade/register";
    var ies = $("#ies").val();
    var preco_medio = $("#preco_medio").val();
    var igc = $("#igc").val();
    var faixa = $("#faixa").val();
    var ano = $("#ano").val();
    $.ajax({
        url: url,
        method: 'POST',
        dataType: "json",
        contentType: " application/json",
        crossOriginIsolated: true,
        data: {
            "cod_ies": ies,
            "igc_continuo": igc,
            "preco_medio": preco_medio,
            "igc_faixa": faixa,
            "ano": ano
        },
        headers: { "access-token": localStorage.getItem("accessToken") }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        limparForm();
        $("#staticBackdrop").modal('hide');
    });
});

$("#btnCancelar").click(function () {
    limparForm();
});

limparForm = function () {
    $("#ies").val(0);
    var data = new Date();
    $("#ano").val(data.getFullYear());
    $("#preco_medio").val(0);
    $("#igc").val(0);
    $("#faixa").val(0);
}

getById = function (id, ano) {
    var url = caminhoApi() + "/matrizCompetitividade/get?ano=" + ano + "&cod_ies=" + id;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": localStorage.getItem("accessToken") }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        $("#ies").val(resp.data[0].cod_ies);
        $("#ano").val(resp.data[0].ano);
        $("#preco_medio").val(resp.data[0].preco_medio);
        $("#igc").val(resp.data[0].igc_continuo);
        $("#faixa").val(resp.data[0].igc_faixa);
        $("#staticBackdrop").modal('show');
    });
}

excluir = function (id) {
    alert(id);
}