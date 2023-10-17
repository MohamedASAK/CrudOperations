let deleteAllList = document.querySelector("#deleteButton");
let invalid_Span = document.querySelector(".invalid_Span");
let allCost = document.querySelectorAll("#AllCost input");
let createButton = document.querySelector("#addProduct");
let inputNumber = document.querySelectorAll(".inputNum");
let countButton = document.querySelector("#countButton");
let bodyOfAll = document.querySelector(".bodyOfAll");
let allInputs = document.querySelectorAll("input");
let cardData = document.querySelector(".cardData");
let allSpan = document.querySelectorAll(".V_span");
let totalPrice = document.querySelector("#total");
let title = document.querySelector("#title");
let count = document.querySelector("#count");
let tbody = document.querySelector("tbody");
let validationErrors = false;
let mode = "create";
let globalIndex;
let Products;
/* ------------------------------Validation Errors------------------------------ */

// General inputs
for (let i = 0; i < allInputs.length; i++) {
    if(allInputs[i].value == ""){
        validationErrors = false;
    }
    else{
        validationErrors = true;
    }
    allInputs[i].addEventListener("keyup", () => {
        if(allInputs[i].value == "" || allInputs[i].value <= 0){
            validationErrors = false;
            allInputs[i].classList.add("invalid");
            allSpan[i].classList.replace("invalid_Span" , "invalidSpan");
        }
        else{
            validationErrors = true;
            allSpan[i].classList.replace("invalidSpan" , "invalid_Span");
            allInputs[i].classList.remove("invalid");
        }
    });
}

// Numbers inputs
for (let i = 0; i < inputNumber.length; i++) {
    if(allInputs[i].value < 0){
        validationErrors = false;
    }
    else{
        validationErrors = true;
    }
    inputNumber[i].addEventListener("keyup", () => {
        if(inputNumber[i].value <= 0){
            validationErrors = false;
            allSpan[i].classList.add("invalidSpan");
            allSpan[i].classList.remove("invalid_Span");
        }
        else{
            validationErrors = true;
            allSpan[i].classList.add("invalid_Span");
            allSpan[i].classList.remove("invalidSpan");
        }
    });
}

// Title input  check
allInputs[0].addEventListener("keyup", () => {
        if(title.value >= 0 || title.value <= 0){
            validationErrors = false;
            allSpan[i].classList.add("invalidSpan");
            allSpan[i].classList.remove("invalid_Span");
        }
        else{
            validationErrors = true;
            allSpan[i].classList.add("invalid_Span");
            allSpan[i].classList.remove("invalidSpan");
        }
    }
)

/* ------------------------------Create------------------------------ */

let createObject = () => {
    let newProductAdded = {
        title: title.value,
        price: allCost[0].value,
        tax: allCost[1].value,
        discount: allCost[2].value,
        total: totalPrice.value,
        count: count.value,
    }
    if(validationErrors == true){
        if(mode == "create"){
            if(count.value == 1){
                Products.push(newProductAdded); // add one product to array
            }
            else{
                for (let i = 1; i <= count.value; i++) {
                    Products.push(newProductAdded); // add many products to array
                }
            }
        }
        else{
            Products[globalIndex] = newProductAdded;
            createButton.innerHTML= "Add Product";
            count.classList.remove(".none");
            createButton.classList.remove(".update")
            mode = "create";        
        } 
    }
    localStorage.setItem("Products", JSON.stringify(Products));
    deleteInput();
    renderProductsData();
}

// Calculation operation to calculate total price
let getTotal = () => {
    price = allCost[0].value;
    tax = allCost[1].value;
    discount = allCost[2].value;
    let taxCost = +price * + (tax / 100);
    total = (+taxCost + +price) - +discount;
    totalPrice.value = Math.ceil(total);
}

// Events of create 
for (let i = 0; i < allCost.length; i++) {
    allCost[i].addEventListener("keyup", getTotal);
}

createButton.addEventListener("click", createObject);

/* ------------------------------Read------------------------------ */
// Load Event
window.onload = () =>{
    checkLocalStorage();
}

//Get data from local storage if it exist 
let checkLocalStorage = () => {
    if(localStorage.Products != null){
        Products = JSON.parse(localStorage.Products);
        renderProductsData(); 
    }
    else{
        Products = [];
        renderProductsData(); 
    }
}

let renderProductsData = () => {
    checkList();
    let productData = '';
    if(localStorage.Products != null){
        for (let i = 0; i < Products.length; i++) {
            productData +=`
            <tr>
            <td>${i + 1}</td>
            <td>${Products[i].title}</td>
            <td>${Products[i].total}</td>
            <td> <a onclick='productDetails(${i})'> <i class="fa-solid fa-eye"></i> </a></td>
            <td> <a onclick='Update(${i})'> <i class="fa-solid fa-pen-to-square"></i> </a></td>
            <td> <a onclick='deleteItem(${i})'> <i class="fa-solid fa-trash"></i> </a></td>
            </tr>
            `
        }
    }
    tbody.innerHTML = productData;
}

let productDetails = (i) => {
    globalIndex = i;
    bodyOfAll.classList.add("opacityAll");
    cardData.style.display = "block";
    let productIndex = '';
    productIndex +=`
        <h4> <a onclick='closeWindow()'> <i class="fa-solid fa-xmark"></i> close window</a></h4>
        <h4>ID : ${globalIndex+1}</h4>
        <hr>
        <h4>Product Title : ${Products[globalIndex].title}</h4>
        <hr>
        <h4>Price : ${Products[globalIndex].price}</h4>
        <hr>
        <h4>Tax% : ${Products[globalIndex].tax}</h4>
        <hr>
        <h4>Discount : ${Products[globalIndex].discount}</h4>
        <hr>
        <h4>Total : ${Products[globalIndex].total}</h4>
        `
        cardData.innerHTML = productIndex;
        
    }
    let closeWindow = () => {
    bodyOfAll.classList.remove("opacityAll");
    cardData.style.display = "none";
}

let checkList = () => {
    if(Products.length == 0){
        deleteAllList.style.display = "none";
    }else{
        deleteAllList.style.display = "block";
        countButton.innerHTML = Products.length;
    }
}

/* ------------------------------Update------------------------------ */

let Update = (i) =>{
    mode = "update";
    globalIndex = i;
    title.value = Products[i].title;
    allCost[0].value = Products[i].price;
    allCost[1].value = Products[i].tax;
    allCost[2].value = Products[i].discount;
    count.value = Products[i].count;
    totalPrice.value = Products[i].totalPrice;
    count.classList.add("none");
    createButton.innerHTML = `Update Data: ${i + 1}`
    createButton.classList.add(".updateBtn");
    Products[i] = JSON.stringify(localStorage.Products);
    renderProductsData();
}

/* ------------------------------Delete------------------------------ */

//delete input
let deleteInput = () => {
    title.value = "";
    allCost[0].value = "";
    allCost[1].value = "";
    allCost[2].value = "";
    totalPrice.value = "";
    count.value = "";
}

// Delete all products
deleteAllList.addEventListener("click", ()=>{
    localStorage.clear(); //delete local storage
    Products.splice(0); //delete all
    renderProductsData();
});

// Delete one product
let deleteItem = (i) => {
    Products.splice(i,1); // delete one item i
    localStorage.Products = JSON.stringify(Products); // refresh local storage
    renderProductsData();
}

/* ------------------------------End My JS Code------------------------------ */ 