var listaProduse=[];			

function adaugaPreparat(form, event){
    event.preventDefault();            
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            
            if (this.readyState == 4 && this.status == 200) {
               
                window.location="index.html";
            }
        };
        xhttp.open("POST", "https://restaurant-meniu-admin.firebaseio.com/menu/"+window.location.search.substring(4)+".json", true);
        
        xhttp.send(JSON.stringify({					
            imagine: form.querySelector("[name=imagine]").value,
            ingrediente: form.querySelector("[name=ingrediente]").value,
            nume: form.querySelector("[name=nume]").value,
            reteta: form.querySelector("[name=reteta]").value,
        }));
        document.getElementById("loading").style.display="";
    }