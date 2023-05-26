/*************************************************
 * InnovaZones
 * @exports
 * @class VehicleCheckListReducer.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 15, 2022
 * Copyright © 2022 FireDepartment. All rights reserved.
 *************************************************/

'use strict';

import Constants from '../util/Constants';

let initialState = {
   isLoaderVisible: true, //Shows spinner when the version api is being called.
   isVehiclecheckListEmpty : false,
   arrVehicleEquipmentCheckListProducts :[],
   arrMedicalKitCheckListProducts :[],

  equipmentComment: '',
  medicalKitComment: '',
  isAddTransLoading: false,
  selectedEquipmentData : {},
};
const {
  ACTIONS: {
   VEHICLE_CHECK_LIST_SHOW_PAGE_LOADING,
   VEHICLE_CHECK_LIST_DATA_SUCCESS,
   VEHICLE_CHECK_LIST_DATA_FAIL,
   VEHICLE_CHECK_LIST_DATA_RESET,

   VEHICLE_MEDICAL_KIT_CHECK_LIST_SHOW_PAGE_LOADING,
   VEHICLE_MEDICAL_KIT_CHECK_LIST_DATA_SUCCESS,
   VEHICLE_MEDICAL_KIT_CHECK_LIST_DATA_FAIL,
   VEHICLE_MEDICAL_KIT_CHECK_LIST_DATA_RESET,

   EQUIPMENT_COMMENT_UPDATE,
   MEDICAL_KIT_COMMENT_UPDATE,
   SHOW_TRANSPARENT_LOADING,
   HIDE_TRANSPARENT_LOADING,
   SELECTED_EQUIPMENT_DATA,
},
} = Constants;

export const vehicleCheckListDataState = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case VEHICLE_CHECK_LIST_SHOW_PAGE_LOADING:
      return {...state, isLoaderVisible: action.payload};
      case VEHICLE_CHECK_LIST_DATA_SUCCESS:
       return {...state, arrVehicleEquipmentCheckListProducts: action.payload, isVehiclecheckListEmpty : false};
       case VEHICLE_CHECK_LIST_DATA_FAIL:
       return {...state, arrVehicleEquipmentCheckListProducts: [], isVehiclecheckListEmpty : true};
         case VEHICLE_MEDICAL_KIT_CHECK_LIST_DATA_SUCCESS:
         return {...state, arrMedicalKitCheckListProducts: action.payload, isVehiclecheckListEmpty : false};
         case VEHICLE_MEDICAL_KIT_CHECK_LIST_DATA_FAIL:
       return {...state, arrMedicalKitCheckListProducts: [], isVehiclecheckListEmpty : true};
       case SELECTED_EQUIPMENT_DATA:
        return {...state, selectedEquipmentData: action.payload};

       case EQUIPMENT_COMMENT_UPDATE:
       return {...state, equipmentComment:  action.payload};
       case MEDICAL_KIT_COMMENT_UPDATE:
       return {...state, medicalKitComment:  action.payload};
       case SHOW_TRANSPARENT_LOADING:
       return {...state, isAddTransLoading: true};
      case HIDE_TRANSPARENT_LOADING:
       return {...state, isAddTransLoading: false};
       case VEHICLE_CHECK_LIST_DATA_RESET:
       return {...initialState};

    default:
      return state;
  }
};

