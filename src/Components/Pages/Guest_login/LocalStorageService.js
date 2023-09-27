// LocalStorageService.js

// Get data from localStorage
export const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('sharedData');
    return data ? JSON.parse(data) : [];
  };
  
  // Save data to localStorage
  export const saveDataToLocalStorage = (data) => {
    localStorage.setItem('sharedData', JSON.stringify(data));
  };
  
  // Add new data to the shared array
  export const addDataToLocalStorage = (newData) => {
    const sharedData = getDataFromLocalStorage();
    sharedData.push(newData);
    saveDataToLocalStorage(sharedData);
  };
  
  // Clear data in localStorage
  export const clearLocalStorageData = () => {
    localStorage.removeItem('sharedData');
  };
  