const buildBtn = document.getElementById('buildBtn');
const quizArea = document.getElementById('quizArea');
const htmlOutput = document.getElementById('htmlOutput');
const copyHtmlBtn = document.getElementById('copyHtmlBtn');

// STEP 1: Data se preview quiz banao
buildBtn.addEventListener('click', function () {
  const dataText = document.getElementById('dataBox').value.trim();
  const lines = dataText.split('\n');
  quizArea.innerHTML = '';

  let qNumber = 0;

  lines.forEach(line => {
    if (line.trim() === '') return;

    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 6) return;

    const questionText = parts[0];
    const optA = parts[1];
    const optB = parts[2];
    const optC = parts[3];
    const optD = parts[4];
    const correct = parts[5].toLowerCase();

    qNumber++;

    const qDiv = document.createElement('div');
    qDiv.className = 'question';

    const title = document.createElement('h3');
    title.textContent = 'Q' + qNumber + '. ' + questionText;

    const labelA = document.createElement('label');
    labelA.innerHTML = `<input type="radio" name="q${qNumber}" value="a"> (a) ${optA}`;

    const labelB = document.createElement('label');
    labelB.innerHTML = `<input type="radio" name="q${qNumber}" value="b"> (b) ${optB}`;

    const labelC = document.createElement('label');
    labelC.innerHTML = `<input type="radio" name="q${qNumber}" value="c"> (c) ${optC}`;

    const labelD = document.createElement('label');
    labelD.innerHTML = `<input type="radio" name="q${qNumber}" value="d"> (d) ${optD}`;

    const ansP = document.createElement('p');
    ansP.className = 'answer';
    ansP.setAttribute('data-correct', correct);

    qDiv.appendChild(title);
    qDiv.appendChild(labelA);
    qDiv.appendChild(labelB);
    qDiv.appendChild(labelC);
    qDiv.appendChild(labelD);
    qDiv.appendChild(ansP);

    quizArea.appendChild(qDiv);
  });

  // Preview ready hone ke baad quizArea ka innerHTML copy karo
  htmlOutput.value = quizArea.innerHTML;
});

// STEP 2: HTML clipboard pe copy karo
copyHtmlBtn.addEventListener('click', function () {
  htmlOutput.select();
  document.execCommand('copy');
  alert('Quiz HTML copied! Ab isko quiz.html ke quizArea div me paste karo.');
});