// this is the xhr version of the quotes server lab from zyBook
// note the alternate endpoint which allows it to connect to Pat's node.js version (line 21)

// pre-written from zyBook lab
window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {
 
       // Get values from drop-downs
       const topicDropdown = document.querySelector("#topicSelection");
       const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
       const countDropdown = document.querySelector("#countSelection");
       const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
    
       // Get and display quotes
       fetchQuotes(selectedTopic, selectedCount);
    });
 });
 
 function fetchQuotes(topic, count) {
    let endpoint = "https://wp.zybooks.com/quotes.php"; // from instructions
    //let endpoint = "https://nodequotes.onrender.com/quotes"; // Pat's Node.js version
	let queryString = "topic=" + topic + "&count=" + count; // from instructions 
	let url = endpoint + "?" + queryString;
  
    let xhr = new XMLHttpRequest(); // these steps are based on the interactive exercise
    xhr.addEventListener("load", responseReceivedHandler); // executes the function below
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
	
	// test: type manually on URL bar: https://wp.zybooks.com/quotes.php?topic=love&count=5
 }
  
// TODO: Add responseReceivedHandler() here (zyBook comment)
// this function handles the data that comes back from the remote service
function responseReceivedHandler() {
    let quote = document.querySelector("#quotes"); 
	// let quote = document.getElementById('quotes');
    if (this.status === 200) { // http code 200 = request successful (this=XMLHttpRequest)
       if (this.response.error) { // checks to see if there's an error in the response 
          quote.innerHTML = this.response.error; // displays the error in the quotes div
       } 
       else {
          let html = "<ol>";
          for (let quoteItem of this.response) { // the response will include multiple quotations
			 html += "<li>" + quoteItem.quote + "-" + quoteItem.source + "</li>";
          }
          html += "</ol>";
          
          quote.innerHTML = html;
       }
    } 
    else {
       quote.innerHTML = "Quote is unavailable.";
    }
 }


// This version uses "event" instead of "this"
//   but it does not produce the full points in the assignment (7/10)
/* function responseReceivedHandler(event) {
    const xhr = event.target; // The XMLHttpRequest instance is available as event.target
	  // MDN: "'target' property is a reference to the object onto which the event was dispatched"
    const quote = document.querySelector("#quotes"); // (or .getElementById('quotes'))
    if (xhr.status === 200) { // 200 = OK (http)
        if (xhr.response.error) { // for application-specific errors, instead of server errors
            quote.innerHTML = xhr.response.error; // puts app error on screen
        } else {
            let html = "<ol>";
            for (let quoteItem of xhr.response) {
                html += "<li>" + quoteItem.quote + "-" + quoteItem.source + "</li>";
            }
            html += "</ol>";
            quote.innerHTML = html;
        }
    } else {
        quote.innerHTML = "Quote is unavailable.";
    }
}
*/
