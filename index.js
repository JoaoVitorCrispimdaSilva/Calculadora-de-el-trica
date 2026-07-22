//========================================
// CALCULADORA DE CARGA INSTALADA
// JV Engenharia Elétrica
//========================================


document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("calcular");

    if(botao){

        botao.addEventListener("click", calcularProjeto);

    }

});


//========================================
// TOMADAS GERAIS
//========================================

function calcularTomadas(area){

    if(area < 6) return 1;
    if(area <= 10) return 2;
    if(area <= 20) return 3;
    if(area <= 30) return 4;
    if(area <= 40) return 5;
    if(area <= 50) return 6;

    return Math.ceil(area / 10);

}



//========================================
// TOMADAS COZINHA
//========================================

function calcularTomadasCozinha(area){

    if(area <= 15)
        return 1;

    if(area <= 30)
        return 2;

    return 3;

}



//========================================
// ILUMINAÇÃO
//========================================

function calcularIluminacao(comodos){

    return comodos * 100;

}



//========================================
// TUG
//========================================

function calcularTUG(area){

    const tomadas = calcularTomadas(area);

    const cozinha = calcularTomadasCozinha(area);


    return (

        (tomadas * 100) +

        (cozinha * 600)

    );

}



//========================================
// CARGA INSTALADA
//========================================

function calcularCarga(iluminacao,tug,tue){

    return (

        iluminacao +

        tug +

        tue

    ) / 1000;

}



//========================================
// BUSCAR CATEGORIA
//========================================

function buscarCategoria(valor){


    for(let item of tabelaNeoenergia){


        if(

            valor >= item.demandaMin &&

            valor <= item.demandaMax

        ){

            return item;

        }


    }


    return null;

}



//========================================
// FORMATAR NÚMEROS
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

    const elemento = document.getElementById(id);


    if(elemento){

        elemento.textContent = valor;

    }

}
//========================================
// TABELA NEOENERGIA
//========================================

const tabelaNeoenergia = [

{
    categoria:"M2",
    demandaMin:0,
    demandaMax:10,

    sistema:"Monofásico",

    disjuntor:"40 A",

    ramalConexao:"6+6 CU CONC ou 10+10 AL CONC",

    ramalEntrada:"6/6 CU XLPE/HEPR",

    ramalDistribuicao:"6/6/6 CU XLPE/HEPR",

    caixa:"Monofásica ou Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"M3",

    demandaMin:10.1,
    demandaMax:15,

    sistema:"Monofásico",

    disjuntor:"63 A",

    ramalConexao:"10+10 CU CONC ou 16+16 AL CONC",

    ramalEntrada:"16/16 CU XLPE/HEPR",

    ramalDistribuicao:"16/16/16 CU XLPE/HEPR",

    caixa:"Monofásica ou Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"T6",

    demandaMin:15.1,
    demandaMax:21,

    sistema:"Trifásico",

    disjuntor:"32 A",

    ramalConexao:"3x10+10 AL MULT",

    ramalEntrada:"3x6/6 CU XLPE/HEPR",

    ramalDistribuicao:"3x6/6 CU XLPE/HEPR",

    caixa:"Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"T7",

    demandaMin:21.1,
    demandaMax:26,

    sistema:"Trifásico",

    disjuntor:"40 A",

    ramalConexao:"3x10+10 AL MULT",

    ramalEntrada:"3x6/6 CU XLPE/HEPR",

    ramalDistribuicao:"3x10/10/10 CU XLPE/PVC",

    caixa:"Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"T8",

    demandaMin:26.1,
    demandaMax:33,

    sistema:"Trifásico",

    disjuntor:"50 A",

    ramalConexao:"3x16+16 AL MULT",

    ramalEntrada:"3x10/10 CU XLPE/HEPR",

    ramalDistribuicao:"3x10/10/10 CU XLPE/PVC",

    caixa:"Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"T9",

    demandaMin:33.1,
    demandaMax:40,

    sistema:"Trifásico",

    disjuntor:"63 A",

    ramalConexao:"3x16+16 AL MULT",

    ramalEntrada:"3x16/16 CU XLPE/HEPR",

    ramalDistribuicao:"3x16/16/16 CU XLPE/HEPR",

    caixa:"Polifásica",

    medicao:"Direta",

    eletroduto:"1 1/4",

},


{
    categoria:"T10",

    demandaMin:40.1,
    demandaMax:52,

    sistema:"Trifásico",

    disjuntor:"80 A",

    ramalConexao:"3x25+25 AL MULT",

    ramalEntrada:"3x25/25 CU XLPE/HEPR",

    ramalDistribuicao:"3x25/25/25 CU XLPE/HEPR",

    caixa:"Polifásica",

    medicao:"Direta",

    eletroduto:"2 pol.",

}

];
//========================================
// VALIDAÇÃO
//========================================

function validar(area,comodos,tue){


    if(isNaN(area) || area <= 0){

        alert("Informe uma área válida.");

        return false;

    }


    if(isNaN(comodos) || comodos <= 0){

        alert("Informe a quantidade de cômodos.");

        return false;

    }


    if(isNaN(tue) || tue < 0){

        alert("Informe uma potência de TUE válida.");

        return false;

    }


    return true;

}



//========================================
// FUNÇÃO PRINCIPAL
//========================================

function calcularProjeto(){


    const area = Number(
        document.getElementById("area").value
    );


    const comodos = Number(
        document.getElementById("comodos").value
    );


    const tue = Number(
        document.getElementById("tue").value
    );



    if(!validar(area,comodos,tue)){

        return;

    }



    const tomadas = calcularTomadas(area);


    const iluminacao = calcularIluminacao(comodos);


    const tug = calcularTUG(area);


    const carga = calcularCarga(

        iluminacao,

        tug,

        tue

    );



    const dados = buscarCategoria(carga);



    if(!dados){

        alert(
        "Carga fora da tabela disponível."
        );

        return;

    }



    // RESULTADOS

    mostrar(
        "tomadas",
        tomadas
    );


    mostrar(
        "iluminacao",
        iluminacao+" W"
    );


    mostrar(
        "tug",
        tug+" W"
    );


    mostrar(
        "tueResultado",
        tue+" W"
    );


    mostrar(
        "carga",
        formatar(carga)+" kW"
    );


    mostrar(
        "categoria",
        dados.categoria
    );


    mostrar(
        "sistema",
        dados.sistema
    );


    mostrar(
        "disjuntor",
        dados.disjuntor
    );


    mostrar(
        "ramalConexao",
        dados.ramalConexao
    );


    mostrar(
        "ramalEntrada",
        dados.ramalEntrada
    );


    mostrar(
        "ramalDistribuicao",
        dados.ramalDistribuicao
    );


    mostrar(
        "caixa",
        dados.caixa
    );


    mostrar(
        "medicao",
        dados.medicao
    );


    mostrar(
        "eletroduto",
        dados.eletroduto
    );



    console.log("===== RESULTADO =====");

    console.log("Carga:",carga);

    console.log("Categoria:",dados.categoria);

    console.log("Sistema:",dados.sistema);


}