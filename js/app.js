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
    toggleSpinner(true)
    const url = (`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
     fetch(url)
    .then(res=>res.json()) 
    .then(data=> displayNewsDetail( data.data)) 
   

}
const displayNewsDetail =  (allnews) =>{
    
    //display no news found
    const noNews = document.getElementById('none-messege')
    noNews.innerText = allnews.length
    
    if(allnews.length !== 0){
        noNews.classList.remove('d-none')
    }
    const viewSort =allnews.sort((a,b) =>{
        if(a.total_view <b.total_view){
            return 1;
        }
        else{
            return -1;
        }
    });
    // else{
    //     noNews.classList.add('d-none')
    // }

    //const allnews = await loadNewsDetail()
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML=''
    allnews.forEach(news => {
        toggleSpinner(false)
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('col-md-4')
        categoryDiv.innerHTML = `
        <div class="card h-100">
        <img src="${news.thumbnail_url ? news.thumbnail_url :'N/A'}" class="card-img-top img-fluid h-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${news.title ? news.title :'N/A'}</h5>
          <p class="card-text">${news.details.length > 150 ? news.details.slice(0,150)+'...' :'N/A'}</p>
        </div>
        <div class="card-footer">
        <div class="d-flex justify-content-between rounded-3 p-2 mb-2">
        <div>
        <img src="${news.image_url ? news.image_url : 'N/A'}" class="avatar">
        <p>${news.author.name ? news.author.name : 'no data found'}</p>
        </div>
        <div>
          <p class="small text-muted mb-1">
            View
          </p>
          <p class="mb-0">${news.total_view ? news.total_view :'N/A'}</p>
        </div>
        <div class="px-3">
        <button type="button" class="btn btn-primary flex-grow-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="loadNewsDetails('${news._id}')">
        Details
        </div>
      </div>
        </div>
      </div>
        
        `
        newsContainer.appendChild(categoryDiv)
        
    });
    //
    toggleSpinner(false)
}

// loader
const toggleSpinner = isLoading=>{
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}

const loadNewsDetails = (newsId) =>{
    const url = (`https://openapi.programming-hero.com/api/news/${newsId}`)
     fetch(url)
    .then(res=>res.json()) 
    .then(data=> displayNewsDetails( data.data[0])) 
   

}
const displayNewsDetails=(data)=>{
    console.log(data)
    const modalTitel = document.getElementById('exampleModalLabel')
    modalTitel.innerText=data.title
    const phoneModalDetails = document.getElementById('modal-detail')
    phoneModalDetails.innerHTML=`
    <p>Detail:${data.details.length > 250 ? data.details.slice(0,250)+'...' :'no data found'}</p>
    <p>Author Name: ${data.author.name ? data.author.name : 'no data found'}</p>
    <p>Published Date: ${data.author.published_date ? data.author.published_date :'no data found'}</p>
    
    `
}

loadNewsDetail('01')
loadNewsCategory()
