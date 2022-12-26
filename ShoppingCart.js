if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready();
}

function ready() {
    const removebtn = document.getElementsByClassName('remove_product');

    for (let i = 0; i < removebtn.length; i++) {
        let button = removebtn[i];

        button.addEventListener('click', removeItem)
    }

    const addCartBtn = document.getElementsByClassName('add-to-cart-btn')

    for (let i = 0; i < addCartBtn.length; i++) {
        let Addcart = addCartBtn[i];

        Addcart.addEventListener('click', AddtoCartClicked)

    }

    const increaseqty = document.getElementsByClassName('increase_item')
    for (let i = 0; i < increaseqty.length; i++) {
        let plus = increaseqty[i];
        plus.addEventListener('click', moreItem)
    }


    const decreaseqty = document.getElementsByClassName('decrease_item')
    for (let i = 0; i < decreaseqty.length; i++) {
        let less = decreaseqty[i];
        less.addEventListener('click', lessItem)
    }
}

function moreItem(event) {
    let moreclicked = event.target;
    let quantityElement = moreclicked.parentElement.getElementsByClassName('item_qty')[0]

    const quantity = Number(quantityElement.innerText)
    quantityElement.innerText = (quantity + 1)

    updateCartTotal()
}

function lessItem(event) {
    let moreclicked = event.target;
    let quantityElement = moreclicked.parentElement.getElementsByClassName('item_qty')[0]
    const quantity = Number(quantityElement.innerText)
    quantityElement.innerText = (quantity - 1)
    quantitycheck(quantityElement)
    updateCartTotal()
}

function quantitycheck(myqty) {
    if (Number(myqty.innerText) < 1) {
        myqty.parentElement.parentElement.remove();
        alert('You put item quantity 0 - so item is remove!')
    }
}

function AddtoCartClicked(event) {
    let addclicked = event.target;

    const addclickParent = addclicked.parentElement
    const ProductName = addclickParent.getElementsByClassName('product_name')[0].innerText
    const ProductPrice = Number(addclickParent.getElementsByClassName('product_price')[0].innerText)
    const imgUrl = addclickParent.getElementsByClassName('product_img')[0].getAttribute('src')

    AddtoCartItem(ProductName, ProductPrice, imgUrl)
    updateCartTotal()
    
}

function AddtoCartItem(ProductName, ProductPrice, imgUrl) {

    const cartContainer = document.getElementById('added-items')
    const addingElement = document.createElement('div');
    addingElement.setAttribute('class', 'modal-cart');

    const product_name = document.getElementsByClassName('modal_product_name');
    for (let i = 0; i < product_name.length; i++) {
        if (product_name[i].innerText === ProductName) {
            alert('Item Already Added dude what you doin!!!')
            return;
        }
    }
    addingElement.innerHTML = `<div class="modal_product_detail">
            <img src="${imgUrl}" alt="product1" class="modal_product_img">
            <span class="modal_product_name">${ProductName}</span>
        </div>
        <div class="modal_price_detail">
            <strong>&#x20B9;</strong>
            <span class="modal_product_price">${ProductPrice}</span>
        </div>
        <div class="qty_div">
            <strong class="increase_item">&plus;</strong>
            <strong class="item_qty">1</strong>
            <strong class="decrease_item">&minus;</strong>
        </div>
        <div class="remove">
            <button class="remove_product">
                Remove
            </button> 
        </div>`
    cartContainer.appendChild(addingElement);

    addingElement.getElementsByClassName('remove_product')[0].addEventListener('click', removeItem)
    addingElement.getElementsByClassName('increase_item')[0].addEventListener('click', moreItem)
    addingElement.getElementsByClassName('decrease_item')[0].addEventListener('click', lessItem)
    alert('Item Added Successfully')
}

function removeItem(event) {
    let buttonclicked = event.target;
    buttonclicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const cartContainer = document.getElementById('added-items');
    const eachRow = cartContainer.getElementsByClassName('modal-cart');
    let total = 0;
    for (let i = 0; i < eachRow.length; i++) {
        let row = eachRow[i];
        let priceElement = row.getElementsByClassName('modal_product_price')[0];
        let qtyElement = row.getElementsByClassName('item_qty')[0]
        // console.log(priceElement, qtyElement)

        const price = Number(priceElement.innerText)
        const qty = Number(qtyElement.innerText)
        total = total + price * qty
    }
    const amountToPay = document.getElementById('Total-price');
    amountToPay.innerText = total
}





const mymodal = document.querySelector('.my-modal');

const closebtn = document.getElementById('close-btn')

const cartbtn = document.getElementById('cart-img')

cartbtn.addEventListener('click', function () {
    mymodal.style.display = 'block'
})

closebtn.addEventListener('click', function () {
    mymodal.style.display = 'none'
})

//if user click anywhere outside the modal (cart)

window.addEventListener('click', function (e) {
    if (e.target === mymodal) {
        mymodal.style.display = 'none'
    }
})