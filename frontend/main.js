(async () => {
  const SURNAME = document.getElementById('surname');
  const NAME = document.getElementById('name');
  const LASTNAME = document.getElementById('lastname');
  const BIRTH = document.getElementById('birth');
  const START = document.getElementById('start');
  const FAC = document.getElementById('fac');
  const GRID = document.querySelector('.students__grid');
  const HEADER = document.querySelector('.first-row')
  let studentsArray = [];

  async function createStudentsItem() {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: NAME.value,
        surname: SURNAME.value,
        lastname: LASTNAME.value,
        birthday: BIRTH.value,
        studyStart: START.value,
        faculty: FAC.value,
      })
    });
    const newStudent = await response.json();
    studentsArray.push(newStudent);
  }

  async function loadStudentItems() {
    const response = await fetch('http://localhost:3000/api/students');
    if (response.ok) {
      const result = await response.json();
      studentsArray.push(...result);

    } else {
      console.error('Ошибка получения данных о студентах');
    }
  }

  function getStudentItem() {
    const FORM = document.querySelector('.form');
    const INPUT = document.querySelectorAll('.form__item');
    const BIRTH_DATE = document.querySelector('.birth-date');
    const START_DATE = document.querySelector('.start-date');
    const MESSAGE = document.createElement('span');
    MESSAGE.classList.add('fail-message');
    FORM.append(MESSAGE);

    FORM.addEventListener('submit', async (event) => {
      if (
        Array.from(INPUT).every((i) => i.value.trim() !== '') &&
        Number(BIRTH_DATE.value.substr(0, 4)) >= 1900 &&
        Number(BIRTH_DATE.value.substr(0, 4)) < 2023 &&
        Number(START_DATE.value.substr(0, 4)) >= 2000 &&
        Number(START_DATE.value.substr(0, 4)) <= 2023 &&
        Number(START_DATE.value.substr(0, 4)) >= Number(BIRTH_DATE.value.substr('', 4))
      ) {
        studentsArray = [];
        event.preventDefault();
        await loadStudentItems();
        await createStudentsItem();
        console.log(studentsArray)
        renderStudentsTable();
        INPUT.forEach((i) => {
          i.value = '';
        });
      } else {
        if (INPUT.value !== '') {
          INPUT.forEach((i) => {
            i.classList.remove('input-fail');
            i.classList.add('input-fail');
          });
          MESSAGE.textContent = '';
          MESSAGE.textContent = 'Заполните все поля';
        }
        if (
          Number(BIRTH_DATE.value.substr('', 4)) < 1900 ||
          Number(BIRTH_DATE.value.substr('', 4)) >= 2023 ||
          Number(BIRTH_DATE.value.substr('', 4)) >= Number(START_DATE.value.substr('', 4))
        ) {
          BIRTH_DATE.classList.remove('input-fail');
          BIRTH_DATE.classList.add('input-fail');
          MESSAGE.textContent = '';
          MESSAGE.textContent = 'Введите корректное значение';
        }
        if (
          Number(START_DATE.value.substr('', 4)) < 2000 ||
          Number(START_DATE.value.substr('', 4)) > 2023 ||
          Number(BIRTH_DATE.value.substr('', 4)) <= Number(START_DATE.value.substr('', 4))
        ) {
          START_DATE.classList.remove('input-fail');
          START_DATE.classList.add('input-fail');
          MESSAGE.textContent = '';
          MESSAGE.textContent = 'Введите корректное значение';
        }
      }
    });

    FORM.addEventListener('input', () => {
      INPUT.forEach((i) => {
        i.classList.remove('input-fail');
        MESSAGE.textContent = ''
      });
    });
  }

  function renderStudentsTable() {
    GRID.innerHTML = '';
    GRID.append(HEADER);

    function age(year) {
      const DATE = new Date();
      const CURRENT_YEAR = DATE.getFullYear();
      const CURRENT_AGE = CURRENT_YEAR - year;
      return CURRENT_AGE;
    }

    function getTime(YEAR) {
      let STUDY_YEAR = YEAR + 4;
      return STUDY_YEAR;
    }

    function drawGrid(a) {
      const ROW = document.createElement('div');
      ROW.classList.add('row', 'row-style');

      const DELETE_BTN = document.createElement('button');
      DELETE_BTN.classList.add('btn-outline-danger', 'delete-btn', 'col-1');
      DELETE_BTN.textContent = 'Удалить';

      const FIO = document.createElement('div');
      FIO.classList.add('col-3', 'grid__fio', 'col-style');

      const FAC = document.createElement('div');
      FAC.classList.add('col-2', 'grid__fac', 'col-style');

      const BIRTH = document.createElement('div');
      BIRTH.classList.add('col-3', 'grid__birth', 'col-style');

      const COURSE = document.createElement('div');
      COURSE.classList.add('col-3', 'grid__course', 'col-style');

      GRID.append(ROW);
      ROW.append(DELETE_BTN)
      ROW.append(FIO);
      ROW.append(FAC);
      ROW.append(BIRTH);
      ROW.append(COURSE);

      let fullBirthDate = a.birthday.split('-');
      const birthYear = fullBirthDate[0];
      const birthMonth = fullBirthDate[1];
      const birthDay = fullBirthDate[2];
      const studyYear = a.studyStart.substr(0, 4)


      FIO.textContent = `${a.surname} ${a.name} ${a.lastname}`;
      FAC.textContent = a.faculty;
      BIRTH.textContent = `${birthDay}.${birthMonth}.${birthYear} (${age(birthYear)})`;
      if (age(studyYear) >= 5) {
        COURSE.textContent = 'закончил(а)';
      } else {
        COURSE.textContent = `${studyYear}-${getTime(Number(studyYear))} (${age(studyYear)} курс)`;
      }

      DELETE_BTN.addEventListener('click', async () => {
        if (confirm('Вы уверены?')) {
          await deleteStudentItem(a.id);
          renderStudentsTable()
        }
      });
    }

    async function deleteStudentItem(studentId) {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        studentsArray = studentsArray.filter(student => student.id !== studentId);
      } else {
        console.error('Ошибка при удалении студента:', response.status);
      }
    }

    let DELETE = document.querySelectorAll('.delete-btn');
    DELETE.forEach((button) => {
      button.addEventListener('click', () => {
      const studentId = button.id;
      deleteStudentItem(studentId);
      });
    });

    function sortUsers(arr, prop, dir = false) {
      let result = arr.sort((a, b) => {
        let dirIf = a[prop] < b[prop];
        if (dir == true) dirIf = a[prop] > b[prop];
        if (dirIf == true) return -1;
      });
      return result;
    }

    function sortDates(arr, prop, dir = false) {
      let result = arr.sort((a, b) => {
        let dirIf = a[prop].substr(0, 4) < b[prop].substr(0, 4);
        if (dir == true) dirIf = a[prop].substr(0, 4) > b[prop].substr(0, 4);
        if (dirIf == true) return -1;
      });
      return result;
    }

    function filter() {
      let fioInput = document.querySelector('.filter__name');
      let facInput = document.querySelector('.filter__fac');
      let startInput = document.querySelector('.filter__start');
      let endInput = document.querySelector('.filter__end');

      function applyFilters() {
        let filteredStudents = studentsArray.filter((student) => {
          let fioMatch = student.surname.toLowerCase().includes(fioInput.value.trim().toLowerCase());
          let facMatch = student.faculty.toLowerCase().startsWith(facInput.value.trim().toLowerCase());
          let startMatch = startInput.value === '' || student.studyStart.substr(0, 4).includes(startInput.value);
          let endMatch = endInput.value === '' || String(parseInt(student.studyStart.substr(0, 4)) + 4).includes(endInput.value);

          return fioMatch && facMatch && startMatch && endMatch;
        });

        renderFilteredTable(filteredStudents);
      }

      function renderFilteredTable() {
        GRID.innerHTML = '';
        GRID.append(HEADER);
        for (let student of studentsArray) {
          if (typeof student === 'object') {
            drawGrid(student);
          }
        }
      }

      function handleFilterInput() {
        applyFilters();
      }

      fioInput.addEventListener('input', handleFilterInput);
      facInput.addEventListener('input', handleFilterInput);
      startInput.addEventListener('input', handleFilterInput);
      endInput.addEventListener('input', handleFilterInput);

    }
    filter();

    function gridButtons() {
      let fioBtn = document.querySelector('.fio-button');
      let facBtn = document.querySelector('.fac-button');
      let birthBtn = document.querySelector('.birth-button');
      let startBtn = document.querySelector('.start-button');

      function checkValue(col) {
        return col.checked ? true : false;
      }

      fioBtn.addEventListener('click', () => {
        sortUsers(studentsArray, 'surname', checkValue(fioBtn));
        GRID.innerHTML = '';
        GRID.append(HEADER);
        for (let student of studentsArray) {
          if (typeof student === 'object') {
            drawGrid(student);
          }
        }
      });

      facBtn.addEventListener('click', () => {
        sortUsers(studentsArray, 'faculty', checkValue(facBtn));
        GRID.innerHTML = '';
        GRID.append(HEADER);
        for (let student of studentsArray) {
          if (typeof student === 'object') {
            drawGrid(student);
          }
        }
      });

      birthBtn.addEventListener('click', () => {
        sortDates(studentsArray, 'birthday', checkValue(birthBtn));
        GRID.innerHTML = '';
        GRID.append(HEADER);
        for (let student of studentsArray) {
          if (typeof student === 'object') {
            drawGrid(student);
          }
        }
      });

      startBtn.addEventListener('click', () => {
        sortDates(studentsArray, 'studyStart', checkValue(startBtn));
        GRID.innerHTML = '';
        GRID.append(HEADER);
        for (let student of studentsArray) {
          if (typeof student === 'object') {
            drawGrid(student);
          }
        }
      });
    }
    gridButtons();
    for (let student of studentsArray) {
      if (typeof student === 'object') {
        drawGrid(student);
      }
    }
  }
  getStudentItem();
  await loadStudentItems();
  renderStudentsTable();
  })();
