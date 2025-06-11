async function summariseText() {
  const text = document.getElementById('textInput').value;
  const resultBox = document.getElementById('textResult');
  const debugBox = document.getElementById('textDebug');
  resultBox.innerHTML = '';
  debugBox.innerHTML = '';

  try {
    const response = await fetch('/summarise_text', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    });

    const data = await response.json();
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
  }
}

function clearTextResult() {
  document.getElementById('textInput').value = '';
  document.getElementById('textResult').innerHTML = '';
  document.getElementById('textDebug').innerHTML = '';
}