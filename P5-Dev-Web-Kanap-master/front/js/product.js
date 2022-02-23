const searchParam = new URLSearchParams(window.location.search).get("id");
const itemColors = document.getElementById("colors");
const itemQuantity = document.getElementById("quantity");
const productPrice = document.getElementById("price");
const pushCart = document.getElementById("addToCart");
const cart = new Array();

fetch(`http://localhost:3000/api/products/${searchParam}`)
    .then(response => response.json())
    .then(data => {postData(data)}
);

if (localStorage.getItem("cart")) {
    for (const element of JSON.parse(localStorage.getItem("cart"))) {
        cart.push(element);
    }
}

pushCart.addEventListener("click", function(){
    toCart(searchParam, itemColors, itemQuantity, productPrice)
});

function postData(data) {
    const itemImg = document.querySelector(".item__img");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    itemImg.innerHTML = `<img src="${data.imageUrl}" alt=${data.altTxt}>`;
    title.innerHTML = data.name;
    productPrice.innerHTML = data.price;
    description.innerHTML = data.description;
    for(color of data.colors){
        itemColors.innerHTML += `<option value="${color}">${color}</option>`;
    };
}

function toCart(id, color, quantity, price) {
    if((!quantity.value || quantity.value == "null" || quantity.value == 0) || (!color.value || (color.value == "" && color.value == "null"))){
        alert("Vérifier votre séléction de couleur ainsi que la quantité séléctionnée.");
    }
    else{
        const index = cart.findIndex(article => article.id === id && article.color === color.value);
        if(index !== -1){
            cart[index].quantity = parseInt(cart[index].quantity) + parseInt(quantity.value);
        }
        else{
            cart.push(new Object({id: id, color: color.value, quantity: parseInt(quantity.value), price: price.innerText}));
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}