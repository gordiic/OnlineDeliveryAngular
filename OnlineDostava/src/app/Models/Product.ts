export class Product {
  id: number = 0;
  name: String = '';
  ingredients: String = '';
  price: number = 0;
  amount: number = 0;

  public GetIngredients(ingredients: String[]) {
    let ret: string = '';
    for (let i = 0; i < ingredients.length; i++) {
      ret += ingredients[i];
    }
    return ret;
  }
  public ToString(product: Product) {
    return (
      'ID: ' +
      product.id +
      ' Name: ' +
      product.name +
      ' Ingredients: ' +
      ' Price: ' +
      product.price +
      ' Amount: ' +
      product.amount
    );
  }
}
