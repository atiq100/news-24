const loadNewsCategory = async(categoryId) => {
    const url = (`https://openapi.programming-hero.com/api/news/categories`)
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategory(data.data.news_category)
}
const displayNewsCategory = (newses) =>{
    const newsContainer = document.getElementById('news-container')
    // display all category
    newses.forEach(news => {
        const categoryLi = document.createElement('li')
        categoryLi.classList.add('nav-item')
        categoryLi.innerHTML = `
        <li class="nav-item ">
        <a class="nav-link text-dark fw-bolder " aria-current="page" href="#">${news.category_name}</a>
      </li>
        `
        newsContainer.appendChild(categoryLi);
    });
}
loadNewsCategory()