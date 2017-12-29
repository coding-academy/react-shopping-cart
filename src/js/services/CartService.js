import {StorageService} from './StorageService'

var catalog = []
var cartItems = []
var KEY_STORE = 'cartItems';

function serializeCart() {
    StorageService.saveToStorage(KEY_STORE, cartItems);
}

function removeItem(item) {
    cartItems.splice(cartItems.findIndex(i => i === item), 1);
    serializeCart();
}
function findCartItem(item) {
    return cartItems.find(cartItem => cartItem.id === item.id)
}

function increaseItem(item) {
    item.qty++
    serializeCart();
}
function decreaseItem(item) {
    item.qty--;
    if (item.qty === 0)  removeItem(item)
    serializeCart();
}

function addItem(item) {
    const cartItem = findCartItem(item);
    if (!cartItem)  cartItems.push(Object.assign({ qty: 1 }, item));
    else            increaseItem(cartItem);
    serializeCart();
}

function cartTotals(qty = 0, total = 0) {
    cartItems.forEach(cartItem => {
        qty += cartItem.qty;
        total += cartItem.qty * cartItem.cost;
    });
    return { qty, total };
}

function getCatalog() {
    return catalog.map(item => {
        return Object.assign({}, item, cartItems.find(cItem => cItem.id === item.id))
    })
}

function init() {
    for (let i = 1; i < 9; i++) {
        catalog.push({
            'id': 'Item' + i,
            'title': 'Item #' + i,
            'summary': 'A great item indeeed',
            'description': 'what a splendid choice, you are a hero, you should get more respect',
            'cost': i * 10
        });
    }
    var seriazlizedItems = StorageService.loadFromStorage(KEY_STORE);
    if (seriazlizedItems) cartItems = seriazlizedItems;
}


init();
export const CartService = {
    getCatalog,
    cartTotals,
    addItem,
    decreaseItem,
    increaseItem,
    cartItems
} 
