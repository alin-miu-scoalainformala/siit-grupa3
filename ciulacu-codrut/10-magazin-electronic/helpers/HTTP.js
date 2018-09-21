class Http{
    GET(uri){
        let body = document.querySelector('#main');
        return fetch(uri, {
            method: 'GET'
        })
        .then(res => {
            body.innerHTML += `
                    <img id="imaginePh" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="Card image cap" style="">
            `;

            return res.json(); 
        });
    }

    POST(uri, obj){
        return fetch(uri, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json());
    }

    PUT(uri, obj){
        return fetch(uri, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json());
    }

    DELETE(uri){
        return fetch(uri, {
            method: 'DELETE'
        })
        .then(res => res.json());
    }
}