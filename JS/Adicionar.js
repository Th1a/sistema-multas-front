function cadastrar() {
    const identificador = document.getElementById('identificador').value.trim().toUpperCase();
    const observacao = document.getElementById('observacao').value.trim();

    if (!identificador) return mostrarStatus('Informe o identificador da multa!', 'erro');
    

    fetch(`${API}/multas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificador, 
        observacao })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      mostrarStatus('Processo cadastrado com sucesso!', 'sucesso');
      document.getElementById('identificador').value = '';
      document.getElementById('observacao').value = '';
    })
    .catch(() => mostrarStatus('Erro ao cadastrar. Verifique se o ID já existe.', 'erro'));
  }

  function mostrarStatus(msg, tipo) {
    const el = document.getElementById('statusMsg');
    el.textContent = msg;
    el.className = 'status-msg ' + tipo;
    setTimeout(() => el.className = 'status-msg', 4000);
  }
