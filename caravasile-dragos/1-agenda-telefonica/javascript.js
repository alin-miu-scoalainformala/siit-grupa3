
function telefonare() {
   
    var nume = document.getElementById('nume').value;
    var telefon = document.getElementById('telefon').value;
    var rIndex,
    table = document.getElementById("tabel1");



    if((nume !="")&&(telefon !=""))
    {
        var tableRef = document.getElementById('tabel1').getElementsByTagName('tbody')[0];
        var row = tableRef.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        var newText  = document.createTextNode(nume);
        cell1.appendChild(newText);

        var newText1  = document.createTextNode(telefon);
        cell2.appendChild(newText1);

        var newButton1= document.createElement("button");
        var newContentButton1= document.createTextNode("Modifica");
        newButton1.appendChild(newContentButton1);
        cell3.appendChild(newButton1);

        var newButton2= document.createElement("button");
        var newContentButton2= document.createTextNode("Stergeti");
        newButton2.appendChild(newContentButton2);
        cell4.appendChild(newButton2);

        document.getElementById('nume').value = "";
        document.getElementById('telefon').value = "";


        var go = document.getElementById("go");
        var txt = document.getElementById("txt");
        
      

    

        var index, table = document.getElementById('tabel1');
        for(var i = 1; i < table.rows.length; i++)
        {
            table.rows[i].cells[3].onclick = function()
            {
                var c = confirm("Doriti sa stergeti acest contact?");
                if(c === true)
                {
                    index = this.parentElement.rowIndex;
                    table.deleteRow(index);
                }
                
                //console.log(index);
            };
            
        }

       
}
}

