import { combineReducers } from 'redux';
import DriversReducer from './reducer_drivers';
import MarkersReducer from './reducer_markers';
import OrdersReducer from './reducer_orders';
const rootReducer = combineReducers({
  drivers: DriversReducer,
  markers:MarkersReducer,
  orders:OrdersReducer
});

export default rootReducer;

