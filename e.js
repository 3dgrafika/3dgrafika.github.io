let jsonData;
let currentPage = 1;
const resultsPerPage = 10;

// Funkcja do pobierania danych z pliku JSON
async function fetchData() {
  try {
    const response = await fetch('e.json');
    jsonData = await response.json();
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    // Dodaj obsługę błędów, na przykład wyświetl komunikat na stronie
  }
}

// Funkcję do pobierania danych z inputów
function getInputValues() {
  // Pobranie wartości z inputów
  const nameValue = document.getElementById('name').value;
  const areaMinValue = document.getElementById('areaMin').value || 0;
  const areaMaxValue = document.getElementById('areaMax').value || Infinity;
  const widthValue = document.getElementById('width').value || Infinity;
  const lengthValue = document.getElementById('length').value || Infinity;

  // Pobranie wartości z checkboxów
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectedOptions = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => parseInt(checkbox.value));

  return { nameValue, areaMinValue, areaMaxValue, widthValue, lengthValue, selectedOptions };
}

// Funkcja do filtrowania danych zgodnie z wartościami pobranymi z inputów
function filterData() {
  // Pobranie wartości z inputów i checkboxów
  const { nameValue, areaMinValue, areaMaxValue, widthValue, lengthValue, selectedOptions } = getInputValues();

  // Sprawdzenie, czy dane zostały załadowane
  if (!jsonData) {
    alert('Dane nie zostały jeszcze załadowane. Proszę spróbować ponownie.');
    return [];
  }

  // Filtracja danych zgodnie z warunkami
  return jsonData.filter(option => {
    return filterCondition(option, nameValue, areaMinValue, areaMaxValue, widthValue, lengthValue, selectedOptions);
  });
}

// Funkcja do sprawdzania warunków filtracji dla pojedynczej opcji
function filterCondition(option, nameValue, areaMinValue, areaMaxValue, widthValue, lengthValue, selectedOptions) {
  return (
    (nameValue === '' || option.name === nameValue) &&
    (parseInt(option.option[0].replace('area', '')) >= areaMinValue &&
      parseInt(option.option[0].replace('area', '')) <= areaMaxValue) &&
    parseInt(option.option[3].replace('width', '')) <= widthValue &&
    parseInt(option.option[2].replace('length', '')) <= lengthValue &&
    selectedOptions.every(selectedOption => option.option.slice(4).includes(selectedOption))
  );
}

// Funkcja do wyświetlania wyniku
function displayResult(filteredData) {
  // Wyświetlenie wyniku
  const resultContainer = document.getElementById('result');
  let html = '';

  // Obliczenie indeksu początkowego i końcowego dla wyników na danej stronie
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    html += `
      <div class="result uk-card uk-transition-toggle">
        <div class="gallery-item-inner gallery-4-3">
          <a href="${item.url}" class="">
            <img class="" src="${item.miniaturka}" loading="lazy" alt="portfolio">
            <div class="uk-transition-fade uk-position-cover uk-position-small uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
              <p class="uk-h6 uk-h4@m uk-margin-remove uk-text-uppercase uk-text-center">${item.nazwa}</p>
            </div>
          </a>
        </div>
      </div>`;
  });

  // Dodanie paginacji
  const totalPages = Math.ceil(filteredData.length / resultsPerPage);
  html += `<ul class="uk-pagination" uk-margin>`;

  // Strzałka w lewo (poprzednia strona)
  html += `<li><a href="" onclick="changePage(${currentPage - 1})"><span uk-pagination-previous></span></a></li>`;

