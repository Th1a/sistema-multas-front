document.getElementById("formFuncionario").addEventListener("submit", function(e){
    e.preventDefault();

    const matricula = document.getElementById("matricula").value;

    console.log("Matricula:", matricula);

    if(!matricula || isNaN(matricula)){
        alert("Digite uma matrícula válida");
        return;
    }

    fetch(`http://localhost:8080/funcionarios/matricula/${matricula}`)
    .then(response => {

        if(response.status === 404){
            throw new Error("NAO_ENCONTRADO");
        }

        if(!response.ok){
            throw new Error("ERRO");
        }

        return response.json();
    })
    .then(data => {

        document.getElementById("resultado").style.display = "block";

        document.getElementById("nome").textContent = data.nome;
        document.getElementById("matriculaResultado").textContent = data.matricula;
        document.getElementById("cargo").textContent = data.cargo;
        document.getElementById("departamento").textContent = data.departamento;
        document.getElementById("email").textContent = data.email;

    })
    .catch(error => {
        if(error.message === "NAO_ENCONTRADO"){
            alert("Funcionário não encontrado");
            return;
        }

        console.error(error);
        alert("Erro ao buscar funcionário");
    });
});