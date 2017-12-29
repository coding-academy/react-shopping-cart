import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import {CartService} from '../services/CartService';

const CHANGE_EVENT = 'change'

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange(){
    this.emit( CHANGE_EVENT )
    
  },

  addChangeListener( callback ){
    this.on( CHANGE_EVENT, callback )
  },

  removeChangeListener( callback ){
    this.removeListener( CHANGE_EVENT, callback )
  },

  getCart(){
    return CartService.cartItems;
  },

  getCatalog(){
    return CartService.getCatalog();
  },

  getCartTotals(){
    return CartService.cartTotals();
  }
});


register(  action  => {
  switch(action.actionType){
    case AppConstants.ADD_ITEM:
              CartService.addItem( action.item );
              break;
    case AppConstants.REMOVE_ITEM:
        CartService.removeItem( action.item );
        break;

    case AppConstants.INCREASE_ITEM:
        CartService.increaseItem( action.item );
        break;

    case AppConstants.DECREASE_ITEM:
        CartService.decreaseItem( action.item );
        break;
  }

  AppStore.emitChange();

})


export default AppStore;
