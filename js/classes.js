class User
{
    constructor(name = '', email = '', password = '', cart = null)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart || new Cart();
    }
}

class Product
{
    constructor(name = '', price = '', category = '', image ='')
    {
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }
}

class Cart
{
    constructor(products = null)
    {
        this.products = products || [];
    }

    addToCart(product) {
        // Check if product already exists in cart
        const existingProduct = this.products.find(p => p.name === product.name);
        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            product.quantity = 1;
            this.products.push(product);
        }
    }

    removeFromCart(productName)
    {
        const index = this.products.findIndex(p => p.name === productName);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    clearCart() {
        this.products = [];
    }

    getTotal() {
        return this.products.reduce((sum, product) => {
            return sum + (product.price * (product.quantity || 1));
        }, 0);
    }
}

export {User, Product, Cart};