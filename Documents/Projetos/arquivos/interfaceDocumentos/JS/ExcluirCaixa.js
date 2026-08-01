const API = 'http://localhost:8080';

function excluir() {
  const caixa = document.getElementById('nomeCaixa').value.trim();
  if (!caixa) return alert('Informe o nome da caixa!');

  if (!confirm(`Deseja excluir a caixa ${caixa}? Esta ação não pode ser desfeita.`)) return;

  fetch(`${API}/caixas/${caixa}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error();
      alert('Caixa excluída com sucesso!');
      document.getElementById('nomeCaixa').value = '';
      setTimeout(() => window.location.href = 'index.html', 1500);
    })
    .catch(() => alert('Erro ao excluir caixa.'));
}