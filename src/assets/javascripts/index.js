/*
Esta funcion tiene como objetivo hacer la petición  a la api por medio de un fetch()
y recibir el retorno de la misma, despues de esto, hacer la asignacion del la data al HTML de forma
que se pueda entender y quede agradable para el usuario.
value: Guarda la data retornada.
item: guarda los productos qu vienen en el array.
cate: Guarda las categorias del array.
div: Guarda el element HTML donde se va a colocar la data.
Cuando se hace  el forEach al "item", se hace la asignacion de cada uno de los elementos que van a componer el HTML de cada producto.

*/ 
function getData(){
    let value;
    fetch('http://127.0.0.1:8000/api/product_category')
    .then(response => response.json())
    .then(function(data){
        value = data.data;
        let div = document.getElementById('writeData');
 
        value.forEach(element => {
            let item = element.product;
            let cate = element.category;
            div.innerHTML += ('<br>');
            div.innerHTML += ('<h2><strong>' + cate.name.toUpperCase() + '</strong></h2>');
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

/*
Funcion encargada de hacer la asignacion de "." y ",", siendo la primera para valores decimales y 
la segunda para separar lo miles.
num: Esta variable recibe el valor a convertir.
splitStr: Esta variable recibe un array del valor realizado con un split() por medio del "." como separador inicial para los deciamales.
splitLeft: Recibe la primera parte del array que llevara el valor de miles.
splitRight: Recibe la segunda parte del array a la cual se le sumara un "." en la parte izquierda de este valor representando el valor decimal.
regx: Exprecion regular la cual se pasara por medio de un ciclo para haver el valor de miles.
price: agrupa  splitLeft y splitRight dando como resultado el valor con separacion de miles y descimales.
*/ 
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