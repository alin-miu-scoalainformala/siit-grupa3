var movieListUrl = 'http://www.omdbapi.com/?apikey=fe7364b5&r=xml&plot=full&s=';
var movieDetailsUrl = 'http://www.omdbapi.com/?apikey=fe7364b5&r=xml&plot=full&i=';

function getList(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xml = this.responseXML;
            var results = xml.getElementsByTagName("result");
            for(let i=0; i<results.length; i++){
                var title = results[i].getAttribute('title');
                console.log(title);
            }
        }
    };
    xhttp.open("GET", `http://www.omdbapi.com/?apikey=fe7364b5&r=xml&plot=full&s=${name}`, true);
    xhttp.send();
}
getList('fast');
