import {
  GET_BRAND_LIST,
  GET_SHOP_LIST,
  GET_OFFER_LIST,
  GET_EMOJI_OFFER,
  GET_EMOJI_RATE,
  GET_CATEGORY_BRAND,
  GET_FILTER,
} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  brandList: null,
  shopList: null,
  offerList: null,
  emojiOffer: null,
  emojiRate: null,
  categoryBrand: null,
  filter: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BRAND_LIST:
      return {...state, brandList: action.payload};
    case GET_SHOP_LIST:
      return {...state, shopList: action.payload};
    case GET_OFFER_LIST:
      return {...state, offerList: action.payload};
    case GET_EMOJI_OFFER:
      return {...state, emojiOffer: action.payload};
    case GET_EMOJI_RATE:
      return {...state, emojiRate: action.payload};
    case GET_CATEGORY_BRAND:
      return {...state, categoryBrand: action.payload};
    case GET_FILTER:
      return {...state, filter: action.payload};
    default:
      return state;
  }
};
