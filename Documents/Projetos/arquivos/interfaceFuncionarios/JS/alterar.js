document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("formEditar");
    const btnBuscar = document.getElementById("btnLocalizar");

    if(btnBuscar){
        btnBuscar.addEventListener("click", function(){

            const matricula = document.getElementById("matricula").value;

            if(!matricula || isNaN(matricula)){
                alert("Digite uma matrícula válida");
                return;
            }

            fetch(`http://localhost:8080/funcionarios/matricula/${matricula}`)
            .then(response => {
                if(response.status === 404){
                    throw new Error("NAO_ENCONTRADO");
                }
                return response.json();
            })
            .then(data => {

                document.getElementById("nome").value = data.nome;
                document.getElementById("cargo").value = data.cargo;
                document.getElementById("departamento").value = data.departamento;
                document.getElementById("email").value = data.email;
                document.getElementById("senha").value = data.senha;

            })
            .catch(() => {
                alert("Funcionário não encontrado");
                
            });

        });
    }

    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();

            const matricula = document.getElementById("matricula").value;

            if(!matricula || isNaN(matricula)){
                alert("Matrícula inválida");
                return;
            }

            const dados = {};

                const nome = document.getElementById("nome").value;
                const cargo = document.getElementById("cargo").value;
                const departamento = document.getElementById("departamento").value;
                const email = document.getElementById("email").value;
                const senha = document.getElementById("senha").value;

                if(nome) dados.nome = nome;
                if(cargo) dados.cargo = cargo;
                if(departamento) dados.departamento = departamento;
                if(email) dados.email = email;
                if(senha) dados.senha = senha;

        fetch(`http://localhost:8080/funcionarios/matricula/${matricula}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("ERRO");
                }

                alert("Funcionário atualizado com sucesso!");
                form.reset();
            })
            .catch(() => {
                alert("Erro ao atualizar");
                console.log("MATRICULA ENVIADA:", matricula);
            });

        });
    }

});