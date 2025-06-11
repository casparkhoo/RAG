async function summarise() {
  const url = document.getElementById('url').value;
  const resultBox = document.getElementById('result');
  const loadingBox = document.getElementById('loading');
  const debugBox = document.getElementById('debug');
  resultBox.innerHTML = '';
  debugBox.innerHTML = '';
  loadingBox.style.display = 'block';

  try {
    const response = await fetch('/summarise', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    // Render markdown as HTML
    if (data.summary) {
      resultBox.innerHTML = marked.parse(data.summary);
      debugBox.innerHTML = '';
    } else {
      resultBox.innerHTML = data.error || 'No response';
      debugBox.innerHTML = 'Debug: ' + (data.error || 'Unknown error from backend.');
    }
  } catch (error) {
    resultBox.innerHTML = 'Failed to summarise.';
    debugBox.innerHTML = 'Debug: ' + (error.message || 'error');
    console.error(error);
  } finally {
    loadingBox.style.display = 'none';
  }
}

function clearResult() {
  document.getElementById('url').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('debug').innerHTML = '';
}