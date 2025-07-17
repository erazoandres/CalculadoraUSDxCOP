document.getElementById('convertir').addEventListener('click', function() {
  const usd = parseFloat(document.getElementById('usd').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(usd) || usd <= 0) {
    resultadoDiv.textContent = 'Por favor ingresa un valor en dólares válido.';
    resultadoDiv.style.color = '#ef4444';
    return;
  }
  if (isNaN(rate) || rate <= 0) {
    resultadoDiv.textContent = 'Por favor ingresa una tasa de cambio válida.';
    resultadoDiv.style.color = '#ef4444';
    return;
  }

  const cop = usd * rate;
  resultadoDiv.textContent = `\u0024${usd.toFixed(2)} USD son aproximadamente $${cop.toLocaleString('es-CO')} COP`;
  resultadoDiv.style.color = '#059669';
});
