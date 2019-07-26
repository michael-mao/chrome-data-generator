const LS_KEY = 'DG_DATA';

const storage = {};
if (process.env.NODE_ENV === 'production') {
  storage.set = data => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(data, resolve);
    });
  };
  storage.get = keys => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, resolve);
    });
  };
} else {
  // uses localStorage to mock chrome.storage api
  storage.set = data => {
    const existingData = JSON.parse(localStorage.getItem(LS_KEY)) || {};
    const updatedData = Object.assign(existingData, data);
    localStorage.setItem(LS_KEY, JSON.stringify(updatedData));
    return Promise.resolve();
  };
  storage.get = keys => {
    const data = JSON.parse(localStorage.getItem(LS_KEY)) || {};
    const result = {};
    if (Array.isArray(keys)) {
      keys.forEach(key => result[key] = data[key]);
    } else if (typeof keys === 'string') {
      const key = keys;
      result[key] = data[key];
    } else if (typeof keys === 'object') {
      for (const key in keys) {
        if (keys.hasOwnProperty(key)) {
          result[key] = data[key] === undefined ? keys[key] : data[key];
        }
      }
    }
    return Promise.resolve(result);
  };
}

export default storage;
