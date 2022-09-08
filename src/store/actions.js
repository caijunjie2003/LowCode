import store from "./index";
const REDUX_DISPATCH = (action) => {
  return store.dispatch(action);
};
export default REDUX_DISPATCH;
