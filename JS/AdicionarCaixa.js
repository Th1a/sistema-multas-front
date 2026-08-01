
function cadastrarCaixa() {
  const nome = document.getElementById('nomeCaixa').value.trim().toUpperCase();

  if (!nome) return alert('Informe o nome da caixa!');

  fetch(`${API}/caixas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    alert('Caixa cadastrada com sucesso!');
    document.getElementById('nomeCaixa').value = '';
  })
  .catch(() => alert('Erro ao cadastrar. Verifique se a caixa já existe.'));
}
