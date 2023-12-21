class JekyllSearch {
  constructor(dataSource, searchField, resultsList, siteURL, checkboxes) {
    this.dataSource = dataSource;
    this.searchField = document.querySelector(searchField);
    this.resultsList = document.querySelector(resultsList);
    this.siteURL = siteURL;
    this.checkboxes = checkboxes;
    this.currentPage = 1;
    this.displayResults = this.displayResults.bind(this);
    console.log('checkboxes:', checkboxes);

    this.init(); // Dodane wywołanie init() w konstruktorze
  }

  async fetchedData() {
    const response = await fetch(this.dataSource);
    return response.json();
  }

  async findResults() {
    const data = await this.fetchedData();
    const searchWords = this.searchField.value.trim().split(/\s+/);
    console.log('searchWords:', searchWords);
    const selectedTags = Array.from(this.checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    console.log('selectedTags:', selectedTags);

    return data.filter(item => {
      const matchesSearch = searchWords.every(word => {
        const regex = new RegExp(word, 'giu');
        return item.title.match(regex) || item.tags.match(regex);
      });

      const matchesTags = selectedTags.every(tag => item.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }

  async displayResults() {
    const results = await this.findResults();

    const pageSize = 3;
    const totalPages = Math.ceil(results.length / pageSize);

    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentResults = results.slice(startIndex, endIndex);

    const html = currentResults.map(item => {
      return `
        <div class="result uk-card uk-transition-toggle">
          <div class="gallery-item-inner gallery-1-1">
            <a href="${this.siteURL + item.url}" class="">
              <img class="" src="${item.thumbnail}" loading="lazy" alt="portfolio">
              <div class="uk-transition-fade uk-position-cover uk-position-small uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
                <p class="uk-h6 uk-h4@m uk-margin-remove uk-text-uppercase uk-text-center">${item.title}</p>
              </div>
            </a>
          </div>
        </div>`;
    }).join('');

    if (currentResults.length === 0) {
      this.resultsList.innerHTML = `<p>Sorry, nothing was found</p>`;
    } else {
      this.resultsList.innerHTML = html;
      this.displayPagination(totalPages, this.currentPage);
    }

    const selectedTags = Array.from(this.checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    url.searchParams.set("search", this.searchField.value);
    url.searchParams.set("tags", selectedTags.join(','));
    url.searchParams.set("page", this.currentPage);
	const url = new URL(document.location);
    console.log('currentPage:', this.currentPage);
  }

  displayPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const previousButton = document.createElement('li');
    previousButton.innerHTML = `<a href=""><span uk-pagination-previous></span></a>`;
    previousButton.addEventListener('click', () => this.changePage(this.currentPage - 1));
    paginationContainer.appendChild(previousButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('li');
      if (i === this.currentPage) {
        pageButton.classList.add('uk-active');
        pageButton.innerHTML = `<span>${i}</span>`;
      } else {
        pageButton.innerHTML = `<a href="">${i}</a>`;
        pageButton.addEventListener('click', () => this.changePage(i));
      }
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.innerHTML = `<a href=""><span uk-pagination-next></span></a>`;
    nextButton.addEventListener('click', () => this.changePage(this.currentPage + 1));
    paginationContainer.appendChild(nextButton);
  }

  changePage(newPage) {
    this.currentPage = newPage;
    const url = new URL(document.location);
    url.searchParams.set("page", this.currentPage);
    window.history.pushState('', '', url.href);
    this.displayResults();
  }

  init() {
    const url = new URL(document.location);
    if (url.searchParams.get("search")) {
      this.searchField.value = url.searchParams.get("search");
    }

    const tagsParam = url.searchParams.get("tags");
    if (tagsParam) {
      const selectedTags = tagsParam.split(',');
      this.checkboxes.forEach(checkbox => {
        checkbox.checked = selectedTags.includes(checkbox.value);
      });
    }

    const pageCurrentParam = url.searchParams.get("page");
    if (pageCurrentParam) {
      this.currentPage = parseInt(pageCurrentParam) || 1;
    }
	// Dla przycisku wstecz
	window.addEventListener('popstate', function(event) {
		location.reload();
	});

	// Dla przycisku do przodu
	window.addEventListener('pushstate', function(event) {
		location.reload();
	});

    this.displayResults();

    this.searchField.addEventListener('keyup', () => {
      this.currentPage = 1;
      this.displayResults();
      url.searchParams.set("search", this.searchField.value);
      this.updateUrl(url);
    });

    this.searchField.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
      this.currentPage = 1;

    });

    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.currentPage = 1;
        this.displayResults();
        url.searchParams.set("search", this.searchField.value);
        this.updateUrl(url);
      });
    });
  }

  updateUrl(url) {
    const selectedTags = Array.from(this.checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    url.searchParams.set("tags", selectedTags.join(','));
    url.searchParams.set("page", this.currentPage);
    window.history.pushState('', '', url.href);
  }
}