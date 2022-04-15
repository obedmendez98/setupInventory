import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
import "../../css/style.css"
import CollectionBar from "../CollectionBar"
import ProductList from "./list/products"
import { ProductAdd, ProductDelete, ProductEdit}  from "./crud/products"

function Products() {
    return (
      <React.Fragment>
        <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">

          <CollectionBar colection='products'/>

          <HashRouter>
            <Switch>
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/products/add" component={ ProductAdd } />
              <Route exact path="/products/edit/:id" component={ ProductEdit } />
              <Route exact path="/products/delete/:id" component={ ProductDelete } />
            </Switch>
          </HashRouter>

        </div>
      </React.Fragment>
    )
}

export default Products
