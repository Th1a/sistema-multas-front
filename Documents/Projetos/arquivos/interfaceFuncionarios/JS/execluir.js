document.getElementById("formExcluir").addEventListener("submit", function(e){
    e.preventDefault();

    const matricula = document.getElementById("matricula").value;

    if(!matricula || isNaN(matricula)){
        alert("Digite uma matrícula válida");
        return;
    }

    if(!confirm("Tem certeza que deseja excluir este funcionário?")){
        return;
    }

    fetch(`http://localhost:8080/funcionarios/matricula/${matricula}`, {
        method: "DELETE"
    })
    .then(response => {

        if(response.status === 404){
            throw new Error("NAO_ENCONTRADO");
        }

        if(!response.ok){
            throw new Error("ERRO");
        }

        alert("Funcionário excluído com sucesso!");

        document.getElementById("matricula").value = "";

    })
    .catch(error => {

        if(error.message === "NAO_ENCONTRADO"){
            alert("Funcionário não encontrado");
            return;
        }

        console.error(error);
        alert("Erro ao excluir funcionário");
    });

});