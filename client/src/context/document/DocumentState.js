import React, { useReducer, useContext } from 'react';
import DocumentContext from './documentContext';
import documentReducer from './documentReducer';
import axios from 'axios';
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

export const useDocuments = () => {
  const { state, dispatch } = useContext(DocumentContext);
  return [state, dispatch];
};

// Get Documents
export const getDocuments = async dispatch => {
  try {
    const res = await axios.get('/api/documents');

    dispatch({
      type: GET_DOCUMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: err.response.msg,
    });
  }
};

// Add Document
export const addDocument = async (dispatch, document) => {
  try {
    const res = await axios.post('/api/documents', document);

    dispatch({
      type: ADD_DOCUMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: err.response.msg,
    });
  }
};

// Delete Document
export const deleteDocument = async (dispatch, id) => {
  try {
    await axios.delete(`/api/documents/${id}`);

    dispatch({
      type: DELETE_DOCUMENT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: err.response.msg,
    });
  }
};

// Set Current Document
export const setCurrent = (dispatch, document) => {
  dispatch({ type: SET_CURRENT, payload: document });
};

// Clear Current Document
export const clearCurrent = dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

// Update Document
export const updateDocument = async (dispatch, document) => {
  try {
    const res = await axios.put(`/api/documents/${document._id}`, document);

    dispatch({
      type: UPDATE_DOCUMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: err.response.msg,
    });
  }
};

// Clear Documents
export const clearDocuments = dispatch => {
  dispatch({ type: CLEAR_DOCUMENTS });
};

// Filter Documents
export const filterDocuments = (dispatch, text) => {
  dispatch({ type: FILTER_DOCUMENTS, payload: text });
};

// Clear Filter
export const clearFilter = dispatch => {
  dispatch({ type: CLEAR_FILTER });
};

const DocumentState = props => {
  const initialState = {
    documents: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(documentReducer, initialState);

  return (
    <DocumentContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </DocumentContext.Provider>
  );
};

export default DocumentState;
