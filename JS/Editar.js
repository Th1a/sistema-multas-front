let identificadorAtual = '';


fetch(`${API}/status-processo`)
  .then(res => res.json())
  .then(lista => {
    const sel = document.getElementById('statusProcesso');
    lista.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.identificador;
      sel.appendChild(opt);
      
    });
  })
  .catch(() => console.log('Não foi possível carregar os status'));

function localizar() {
  const id = document.getElementById('identificador').value.trim().toUpperCase();
  if (!id) return mostrarStatus('statusBusca', 'Informe o identificador!', 'erro');

  fetch(`${API}/multas/${id}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(multa => {
      identificadorAtual = multa.identificador;
      document.getElementById('formCard').classList.add('visible');
      document.getElementById('localAtual').value = multa.localAtual || '';
      document.getElementById('localAnterior').value = multa.localAnterior || '';
      document.getElementById('observacao').value = multa.observacao || '';
      if (multa.statusProcesso) {
        document.getElementById('statusProcesso').value = multa.statusProcesso.id;
      }
    })
    .catch(() => mostrarStatus('statusBusca', 'Processo não encontrado.', 'erro'));
}

function salvar() {
  const body = {};
  const localAtual = document.getElementById('localAtual').value.trim();
  const localAnterior = document.getElementById('localAnterior').value.trim();
  const observacao = document.getElementById('observacao').value.trim();
  const statusProcesso = document.getElementById('statusProcesso').value;

  if (localAtual) body.localAtual = localAtual;
  if (localAnterior) body.localAnterior = localAnterior;
  if (observacao) body.observacao = observacao;
  if (statusProcesso) body.statusProcesso = parseInt(statusProcesso);

  fetch(`${API}/multas/${identificadorAtual}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => {
    if (!res.ok) throw new Error();
    mostrarStatus('statusForm', 'Alterações salvas com sucesso!', 'sucesso');
    
    document.getElementById("identificador").value = "";
    document.getElementById("localAtual").value = "";
    document.getElementById("localAnterior").value = "";
    document.getElementById("observacao").value = "";
    document.getElementById("statusProcesso").value = "";
  })
  .catch(() => mostrarStatus('statusForm', 'Erro ao salvar alterações.', 'erro'));
}

function excluir() {
  if (!confirm(`Deseja excluir o processo ${identificadorAtual}? Esta ação não pode ser desfeita.`)) return;

  fetch(`${API}/multas/${identificadorAtual}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error();
      mostrarStatus('statusForm', 'Processo excluído com sucesso!', 'sucesso');
      document.getElementById('formCard').classList.remove('visible');
      document.getElementById('identificador').value = '';
      setTimeout(() => window.location.href = 'index.html', 1500);
    })
    .catch(() => mostrarStatus('statusForm', 'Erro ao excluir processo.', 'erro'));
}

function mostrarStatus(elId, msg, tipo) {
  const el = document.getElementById(elId);
  el.textContent = msg;
  el.className = 'status-msg ' + tipo;
  setTimeout(() => el.className = 'status-msg', 4000);
}
