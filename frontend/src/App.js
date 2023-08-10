import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PolishList from "./components/PolishList";
import PolishShow from "./components/PolishShow";
import CreatePolish from "./components/CreatePolish"
import UpdateReview from "./components/UpdateReview";
import ManageReviews from "./components/ManageReviews";
import CartShow from "./components/CartShow";
import ManagePolishes from "./components/ManagePolishes";
import UpdatePolish from "./components/UpdatePolish";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path={'/polishes/current'}>
          <ManagePolishes />
        </Route>
        <Route exact path={'/reviews/current'}>
          <ManageReviews />
        </Route>
        <Route exact path={'/polishes/new'}>
          <CreatePolish />
        </Route>
        <Route exact path={'/carts'}>
          <CartShow />
        </Route>
        <Route exact path={'/polishes/:polishId/edit'}>
          <UpdatePolish />
        </Route>
        <Route exact path={'/polishes/:polishId'}>
          <PolishShow />
        </Route>
        <Route exact path={'/'}>
          <PolishList />
        </Route>
        <Route>
          <div className='no-cart'>
            <div className="cart-empty">
              404 Error:
              Page Not Found
            </div>
          </div>
        </Route>
      </Switch>}
    </>
  );
}

export default App;