// Wyświetlenie numerów stron
for (let i = 1; i <= totalPages; i++) {
  if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
    if (currentPage === i) {
      html += `<li class="uk-active"><span>${i}</span></li>`;
    } else {
      html += `<li><a href="" onclick="changePage(${i})">${i}</a></li>`;
    }
  } else if (i === currentPage - 3 || i === currentPage + 3) {
    html += `<li class="uk-disabled"><span>…</span></li>`;
  }
}


  // Strzałka w prawo (następna strona)
  html += `<li><a href="" onclick="changePage(${currentPage + 1})"><span uk-pagination-next></span></a></li>`;

  html += `</ul>`;

  if (filteredData.length === 0) {
    resultContainer.innerHTML = `<p>Brak wyniku</p>`;
  } else {
    resultContainer.innerHTML = html;
  }
}


// Funkcja do zmiany aktualnej strony po naciśnięciu paginacji
function changePage(page) {
  currentPage = page;
  const filteredData = filterData();
  displayResult(filteredData);

  // Generowanie i wyświetlanie adresu URL po zmianie strony
  const url = generateUrl();

  // Przewijanie strony do góry
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Funkcja która przekształci wartości z getInputValues na adres URL
function generateUrl() {
  // Pobranie wartości z inputów, checkboxów i aktualnej strony
  const { nameValue, areaMinValue, areaMaxValue, widthValue, lengthValue, selectedOptions } = getInputValues();

  // Utworzenie obiektu z wartościami
  const params = {
    name: nameValue,
    areaMin: areaMinValue,
    areaMax: areaMaxValue,
    width: widthValue,
    length: lengthValue,
    options: selectedOptions.join(','),
    page: currentPage, // Dodanie informacji o aktualnej stronie
  };

  // Utworzenie adresu URL
  const urlSearchParams = new URLSearchParams(params);
  const queryString = urlSearchParams.toString();
  const urlString = window.location.origin + window.location.pathname + '?' + queryString;

  // Dodanie nowego wpisu do historii przeglądarki
  window.history.pushState({ path: urlString }, '', urlString);

  return urlString;
}

// Funkcja do obsługi przycisku
function handleSubmit() {
  // Ustawienie aktualnej strony na 1
  currentPage = 1;

  // Pobranie przefiltrowanych danych
  const filteredData = filterData();

  // Wyświetlenie wyników
  displayResult(filteredData);

  // Generowanie i wyświetlanie adresu URL
  const url = generateUrl();
}

// Funkcja do odczytywania parametrów z adresu URL i aktualizacji inputów
async function updateInputsFromUrl() {
  // Sprawdź, czy dane zostały już wczytane, jeśli nie, zaczekaj na ich załadowanie
  if (!jsonData) {
    await fetchData();
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Pobranie wartości z parametrów URL
  const nameValue = urlParams.get('name') || '';
  const areaMinValue = urlParams.get('areaMin') || 0;
  const areaMaxValue = urlParams.get('areaMax') || Infinity;
  const widthValue = urlParams.get('width') || Infinity;
  const lengthValue = urlParams.get('length') || Infinity;
  const optionsValue = urlParams.get('options') || '';
  const pageValue = urlParams.get('page') || 1;

  // Aktualizacja wartości inputów
  document.getElementById('name').value = nameValue;
  document.getElementById('areaMin').value = areaMinValue;
  document.getElementById('areaMax').value = areaMaxValue;
  document.getElementById('width').value = widthValue;
  document.getElementById('length').value = lengthValue;

  // Zaznaczenie odpowiednich checkboxów
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const optionValue = parseInt(checkbox.value);
    checkbox.checked = optionsValue.split(',').includes(optionValue.toString());
  });

  // Ustawienie aktualnej strony
  currentPage = parseInt(pageValue);
}

// Funkcja do obsługi zdarzenia zmiany historii przeglądarki
window.onpopstate = function (event) {
  // Odczytanie parametrów z adresu URL i aktualizacja inputów
  updateInputsFromUrl();

  // Ponowne przefiltrowanie danych i wyświetlenie wyniku
  const filteredData = filterData();
  displayResult(filteredData);
};

// Wywołanie funkcji przy starcie strony
fetchData().then(() => {
  updateInputsFromUrl();
  const filteredData = filterData();
  displayResult(filteredData);
});
