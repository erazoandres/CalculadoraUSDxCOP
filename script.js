let tasaActual = null;

function numeroAPalabrasCompleto(num) {
  // Convierte cualquier número hasta millones a palabras completas en español
  const unidades = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
  const decenas = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const especiales = ['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve'];
  const centenas = ['','cien','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];

  function numeroMenorDeMil(n) {
    let palabra = '';
    if (n === 0) return '';
    if (n > 99) {
      if (n === 100) return 'cien';
      palabra += centenas[Math.floor(n / 100)] + ' ';
      n = n % 100;
    }
    if (n > 19) {
      palabra += decenas[Math.floor(n / 10)];
      if (n % 10 !== 0) palabra += ' y ' + unidades[n % 10];
    } else if (n >= 10) {
      palabra += especiales[n - 10];
    } else if (n > 0) {
      palabra += unidades[n];
    }
    return palabra.trim();
  }

  if (num === 0) return 'cero';
  let millonesNum = Math.floor(num / 1000000);
  let milesNum = Math.floor((num - millonesNum * 1000000) / 1000);
  let resto = num % 1000;
  let palabras = '';
  if (millonesNum > 0) palabras += (millonesNum === 1 ? 'un millón' : numeroMenorDeMil(millonesNum) + ' millones') + ' ';
  if (milesNum > 0) {
    if (milesNum === 1) palabras += 'mil ';
    else palabras += numeroMenorDeMil(milesNum) + ' mil ';
  }
  if (resto > 0) palabras += numeroMenorDeMil(resto);
  return palabras.trim();
}

function numeroAPalabrasMiles(num) {
  // Convierte solo los miles/millones a palabras, redondeando a la unidad de mil más cercana
  num = Math.round(num / 1000) * 1000;
  const unidades = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
  const decenas = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const especiales = ['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve'];
  const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];

  function numeroMenorDeMil(n) {
    let palabra = '';
    if (n === 0) return '';
    if (n > 99) {
      if (n === 100) return 'cien';
      palabra += centenas[Math.floor(n / 100)] + ' ';
      n = n % 100;
    }
    if (n > 19) {
      palabra += decenas[Math.floor(n / 10)];
      if (n % 10 !== 0) palabra += ' y ' + unidades[n % 10];
    } else if (n >= 10) {
      palabra += especiales[n - 10];
    } else if (n > 0) {
      palabra += unidades[n];
    }
    return palabra.trim();
  }

  if (num === 0) return 'cero';
  let millonesNum = Math.floor(num / 1000000);
  let milesNum = Math.floor((num - millonesNum * 1000000) / 1000);
  let palabras = '';
  if (millonesNum > 0) palabras += (millonesNum === 1 ? 'un millón' : numeroMenorDeMil(millonesNum) + ' millones') + ' ';
  if (milesNum > 0) {
    if (milesNum === 1) palabras += 'mil ';
    else palabras += numeroMenorDeMil(milesNum) + ' mil ';
  }
  return palabras.trim();
}

async function obtenerTasa() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    tasaActual = data.rates.COP;
    document.getElementById('convertir').disabled = false;
    document.getElementById('resultado').textContent = 'Tasa de cambio actual cargada.';
    document.getElementById('resultado').style.color = '#059669';
    document.getElementById('resultado-palabras').textContent = '';
  } catch (e) {
    tasaActual = null;
    document.getElementById('convertir').disabled = true;
    document.getElementById('resultado').textContent = 'No se pudo obtener la tasa de cambio actual.';
    document.getElementById('resultado').style.color = '#ef4444';
    document.getElementById('resultado-palabras').textContent = '';
  }
}

obtenerTasa();

document.getElementById('convertir').addEventListener('click', function() {
  const usd = parseFloat(document.getElementById('usd').value);
  const resultadoDiv = document.getElementById('resultado');
  const resultadoPalabrasDiv = document.getElementById('resultado-palabras');

  if (tasaActual === null) {
    resultadoDiv.textContent = 'No se pudo obtener la tasa de cambio actual.';
    resultadoDiv.style.color = '#ef4444';
    resultadoPalabrasDiv.textContent = '';
    return;
  }

  if (isNaN(usd) || usd <= 0) {
    resultadoDiv.textContent = 'Por favor ingresa un valor en dólares válido.';
    resultadoDiv.style.color = '#ef4444';
    resultadoPalabrasDiv.textContent = '';
    return;
  }

  const cop = Math.round(usd * tasaActual);
  resultadoDiv.textContent = `\u0024${usd.toFixed(2)} USD son aproximadamente $${cop.toLocaleString('es-CO', {maximumFractionDigits: 0})} COP`;
  resultadoDiv.style.color = '#059669';
  resultadoPalabrasDiv.textContent = `${numeroAPalabrasMiles(cop)} pesos colombianos`;
});

document.getElementById('convertir').disabled = true;
document.getElementById('resultado').textContent = 'Cargando tasa de cambio actual...';
document.getElementById('resultado').style.color = '#64748b';
document.getElementById('resultado-palabras').textContent = '';
