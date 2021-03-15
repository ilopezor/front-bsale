function getData(){
    let value;
    fetch('http://127.0.0.1:8000/api/product_category')
    .then(response => response.json())
    .then(function(data){
        value = data.data;
        let div = document.getElementById('writeData');
 
        value.forEach(element => {
            let item = element.product;
            let value = element.category;
            div.innerHTML += ('<br>');
            div.innerHTML += ('<h2><strong>' + value.name.toUpperCase() + '</strong></h2>');
            item.forEach(data => {
                let dateDiv = ('<div style="margin: 30px;" class="card col-sm-3">');
                data.url_image = data.url_image == null || data.url_image == "" ? "src//assets//img//noimage.jpg":data.url_image;
                dateDiv += ('<img style="width: 180px; height: 180px" src="'+data.url_image+'">');
                dateDiv += ('<h5>'+data.name+'</h5>')
                dateDiv += ('<nav class="navbar navbar-light bg-light">')
                dateDiv += ('<h5>$'+finalFormat(data.price.toFixed(2))+'</h5>')
                dateDiv += ('<button type="button" class="btn btn-link">')
                dateDiv += ('<i><img style="width: 30px;" src="src//assets//img//anadir.png"></i>')
                dateDiv += ('</button>')
                dateDiv += ('</nav>');
                dateDiv += ('</div>');
                dateDiv += ('<br>');
                div.innerHTML += dateDiv;
            });
            
        });
    }).catch(function(error) {
        console.log(error);
    });
}
function finalFormat(value){
    let num = value; //.toString().replace('.','').replace(',','.');
    num +='';
    let splitStr = num.split('.');
    let splitLeft = splitStr[0];
    let splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
    let regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
    }
    let price=splitLeft +splitRight;
    return price;
}

window.onload = getData();