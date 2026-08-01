
document.getElementById("formFuncionario").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const matricula = document.getElementById("matricula").value;
    const departamento = document.getElementById("departamento").value;
    const cargo = document.getElementById("cargo").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if(!nome || !departamento || !senha || !matricula || !cargo || !email || !senha){
        alert("Preencha todos os campos!");
        return;
    }

    fetch("http://localhost:8080/funcionarios", { //envia request para API
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            matricula: parseInt(matricula),
            departamento,
            cargo,
            email,
            senha
        })
    })
        .then(response => {
            if(!response.ok){
                if(response.status === 500){
                   throw new Error("MATRICULA_EXISTENTE");
                }
                throw new Error("Erro ao salvar");
            }
            alert("Funcionário cadastrado!");
            document.getElementById("nome").value = "";
            document.getElementById("matricula").value = "";
            document.getElementById("departamento").value = "";
            document.getElementById("cargo").value = "";
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
        })
        .catch(error => {
            if(error.message === "MATRICULA_EXISTENTE"){
                alert("Matrícula já existe!");
                return;
            }
            console.error(error);
            alert("Erro ao cadastrar!");
        });
});