import { backendUrl } from "@/BackendUrl.js";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "application",
  initialState: {
    softwareApplications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    //get all softwareApplication
    getAllSoftwareApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.loading = true;
      state.error = null;
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.loading = false;
      state.error = action.payload;
    },

    //add new software application
    addNewSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    //delete software application
    deleteSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetApplicationSlice(state, action) {
      state.error = null;
      state.loading = false;
      state.message = null;
      state.softwareApplications = state.softwareApplications;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest()
  );
  try {
    const response = await axios.get(
      `${backendUrl}/api/v1/softwareapplication/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(
        response.data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationRequest());
  try {
    const response = await axios.post(
      `${backendUrl}/api/v1/softwareapplication/add`,
      data,
      {
        withCredentials: true,
        header: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
  try {
    const { data } = await axios.delete(
      `${backendUrl}/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(
        data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationSliceErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;
