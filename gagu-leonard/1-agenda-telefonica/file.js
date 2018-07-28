window.onload = function() {

  //buttons
  var quickAddBtn = document.getElementById('QuickAdd');
  var quickAddFormDiv = document.querySelector('.quickaddForm');
  var cancelBtn = document.getElementById('Cancel');
  var AddBtn = document.getElementById('Add');
  //FOrm Fields
  var fullname = document.getElementById('fullname');
  var phone = document.getElementById('phone');

  //divs etc
  var addBookDiv = document.querySelector('.addbook');

  quickAddBtn.addEventListener('click',function(){
    //display the form div
    quickAddFormDiv.style.display = 'block';
  });
  cancelBtn.addEventListener('click', function(){
    quickAddFormDiv.style.display = 'none';
  });
  AddBtn.addEventListener('click', addToBook);

  addBookDiv.addEventListener('click',removeEntry);

  //storage array

  var addressBook = [];
  //localStorage['addbook'] = '[{'fullname':'Sachin B', }]'
  function jsonStructure(fullname,phone){
    this.fullname=fullname;
    this.phone = phone;

  }
  function addToBook(){
    var isNull = fullname.value !='' && phone.value !='' ;
    if (isNull) {
      // format the input into a valid JSON jsonStructure
      var obj = new jsonStructure(fullname.value, phone.value);
      addressBook.push(obj);
      localStorage['addbook'] = JSON.stringify(addressBook);
      quickAddFormDiv.style.display = 'none';
      clearForm();
      showAddressBook();
    }
  }
  function removeEntry(e){
    //remove an entry from the addressbook
    if (e.target.classList.contains('delbutton')) {
      var remID = e.target.getAttribute("data-id");
      addressBook.splice(remID,1);
      localStorage['addbook'] = JSON.stringify(addressBook);
      showAddressBook();
    }
  }
  function clearForm(){
    var formFields = document.querySelectorAll('.formFields');
    for( var i in formFields){
      formFields[i].value = '';
    }
  }
  function showAddressBook(){
    if(localStorage['.addbook'] === undefined){
      localStorage['.addbook'] = '';
    } else{
      addressBook = JSON.parse(localStorage['addbook']);
      //loop over the array addressBook and insert into the page
      addBookDiv.innerHTML = '';
      for(var n in addressBook){
         var str = '<div class="entry">';
         str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
         str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
         str +='<div class="del"><a href="#" class = "delbutton" data-id = "' + n + '">Sterge</a></div>';
         str +='<div class="del"><a href="#" class = "" data-id = "' + n + '">Modifica</a></div>';
         str += '</div>';
         addBookDiv.innerHTML += str;
      }
    }
  }
  showAddressBook();
}