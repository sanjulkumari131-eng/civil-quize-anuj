// Build Quiz button
const buildBtn = document.getElementById('buildBtn');
const checkBtn = document.getElementById('checkBtn');

buildBtn.addEventListener('click', function () {
  const dataText = document.getElementById('dataBox').value.trim();
  const lines = dataText.split('\n');
  const quizArea = document.getElementById('quizArea');
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
    const correct = parts[5].toLowerCase(); // a/b/c/d

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
});

// Check Answers button
checkBtn.addEventListener('click', function () {
  const questionBlocks = document.querySelectorAll('.question');
  let total = 0;
  let correctCount = 0;

  questionBlocks.forEach(qBlock => {
    total++;
    const ansElem = qBlock.querySelector('.answer');
    const correct = ansElem.getAttribute('data-correct');

    const radios = qBlock.querySelectorAll('input[type="radio"]');
    let selected = null;

    radios.forEach(r => {
      if (r.checked) selected = r.value;
    });

    if (!selected) {
      ansElem.textContent = 'Not attempted | Correct: (' + correct + ')';
      ansElem.classList.add('wrong');
    } else if (selected === correct) {
      correctCount++;
      ansElem.textContent = 'Correct ✔';
      ansElem.classList.remove('wrong');
    } else {
      ansElem.textContent =
        'Wrong ✖ | Correct: (' + correct + ')';
      ansElem.classList.add('wrong');
    }
  });

  document.getElementById('score').textContent =
    'Score: ' + correctCount + ' / ' + total;
});