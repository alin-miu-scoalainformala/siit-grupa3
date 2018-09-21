
async function getDetailsAboutProductWithoutAnimation(idProduct){
    var details = await http.GETWITHOUTANIMATION(PRODUCT_URI + idProduct + '.json');
    return details;
}

async function getDetailsAboutProduct(idProduct){
    var details = await http.GET(PRODUCT_URI + idProduct + '.json');
    return details;
}

async function displayDetails(detailsAsPromise){
    var details = await detailsAsPromise;
    setTimeout(() => {
        if(details != null){
            initHTML(details);
            displayDataAboutElement(details);
        }
    }, 500);
    
}

function initHTML(details){
    console.log(details)
    document.querySelector('#main').innerHTML =  `
        <div class="card text-center mb-4 box-shadow">
            <img class="card-img-top pt-3 " id="img" src="" style="width: 400px; height: 287.992px; margin-left: 35%;" alt="Card image cap">
            <div class="card-body ml-5" style="float: right;">
                <h5 class="card-title mb-4" id="title"></h5>
                <h6 class="card-subtitle" id="price"></h6><br/>
                <h6 class="card-subtitle" id="desc"></h6><br/>
                <button class="btn btn-primary my-2 my-sm-0" onclick="putInYourCart();" data-toggle="alert">Add to cart</button>
            </div>
        </div>
    `;
    document.querySelector('#main').className = 'jumbotron container';
}


function displayDataAboutElement(details){
    document.getElementById('img').src = details.img;
    document.getElementById('title').innerHTML = details.title;
    document.getElementById('price').innerHTML = parsePrice(details.price);
    document.getElementById('desc').innerHTML = details.descriere;   
}

async function putInYourCart(){
    document.querySelector('.alert').style = "visibility: visible;";
    setTimeout(() => {
        document.querySelector('.alert').style = "visibility: hidden;";
    }, 3000);
    var productData = await getDetailsAboutProductWithoutAnimation(getProductIdFromURL());
    var cartList = JSON.parse(localStorage.getItem('cart'));
    cartList.push({'nume': productData.title,
                   'key': getProductIdFromURL(),   
                   'cantitate': 1,
                   'inStoc': productData.cantitate,
                   'pret': productData.price});
                   
    localStorage.setItem('cart', JSON.stringify(cartList));
}
