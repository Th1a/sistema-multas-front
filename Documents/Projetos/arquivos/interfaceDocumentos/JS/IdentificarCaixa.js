const API = 'http://localhost:8080';

function localizar() {
  const nome = document.getElementById('nome').value.trim().replaceAll(' ','');
  if (!nome) return mostrarStatus('Informe o nome da caixa!', 'erro');

  fetch(`${API}/caixas/${nome}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(caixa => {
      document.getElementById('resultado').classList.add('visible');
      document.getElementById('r-nome').textContent = caixa.nome || '—';
      
    })
    .catch(() => mostrarStatus('Caixa não encontrada.', 'erro'));
}

function mostrarStatus(msg, tipo) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.className = 'status-msg ' + tipo;
  setTimeout(() => el.className = 'status-msg', 4000);
}