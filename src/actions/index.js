import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const API_KEY = 'qNpala4OG$6m8oxK2qRpgR6B$npdxWgXGF5$QaNt9UQhfl$hMQH$FNBE7!SFU6Ax';
const API_URL = 'https://imsba.com/';
const API_VERSION = 'api/';
const ROOT_URL_SITES = `${API_URL}${API_VERSION}workforce/sites?key=${API_KEY}`;
const ROOT_URL_ORDERS = `${API_URL}${API_VERSION}dispatch/orders?key=${API_KEY}`;
const ROOT_URL_SHIFTS = `${API_URL}${API_VERSION}workforce/all_shifts?key=${API_KEY}`;
const ROOT_URL_HISTORY = `${API_URL}${API_VERSION}dispatch/location_history?key=${API_KEY}`;
const ROOT_URL_USER_LOCATIONS = `${API_URL}${API_VERSION}dispatch/pull_location?key=${API_KEY}`;

export function onMarkerCLick(driver) {
  const dataHistory = new FormData();
  const markers = [];
  dataHistory.append('crm_account_id', driver.id);
  
  return function (dispatch) {
    axios.post(ROOT_URL_HISTORY, dataHistory)
      .then(function (response) {
        response.data.map((driverLocations, index) => {
          markers.push({
            id: index, lat: driverLocations.lat,
            lng: driverLocations.lng, driverId: driver.id, rotation: driverLocations.rotation
          })
        });
        dispatch({
          type: 'MARKER_CLICKED',
          payload: markers,
          
        })
      });
  }
}

export function getDrivers() {
  const today = new Date();
  const startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +
    today.getDate() + ' 0:00:00 -0800';
  const endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +
    today.getDate() + ' 23:59:59 -0800';
  let site_id = '0';
  const cookies = new Cookies();
  if(Number(cookies.get('site_id'))){
    site_id = Number(cookies.get('site_id'));
  }
  else {site_id='0';}
  const dataUsers = new FormData();
  dataUsers.append('start', startDate);
  dataUsers.append('end', endDate);
  dataUsers.append('site_id','0');
  
  const drivers = [];
  
  return function (dispatch) {
    axios.post(ROOT_URL_USER_LOCATIONS, dataUsers)
      .then(function (response) {
        response.data.map((driver, index) => {
          drivers.push(driver)
        });
        dispatch({
          type: 'GET_DRIVERS',
          payload: drivers,
          
        })
      });
  }
  
  
}
export function getOrders(driver){
  const dataOrders = new FormData();
  dataOrders.append('crm_account_id', driver.id);
  
  return function (dispatch) {
    axios.post(ROOT_URL_ORDERS, dataOrders)
      .then(function (response) {
        dispatch({
          type: 'ORDERS',
          payload: response.data,
          
        })
      });
  }
}





