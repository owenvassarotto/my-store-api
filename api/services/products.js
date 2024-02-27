const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const boom = require("@hapi/boom");

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  create({name, price, image}){
    const product = {
      id: uuidv4(),
      name,
      price,
      image,
    }

    this.products.push(product);

    return product;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
  }

  findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product) throw boom.notFound("Product not found :/")
    return product;
  }

  update(id, body){
    // Find the index of the product with the provided ID
    const index = this.products.findIndex(item => item.id === id);

    if(index === -1){
      throw boom.notFound("Product not found :/");
    }

    // Store the actual product object found at the index
    const actualProduct = this.products[index];

    // Remove the old product at the index and insert an updated product object
    this.products.splice(index, 1, {
      id,
      // Update the name of the product with the new value if provided, otherwise keep the old name
      name: body.name || actualProduct.name,
      // Update the price of the product with the new value if provided, otherwise keep the old price
      price: body.price || actualProduct.price,
      // Update the image of the product with the new value if provided, otherwise keep the old image
      image: body.image || actualProduct.image,
    });

    // Return the updated product object
    return this.products[index];
  }

  delete(id){
    this.products.filter(item => item.id !== id);
  }

}

module.exports = ProductService;
