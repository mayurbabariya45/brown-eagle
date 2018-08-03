import { actionTypes as a } from "../../constants/Product/Product_action_type";

const initialState = {
  quantity: 1,
  activeTabs: 1,
  error: false,
  success: false,
  loadProduct: false,
  loading: false,
  loader: false,
  selectedLang: "",
  activeCategory: {},
  activeSubCategory: {},
  categories: [],
  sCategories: [],
  productImages: [],
  products: [],
  similarProducts: [],
  selectedProductCategory: {},
  selectedCategory: {},
  selectedSubCategory: {},
  product: {},
  reviews: [],
  filter: {
    category: {
      category: "",
      subCategory: ""
    },
    sort: {
      type: "popularity",
      order: ""
    },
    price: {
      minPrice: 1,
      maxPrice: 1000
    },
    rating: {
      minRating: 0,
      maxRating: 5
    }
  }
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
    case a.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        loadProduct: true
      };

    case a.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload.category
      };

    case a.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loadProduct: false,
        loading: false,
        error: true
      };

    // SELECT_CATEGORY
    case a.SELECT_CATEGORY:
      return {
        ...state,
        activeCategory: action.value
      };
    // SELECT_CATEGORY
    case a.SELECT_SUB_CATEGORY:
      return {
        ...state,
        selectedSubCategory: action.value
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
        selectedCategory: {},
        selectedSubCategory: {}
      };

    // SELECTED_PRODUCT_CATEGORY
    case a.SELECTED_PRODUCT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category
      };
    case a.SELECTED_CATEGORY:
      return {
        ...state,
        selectedProductCategory: action.category
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
      return {
        ...state,
        productImages: action.files
      };
    // DROP_DELETE_PRODUCT_IMAGES
    case a.PRODUCT_IMAGES_REMOVE:
      return {
        ...state,
        productImages: action.files
      };
    // GET_CATEGORY_PRODUCTS
    case a.GET_CATEGORY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        loadProduct: true
      };

    case a.GET_CATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadProduct: false,
        products: action.payload
      };

    case a.GET_CATEGORY_PRODUCTS_FAILURE:
      return {
        ...state,
        loadProduct: false,
        loading: false,
        error: true
      };

    // GET_CATEGORY_PRODUCTS
    case a.SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        loadProduct: true
      };

    case a.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadProduct: false,
        products: action.payload
      };

    case a.SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        loadProduct: false,
        loading: false,
        error: true
      };
    // GET_PRODUCT_WITH_ID

    case a.GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case a.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload
      };

    case a.GET_PRODUCT_FAILURE:
      return {
        ...state,
        error: true
      };
    case a.GET_SIMILAR_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case a.GET_SIMILAR_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        similarProducts: action.payload.products
      };

    case a.GET_SIMILAR_PRODUCT_FAILURE:
      return {
        ...state,
        error: true
      };
    case a.FLUSH_PRODUCT:
      return {
        ...state,
        quantity: 1,
        product: {}
      };
    // FLUSH_PRODUCT_IMAGES
    case a.FLUSH_PRODUCT_IMAGES:
      return {
        ...state,
        productImages: []
      };
    case a.FLUSH_ADD_PRODUCT:
      return {
        ...state,
        productImages: [],
        sCategories: [],
        selectedCategory: {},
        selectedSubCategory: {},
        activeTabs: 1
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
    // ADD_PRODUCT_REVIEW
    case a.ADD_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loader: true,
        error: false,
        success: false
      };
    case a.ADD_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loader: false,
        error: false,
        success: true
      };
    case a.ADD_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        loader: false,
        error: true,
        success: false
      };
    // GET_REVIEW
    case a.GET_PRODUCT_REVIEW_REQUEST:
      return {
        ...state
      };
    case a.GET_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: action.payload
      };
    case a.GET_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
      };
    // SELECT_FILTER
    case a.SELECT_SORT_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: {
            ...action.value
          }
        }
      };
    case a.SELECT_PRICE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          price: {
            ...action.value
          }
        }
      };
    case a.SELECT_RATING_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          rating: {
            ...action.value
          }
        }
      };
    case a.SELECT_CATEGORY_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          category: {
            ...action.value
          }
        }
      };
    default:
      return state;
  }
};
