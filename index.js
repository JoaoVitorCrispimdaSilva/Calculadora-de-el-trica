//========================================
// CALCULADORA DE CARGA INSTALADA
// JV Engenharia Elétrica
//========================================

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("calcular")
        .addEventListener("click", calcularProjeto);

});

//========================================
// TOMADAS GERAIS
//========================================

function calcularTomadas(area){

    if(area < 9) return 1;
    if(area <= 16) return 3;
    if(area <= 20) return 4;
    if(area <= 30) return 5;
    if(area <= 50) return 6;
    if(area <= 70) return 7;
    if(area <= 90) return 8;
    if(area <= 110) return 9;
    if(area <= 140) return 10;
    if(area <= 170) return 11;
    if(area <= 200) return 12;
    if(area <= 220) return 13;
    if(area <= 250) return 14;

    return 14;

}

//========================================
// TOMADAS DA COZINHA
//========================================

function calcularTomadasCozinha(area){

    if(area < 15)
        return 1;

    if(area <= 30)
        return 2;

    if(area <= 250)
        return 3;

    return 3;

}

//========================================
// ILUMINAÇÃO
//========================================

function calcularIluminacao(comodos){

    return comodos * 100;

}

//========================================
// POTÊNCIA DAS TUGS
//========================================

function calcularTUG(area){

    const tomadas = calcularTomadas(area);

    const cozinha = calcularTomadasCozinha(area);

    return (tomadas * 100) + (cozinha * 600);

}

//========================================
// CARGA INSTALADA
//========================================

function calcularCarga(iluminacao,tug,tue){

    return (iluminacao + tug + tue) / 1000;

}

//========================================
// CATEGORIA
//========================================

function calcularCategoria(carga){

    if(carga <= 10)
        return "M2";

    return "M3";

}

//========================================
// SISTEMA DE FORNECIMENTO
//========================================

function calcularSistema(categoria){

    if(categoria === "M2")
        return "Monofásico";

    return "Trifásico";

}

//========================================
// DISJUNTOR
//========================================

function calcularDisjuntor(categoria){

    if(categoria === "M2")
        return "40 A";

    return "63 A";

}

//========================================
// RAMAL DE CONEXÃO
//========================================

function calcularRamalConexao(categoria){

    if(categoria === "M2")
        return "6+6 CU CONC ou 10+10 AL CONC";

    return "10+10 CU CONC ou 16+16 AL CONC";

}

//========================================
// RAMAL DE ENTRADA
//========================================

function calcularRamalEntrada(categoria){

    if(categoria === "M2")
        return "6/6 CU XLPE/HEPR";

    return "16/16 CU XLPE/HEPR";

}

//========================================
// RAMAL DE DISTRIBUIÇÃO
//========================================

function calcularRamalDistribuicao(categoria){

    if(categoria === "M2")
        return "6/6/6 CU XLPE/HEPR ou 10/10/10 CU PVC";

    return "16/16/16 CU XLPE/HEPR";

}

//========================================
// FORMATAR NÚMERO
//========================================

function formatar(valor){

    return Number(valor).toLocaleString("pt-BR",{

        minimumFractionDigits:2,
        maximumFractionDigits:2

    });

}

//========================================
// MOSTRAR RESULTADO
//========================================

function mostrar(id,valor){

    document.getElementById(id).textContent = valor;

}

//========================================
// VALIDAÇÃO
//========================================

function validar(area,comodos,tue){

    if(area <= 0){

        alert("Informe a área construída.");
        return false;

    }

    if(comodos <= 0){

        alert("Informe o número de cômodos.");
        return false;

    }

    if(tue < 0){

        alert("Potência das TUEs inválida.");
        return false;

    }

    return true;

}

//========================================
// FUNÇÃO PRINCIPAL
//========================================

function calcularProjeto(){

    const area = Number(document.getElementById("area").value);

    const comodos = Number(document.getElementById("comodos").value);

    const tue = Number(document.getElementById("tue").value);

    if(!validar(area,comodos,tue))
        return;

    const tomadas = calcularTomadas(area);

    const cozinha = calcularTomadasCozinha(area);

    const iluminacao = calcularIluminacao(comodos);

    const tug = calcularTUG(area);

    const carga = calcularCarga(iluminacao,tug,tue);

    const categoria = calcularCategoria(carga);

    const sistema = calcularSistema(categoria);

    const disjuntor = calcularDisjuntor(categoria);

    const ramalConexao = calcularRamalConexao(categoria);

    const ramalEntrada = calcularRamalEntrada(categoria);

    const ramalDistribuicao = calcularRamalDistribuicao(categoria);

    //------------------------------------

    mostrar("tomadas", tomadas);

    mostrar("iluminacao", iluminacao + " W");

    mostrar("tug", tug + " W");

    mostrar("tueResultado", tue + " W");

    mostrar("carga", formatar(carga) + " kW");

    mostrar("categoria", categoria);

    mostrar("sistema", sistema);

    mostrar("disjuntor", disjuntor);

    mostrar("ramalConexao", ramalConexao);

    mostrar("ramalEntrada", ramalEntrada);

    mostrar("ramalDistribuicao", ramalDistribuicao);

    //------------------------------------

    console.clear();

    console.log("======= RESULTADO =======");

    console.log("Área:", area);

    console.log("Cômodos:", comodos);

    console.log("Tomadas:", tomadas);

    console.log("Tomadas Cozinha:", cozinha);

    console.log("Iluminação:", iluminacao);

    console.log("TUG:", tug);

    console.log("TUE:", tue);

    console.log("Carga:", carga);

    console.log("Categoria:", categoria);

    console.log("Sistema:", sistema);

}