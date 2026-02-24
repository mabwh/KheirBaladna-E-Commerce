class User
{
    constructor(name = '', email = '', password = '', guffa = null)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.guffa = guffa;
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

class Quffa
{
    constructor(products = null)
    {
        this.count = 0;
        this.products = products;
    }

    AddToQuffa(product) {
        this.products.push(product);
        this.count++;
    }

    RemoveFromQuffa(product)
    {
        if(this.count > 0)
        {
            let remIndex = this.products.findIndex(
                p => p["name"] == product["name"]
            );
            this.products.splice(remIndex, 1);
            this.count--;
        }
    }
}

export {User};