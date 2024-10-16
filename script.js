const API_KEY = "5d6da7d7a97e4eb3a11f2c50210cc36b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));


// function for chnage into dark mode 
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

// this function is scroll the data 
window.onscroll = function() {showScrollTopBtn()};
  
function showScrollTopBtn() {
  let scrollTopBtn = document.getElementById('scrollTopBtn');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
}
// function for bookmark
function bookmarkArticle() {
    const articleTitle = document.title; // Get current article title
    localStorage.setItem('bookmarkedArticle', articleTitle); // Save in local storage
    document.getElementById('bookmarkMessage').innerText = "Article bookmarked!";
  }

document.addEventListener("DOMContentLoaded", function() {
    // Simulated weather data fetch
    setTimeout(function() {
      document.getElementById("weather-widget").innerHTML =
       ` <h3>Current Weather</h3>
        <p>Location: New York</p>
        <p>Temperature: 22°C</p>
        <p>Condition: Sunny</p>`;
    }, 2000); // Simulate API call delay
  });


// function for share button
function share(platform) {
    const articleUrl = window.location.href;
    let shareUrl = '';

    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${articleUrl}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${articleUrl}`;
    }

    window.open(shareUrl, '_blank');
  }


//  function for scroll top 
function scrollToTop() {
//   document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// this is made when we click on logo then it will get back you to home
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});