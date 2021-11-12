import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vegetables: [
        { pid: 17, name: "Cabbage", price: 1.5 },
        { pid: 20, name: "Lettuce", price: 0.55 },
        { pid: 21, name: "Parsnips", price: 1.25 },
        { pid: 154, name: "Potatoes", price: 2.25 },
        { pid: 29, name: "Carrots", price: 0.85 },
        { pid: 28, name: "Cauliflower", price: 1.85 },
        { pid: 8, name: "Pumpkin", price: 2.95 },
        { pid: 34, name: "Brocolli", price: 0.95 }
      ],
      basket: []
    };
    this.emptyBasket = this.emptyBasket.bind(this);
    this.addProductByID = this.addProductByID.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.deleteProductFromBasket = this.deleteProductFromBasket.bind(this);
  } // end constructor

  /** This function extracts the required object from the
   * this.state.vegetables array and then inserts this object
   * into the this.state.basket array (using concat).
   * Remember, the filter function call will only return one object.
   * That object will be the object with the matching pid.
   */
  addProductByID(id) {
    let foundProduct = this.state.vegetables.filter(
      this.searchForProductByID(id)
    );
    this.setState({ basket: this.state.basket.concat(foundProduct) });
  }

  /** This is our filter function. We use this to filter objects
   * in the array by accessing
   * the pid property
   */
  searchForProductByID(id) {
    return function (theObject) {
      return theObject.pid === id;
    };
  }

  /** This function has two roles. First, we find the
   * index of the object we want to delete using findIdex
   * and searchForProductByID.
   * If this index is >= 0 then we call removeProduct.
   */
  deleteProductFromBasket(productID) {
    let indexToRemove = this.state.basket.findIndex(
      this.searchForProductByID(productID)
    );
    if (indexToRemove >= 0) this.removeProduct(indexToRemove);
  }
  /** This function uses splice()
   * to remove a specified index from the array.
   * We remove ONE element at the index specified by indexToRemove
   */
  removeProduct(indexToRemove) {
    // we will try to splice the array at the index indexToRemove
    if (this.state.basket.length > 0) {
      // we can splice.
      let tempBasket = this.state.basket;
      tempBasket.splice(indexToRemove, 1); // splice at indexToRemove
      // and remove one element.
      this.setState({ basket: tempBasket });
    }
  }

  emptyBasket() {
    this.setState({ basket: [] });
  }

  sortBasket(dx, dy) {
    let DX = dx.name.toUpperCase();
    let DY = dy.name.toUpperCase();
    if (DX > DY) return 1;
    else if (DX < DY) return -1;
    else return 0;
  }



  render() {
    return (
      <div class="container" className="App">
        <h1>CS385 Vegetable Shop</h1>
        <div class="table-responsive-sm">
          <table class="table  table-sm">
            {this.state.vegetables.sort(this.sortBasket).map((v, i) => (
              <tr key={i}>
                <td>
                  <b>{v.name}</b>: {v.price}
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-link"
                    onClick={() => {
                      this.addProductByID(v.pid);
                    }}
                  >
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>

        {/* Basket component called from parent */}
        <Basket
          basket={this.state.basket}
          removal={this.deleteProductFromBasket}
        />

        {this.state.basket.length > 0 && (
          <button
            type="button"
            class="btn btn-outline-dark btn-block"
            onClick={this.emptyBasket}
          >
            Empty Basket
          </button>
        )}
      </div>
    ); // end of return statement
  } // end of render function
} // end of class
//**************************************************//
class Basket extends Component {
  /** This callback function will be used by the reduce
   * function call. We use this to calculate the total
   * cost of objects in this.state.basket.
   */
  getBasketTotalValue(acc, obj) {
    return acc + obj.price;
  }

  sortBasket(dx, dy) {
    let DX = dx.name.toUpperCase();
    let DY = dy.name.toUpperCase();
    if (DX > DY) return 1;
    else if (DX < DY) return -1;
    else return 0;
  }

  render() {
    const localBasket = this.props.basket;
    const removeObjectFunction = this.props.removal;
    return (
      <div className="Basket">
        <hr />
        {/* Conditional Rendering */}
        {localBasket.length > 0 &&
          localBasket.sort(this.sortBasket).map((b, index) => (
            <div key={index}>
              <b>{b.name}</b>: {b.price}{" "}
              <button
                type="button"
                class="btn btn-link"
                onClick={() => {
                  removeObjectFunction(b.pid);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        <br />
        {localBasket.length > 0 && (
          <p>
            <b>Total: </b>{" "}
            {localBasket.reduce(this.getBasketTotalValue, 0).toFixed(2)}
            <br />
            <b>Total Items:</b> {localBasket.length}
          </p>
        )}
      </div>
    );
  }
} // close the Basket component

export default App;