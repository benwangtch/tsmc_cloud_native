import {
  GET_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DOCUMENT,
  FILTER_DOCUMENTS,
  CLEAR_DOCUMENTS,
  CLEAR_FILTER,
  DOCUMENT_ERROR,
} from '../types';

// eslint-disable-next-line
const documentReducer = (state, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      };
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [action.payload, ...state.documents],
      };
    case UPDATE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map(document =>
          document._id === action.payload._id ? action.payload : document
        ),
      };
    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(
          document => document._id !== action.payload
        ),
      };
    case CLEAR_DOCUMENTS:
      return {
        ...state,
        documents: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_DOCUMENTS:
      return {
        ...state,
        filtered: state.documents.filter(({ title, content }) => {
          const testString = `${title}${content}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case DOCUMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default documentReducer;
