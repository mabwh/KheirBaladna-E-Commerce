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

// class Product
// {
//     constructor(name = '', price = '', category = '')
//     {

//     }
// }

// class Guffa
// {
//     constructor(products = null)
//     {
//         this.count = 0;
//         this.products = products;
//     }

//     AddToGuffa(product) {
//         this.products.push(product);
//         this.count++;
//     }

//     RemoveFromGuffa(product)
//     {
//         let arr = [];
//         arr.findIndex(p => p["Name"] == )
//         this.products.indexOf()
//        this.products.splice() 
//     }
// }

export {User};