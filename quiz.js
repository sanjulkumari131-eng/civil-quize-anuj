document.getElementById('checkBtn').addEventListener('click', function () {
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