const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;

}

//Hide Loading
function complete (){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // If Author field is blank then replace it with "Unknown"
  if (!quote.author) {
    authorText.textcontent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Determine styling base on quote length
  if (quote.text.length > 60) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, "_blank");
}
// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click",tweetQuote);

// On Load
getQuotes();
