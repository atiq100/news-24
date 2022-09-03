const loadNewsCategory = (category) => {
    const url = (`https://openapi.programming-hero.com/api/news/categories`)
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayNewsCategory(data.data.news_category))
}
const displayNewsCategory = (newses) =>{
    const categoryContainer = document.getElementById('category-container')
    // display all category
    newses.forEach(news => {
        const categoryLi = document.createElement('li')
        categoryLi.classList.add('nav-item')
        categoryLi.innerHTML = `
        <li class="nav-item" >
        <button onclick="loadNewsDetail('${news.category_id}')" class="btn btn-outline-primary  fw-bolder " href="">${news.category_name}</button>
      </li>
        `
        
        categoryContainer.appendChild(categoryLi);
    });
}
const loadNewsDetail = (categoryId) =>{
    const url = (`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
     fetch(url)
    .then(res=>res.json()) 
    .then(data=> displayNewsDetail( data.data)) 
   
   
    

}
const displayNewsDetail =  (allnews) =>{
    
    //const allnews = await loadNewsDetail()
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML=''
    allnews.forEach(news => {
       
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('col-md-4')
        categoryDiv.innerHTML = `
        <div class="card h-100">
        <img src="${news.thumbnail_url ? news.thumbnail_url :'N/A'}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${news.title ? news.title :'N/A'}</h5>
          <p class="card-text">${news.details.length > 150 ? news.details.slice(0,150)+'...' :'N/A'}</p>
        </div>
        <div class="card-footer">
        <div class="d-flex justify-content-start rounded-3 p-2 mb-2">
        <div>
        <img src="${news.image_url ? news.image_url : 'N/A'}" class="rounded-2 w-25">
        <p>${news.author.name}</p>
        </div>
        <div>
          <p class="small text-muted mb-1">
            View
          </p>
          <p class="mb-0">${news.total_view}</p>
        </div>
        <div class="px-3">
        <button type="button" class="btn btn-primary flex-grow-1">
        Details
        </div>
      </div>
        </div>
      </div>
        
        `
        newsContainer.appendChild(categoryDiv)
        
    });
}


loadNewsCategory()
