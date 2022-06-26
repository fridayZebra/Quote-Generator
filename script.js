const quoteContainer = document.getElementById('container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('newQuote')
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author is blank and replace with 'unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 65) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On page loadt
getQuotes();



