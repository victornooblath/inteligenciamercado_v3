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
    var url = caminhoApi() + "/matrizParticipacao/getAll?page=" + pagina;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": localStorage.getItem("accessToken") }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        var dados = "";
        var somatoriaMat = 0;
        var somatoriaIng = 0;
        var somatoriaInc = 0;
        var somatoriaTaxa = 0;
        $.each(resp.data, function (i, d) {
            var taxa = parseFloat(d.ingressos / d.inscritos) * 100;
            somatoriaMat += d.matriculas;
            somatoriaIng += d.ingressos;
            somatoriaInc += d.inscritos;
            somatoriaTaxa += taxa;
            dados += "<tr>" +
                "<td>" + d.nome + "</td>" +
                "<td>" + d.matriculas + "</td>" +
                "<td>" + d.ingressos + "</td>" +
                "<td>" + d.inscritos + "</td>" +
                "<td>" + taxa.toFixed(1) + "% </td>" +
                "<td>" + d.ano + "</td>" +
                '<td>' +
                '<div class="btn-group" role="group" aria-label="Basic mixed styles example">' +
                '<button type="button" class="btn btn-info" onclick="getById(' + d.cod_ies + ',' + d.ano + ')">Editar</button>' +
                '<button type="button" class="btn btn-danger" onclick="excluir(' + d.cod_ies + ')">Excluir</button>' +
                '</div>' +
                '</td>' +
                "</tr>";
        });
        var taxatotal = (somatoriaIng/somatoriaInc)*100;
        var foot = "<tr><th>TOTAIS</th>" +
            "<th>" + somatoriaMat + "</th>" +
            "<th>" + somatoriaIng + "</th>" +
            "<th>" + somatoriaInc + "</th>" +
            "<th>" + taxatotal.toFixed(1) + "%</th>" +
            "<th></th>" +
            "<th></th>" +
            "</tr>";
        $("#tbcompetitividade tbody").append(dados);
        $("#tbcompetitividade tfoot").append(foot);
        $('#tbcompetitividade').DataTable();
    });
}

$("#btnNovo").click(function () {
    limparForm();
    $("#staticBackdrop").modal('show');
});

$("#btnCadastrar").click(function () {
    var url = caminhoApi() + "/matrizParticipacao/register";
    var ies = $("#ies").val();
    var matriculas = $("#matriculas").val();
    var inscritos = $("#inscritos").val();
    var ingressos = $("#ingressos").val();
    var ano = $("#ano").val();
    $.ajax({
        url: url,
        method: 'POST',
        dataType: "json",
        contentType: " application/json",
        crossOriginIsolated: true,
        data: {
            "cod_ies": ies,
            "matriculas": matriculas,
            "ingressos": ingressos,
            "inscritos": inscritos,
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
    $("#matriculas").val(0);
    $("#ingressos").val(0);
    $("#inscritos").val(0);
}

getById = function (id, ano) {
    var url = caminhoApi() + "/matrizParticipacao/get?ano=" + ano + "&cod_ies=" + id;
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
        $("#matriculas").val(resp.data[0].matriculas);
        $("#ingressos").val(resp.data[0].ingressos);
        $("#inscritos").val(resp.data[0].inscritos);
        $("#staticBackdrop").modal('show');
    });
}

excluir = function (id) {
    alert(id);
}