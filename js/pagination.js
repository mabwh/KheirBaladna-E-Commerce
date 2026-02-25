
let items = [];          
let pages = [];          
let capacity = 6;        
let activePageItem = null;

let priceFilterActive = false;
let categoryFilterActive = false;

let selectedMinPrice = 0;
let selectedMaxPrice = Infinity;
let selectedCategory = null;

async function fetchItems()
{
    let response = await fetch("js/ShopDB.json");
    items = await response.json();

    paginate();
}

function filter(itemsArr, callback)
{
    let result = [];

    for (let i = 0; i < itemsArr.length; i++)
    {
        if (callback(itemsArr[i]))
        {
            result.push(itemsArr[i]);
        }
    }

    return result;
}

function paginate()
{
    let filteredItems = items;

    if (priceFilterActive)
    {
        filteredItems = filter(filteredItems, function(item)
        {
            return item.price >= selectedMinPrice &&
                   item.price <= selectedMaxPrice;
        });
    }

    if (categoryFilterActive)
    {
        filteredItems = filter(filteredItems, function(item)
        {
            return item.category === selectedCategory;
        });
    }

    let count = filteredItems.length;

    let pagesCount = Math.floor((count + capacity - 1) / capacity);
    pages = new Array(pagesCount);

    for (let p = 0; p < pagesCount; p++)
    {
        let start = p * capacity;
        let end = Math.min(start + capacity, count);
        let pageSize = end - start;

        pages[p] = new Array(pageSize);

        for (let i = start; i < end; i++)
        {
            pages[p][i - start] = filteredItems[i];
        }
    }

    fillPages();
}

function replaceActivePageItem(oldActive, newActive)
{
    if (!newActive || isNaN(parseInt(newActive.textContent)))
        return;

    oldActive?.setAttribute("class", "page-item");

    activePageItem = newActive;
    activePageItem.setAttribute("class", "active-page-item");
}


function createPageButton(callback, content)
{
    let btn = document.createElement("button");
    btn.onclick = callback;
    btn.textContent = content;
    btn.setAttribute("class", "page-item");

    return btn;
}


function fillGrid(pageItem, pageArr)
{
    replaceActivePageItem(activePageItem, pageItem);

    let grid = document.getElementById("grid-container");
    grid.replaceChildren();

    for (let i = 0; i < pageArr.length; i++)
    {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");

        const imagePath = `img/${pageArr[i].category}/${pageArr[i].image}`;

        gridItem.innerHTML = `
            <img src="${imagePath}" alt="${pageArr[i].name}" class="product-image">
            <h4>${pageArr[i].name}</h4>
            <p class="product-price">Price: $${pageArr[i].price}</p>
            <p class="product-category">Category: ${pageArr[i].category}</p>
            <div class="product-buttons">
                <button class="btn-view-details" onclick="viewProductDetails('${pageArr[i].name}')">View Details</button>
                <button class="btn-add-to-cart" onclick="addProductToCart('${pageArr[i].name}')">Add to Cart</button>
            </div>
        `;

        grid.appendChild(gridItem);
    }
}

function viewProductDetails(productName) {
    const product = items.find(p => p.name === productName);
    if (product) {
        localStorage.setItem("activeProduct", JSON.stringify(product));
        window.location.href = "product.html";
    }
}

function addProductToCart(productName) {
    const product = items.find(p => p.name === productName);
    if (product) {
        let activeUser = JSON.parse(localStorage.getItem("activeUser"));
        if (activeUser) {
            if (!activeUser.cart) {
                activeUser.cart = { products: [] };
            }
            
            // Check if product already exists
            const existingProduct = activeUser.cart.products.find(p => p.name === productName);
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                product.quantity = 1;
                activeUser.cart.products.push(product);
            }
            
            localStorage.setItem("activeUser", JSON.stringify(activeUser));
            
            // Update cart badge
            const cartBadge = document.getElementById("cart-badge");
            if (cartBadge) {
                const newCount = activeUser.cart.products.length;
                cartBadge.textContent = newCount;
                cartBadge.style.display = "block";
            }
            
            alert("Product added to cart!");
        }
    }
}


function fillPages()
{
    let pagesContainer = document.getElementById("pages-container");
    pagesContainer.replaceChildren();
    activePageItem = null;

    if (pages.length === 0)
        return;

    let prevBtn = createPageButton(function()
    {
        if (activePageItem?.previousElementSibling)
        {
            replaceActivePageItem(activePageItem, activePageItem.previousElementSibling);
            fillGrid(activePageItem, pages[parseInt(activePageItem.textContent) - 1]);
        }
    }, "Previous");

    pagesContainer.appendChild(prevBtn);

    for (let i = 0; i < pages.length; i++)
    {
        let pageBtn = createPageButton(
            function(){ fillGrid(this, pages[i]); },
            i + 1
        );

        if (activePageItem == null)
        {
            activePageItem = pageBtn;
            activePageItem.setAttribute("class", "active-page-item");
            fillGrid(activePageItem, pages[0]);
        }

        pagesContainer.appendChild(pageBtn);
    }

    let nextBtn = createPageButton(function()
    {
        if (activePageItem?.nextElementSibling)
        {
            replaceActivePageItem(activePageItem, activePageItem.nextElementSibling);
            fillGrid(activePageItem, pages[parseInt(activePageItem.textContent) - 1]);
        }
    }, "Next");

    pagesContainer.appendChild(nextBtn);
}

function applyPriceFilter(min, max)
{
    selectedMinPrice = min;
    selectedMaxPrice = max;
    priceFilterActive = true;

    paginate();
}

function clearPriceFilter()
{
    priceFilterActive = false;
    paginate();
}


function applyCategoryFilter(category)
{
    selectedCategory = category;
    categoryFilterActive = true;

    paginate();
}

function clearCategoryFilter()
{
    categoryFilterActive = false;
    paginate();
}

// Expose functions globally
window.fetchItems = fetchItems;
window.applyPriceFilter = applyPriceFilter;
window.applyCategoryFilter = applyCategoryFilter;
window.clearPriceFilter = clearPriceFilter;
window.clearCategoryFilter = clearCategoryFilter;
window.viewProductDetails = viewProductDetails;
window.addProductToCart = addProductToCart;

fetchItems();