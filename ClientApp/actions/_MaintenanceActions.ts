import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Employee, Maintenance } from '../models/_DataModels';
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchMaintenancesActionInProgress {
    type: 'FETCH_MAINTS_IN_PROGRESS';
}

export interface FetchMaintenancesActionSuccess {
    type: 'FETCH_MAINTS_SUCCESS';
    maintenanceList: Maintenance[];
}

export interface FetchMaintenancesActionFail {
    type: 'FETCH_MAINTS_FAIL';
}

export interface CreateMaintenanceActionInProgress {
    type: 'CREATE_MAINT_IN_PROGRESS';
    toastId: number;
}

export interface CreateMaintenanceActionSuccess {
    type: 'CREATE_MAINT_SUCCESS';
    maintenance: Maintenance;
    toastId: number;
}

export interface CreateMaintenanceActionFail {
    type: 'CREATE_MAINT_FAIL';
    toastId: number;
}

export interface UpdateMaintenanceActionInProgress {
    type: 'UPDATE_MAINT_IN_PROGRESS';
    toastId: number;
}

export interface UpdateMaintenanceActionSuccess {
    type: 'UPDATE_MAINT_SUCCESS';
    maintenance: Maintenance;
    toastId: number;
}

export interface UpdateMaintenanceActionFail {
    type: 'UPDATE_MAINT_FAIL';
    toastId: number;
}

export interface DeleteMaintenanceActionInProgress {
    type: 'DELETE_MAINT_IN_PROGRESS';
    toastId: number;
}

export interface DeleteMaintenanceActionSuccess {
    type: 'DELETE_MAINT_SUCCESS';
    toastId: number;
}

export interface DeleteMaintenanceActionFail {
    type: 'DELETE_MAINT_FAIL';
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type MaintenanceActions = 
    FetchMaintenancesActionInProgress | FetchMaintenancesActionSuccess | FetchMaintenancesActionFail |
    CreateMaintenanceActionInProgress | CreateMaintenanceActionSuccess | CreateMaintenanceActionFail | 
    UpdateMaintenanceActionInProgress | UpdateMaintenanceActionSuccess | UpdateMaintenanceActionFail | 
    DeleteMaintenanceActionInProgress | DeleteMaintenanceActionSuccess | DeleteMaintenanceActionFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestMaintenanceList: (): AppThunkAction<MaintenanceActions> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().maintenance.reloadMaintenanceList) {
            dispatch({ type: 'FETCH_MAINTS_IN_PROGRESS' });
            axios.get(`api/Maintenance/GetMaintenances`)
            .then(response => {
                dispatch({ type: 'FETCH_MAINTS_SUCCESS', 
                    maintenanceList: response.data
                });
            }) 
            .catch(error => {
                dispatch({ type: 'FETCH_MAINTS_FAIL' });
            })
        }
    },
    createNewMaintenance: (values, toastId): AppThunkAction<MaintenanceActions> => (dispatch, getState) => {
        dispatch({ type: 'CREATE_MAINT_IN_PROGRESS', toastId: toastId});
        axios({
            method: 'post',
            url: `api/Maintenance/CreateNewMaintenance`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'CREATE_MAINT_SUCCESS', 
                maintenance: response.data, 
                toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'CREATE_MAINT_FAIL', toastId: toastId });
        })
    },
    updateMaintenance: (values, toastId): AppThunkAction<MaintenanceActions> => (dispatch, getState) => {
        dispatch({ type: 'UPDATE_MAINT_IN_PROGRESS', toastId: toastId});
        axios({
            method: 'put',
            url: `api/Maintenance/UpdateMaintenance`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'UPDATE_MAINT_SUCCESS', 
                maintenance: response.data, 
                toastId: toastId });
        })
        .catch(error => {
            dispatch({ 
                type: 'UPDATE_MAINT_FAIL', 
                toastId: toastId 
            })
        })
    },
    deleteMaintenance: (values, toastId): AppThunkAction<MaintenanceActions> => (dispatch, getState) => {
        dispatch({ type: 'DELETE_MAINT_IN_PROGRESS', toastId: toastId});
        axios({
            method: 'post',
            url: `api/Maintenance/DeleteMaintenance`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'DELETE_MAINT_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'DELETE_MAINT_FAIL', toastId: toastId })
        });
    },
};

// Individual actions (these are used by functional components) 
// get a single employee by id
export function requestMaintenance(id) {
    return axios.get(`api/Maintenance/GetMaintenance`, 
        { params: {
            id: id 
        }})
}

export function updateMaintenance(values, toastId) {
    //dispatch({ type: 'UPDATE_MAINT_IN_PROGRESS', toastId: toastId});
    return axios({
        method: 'put',
        url: `api/Maintenance/UpdateMaintenance`,
        data: values,
        headers: authHeader(),
    })
}

