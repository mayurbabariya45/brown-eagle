import { actionTypes as a } from "../../constants/Product/Product_action_type";

const initialState = {
  quantity: 1,
  activeTabs: 1,
  error: false,
  success: false,
  loading: false,
  selectedLang: "",
  activeCategory: -1,
  categories: [],
  sCategories: [],
  productImages: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    // QUANTITY_INCREMENT
    case a.QUANTITY_INCREMENT:
      return {
        ...state,
        quantity: state.quantity + 1
      };
    // QUANTITY_INCREMENT

    // QUANTITY_DECREMENT
    case a.QUANTITY_DECREMENT:
      return {
        ...state,
        quantity: state.quantity > 1 ? state.quantity - 1 : 1
      };
    // QUANTITY_DECREMENT

    // GET_PRODUCT_CATEGORY
    case a.GET_CATEGORY_REQUEST:
    case a.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [
          { name: "Agriculture" },
          { name: "Apparel" },
          { name: "Automobile & Motorcycle" },
          { name: "Beauty & Personal Care" },
          { name: "Bussiness" },
          { name: "Chemicals" },
          { name: "Constructions" },
          {
            name: "Consumer",
            children: [
              {
                name: "test",
                nested: true
              }
            ]
          }
        ]
      };
    case a.GET_CATEGORY_FAILURE:
      return {
        ...state
      };

    // SELECT_CATEGORY
    case a.SELECT_CATEGORY:
      return {
        ...state,
        activeCategory: action.value
      };
    // SEARCH_CATEGORIES
    case a.SEARCH_CATEGORIES:
      return {
        ...state,
        sCategories: state.categories.filter(
          category =>
            category.name.toLowerCase().search(action.value.toLowerCase()) !==
            -1
        )
      };

    // FLUSH_CATEGORIES
    case a.FLUSH_CATEGORIES:
      return {
        ...state,
        sCategories: [],
        selectedCategory: "",
        activeCategory: -1
      };

    // SELECTED_PRODUCT_CATEGORY
    case a.SELECTED_PRODUCT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category
      };

    // SELECT_PRODUCT_LANGUAGE
    case a.SELECT_PRODUCT_LANGUAGE:
      return {
        ...state,
        selectedLang: action.lang
      };
    // ADD_PRODUCT_CATEGORY
    case a.ADD_PRODUCT_CATEGORY:
      return {
        ...state,
        loading: false,
        activeTabs: 2
      };
    // DROP_PRODUCT
    case a.DROP_PRODUCT_IMAGES:
      if (action.files.length < 2) {
        return {
          ...state,
          productImages: [...state.productImages, action.files]
        };
      }
      return {
        ...state,
        productImages: [...state.productImages, ...action.files]
      };
    // DROP_DELETE_PRODUCT_IMAGES
    case a.PRODUCT_IMAGES_REMOVE:
      return {
        ...state,
        productImages: [...action.files]
      };
    // FLUSH_PRODUCT_IMAGES
    case a.FLUSH_PRODUCT_IMAGES:
      return {
        ...state,
        productImages: []
      };
    // ADD_PRODUCT
    case a.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case a.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        activeTabs: 3
      };
    case a.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    default:
      return state;
  }
};
