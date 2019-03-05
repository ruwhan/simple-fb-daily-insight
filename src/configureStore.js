import { connectRouter, routerMiddleware } from "connected-react-router";
import {
  applyMiddleware,
  compose,
  createStore
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const configureStore = (preloadedState) => {
  return createStore(
    connectRouter(preloadedState.history)(rootReducer),
    compose(
      applyMiddleware(routerMiddleware(preloadedState.history), thunk, logger)
    )
  );
}

export default configureStore;
