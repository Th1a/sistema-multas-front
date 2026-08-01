function localizar() {
  const id = document.getElementById('identificador').value.trim();
  if (!id) return mostrarStatus('Informe o identificador!', 'erro');

  fetch(`${API}/multas/${id}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(multa => {
      document.getElementById('resultado').classList.add('visible');
      document.getElementById('r-identificador').textContent = multa.identificador || '—';
      document.getElementById('r-localAtual').textContent = multa.localAtual || '—';
      document.getElementById('r-localAnterior').textContent = multa.localAnterior || '—';
      document.getElementById('r-observacao').textContent = multa.observacao || '—';
      document.getElementById('r-caixa').textContent = multa.caixa ? multa.caixa.nome : 'Sem caixa';
      document.getElementById('r-status').textContent = multa.statusProcesso ? multa.statusProcesso.identificador : '—';
      document.getElementById('r-data').textContent = multa.dataAtualizacao ? new Date(multa.dataAtualizacao).toLocaleString('pt-BR') : '—';
    })
    .catch(() => mostrarStatus('Processo não encontrado.', 'erro'));
}

function mostrarStatus(msg, tipo) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.className = 'status-msg ' + tipo;
  setTimeout(() => el.className = 'status-msg', 4000);
}
