import utils from './utils';

class StorageBase {
  static async get() {
    throw new Error('Not Implemented');
  }

  static async set() {
    throw new Error('Not Implemented');
  }

  static async clear() {
    throw new Error('Not Implemented');
  }
}

class ChromeStorage extends StorageBase {
  static async get(keys) {
    return new Promise((resolve, _reject) => {
      chrome.storage.sync.get(keys, resolve);
    });
  }

  static async set(data) {
    return new Promise((resolve, _reject) => {
      chrome.storage.sync.set(data, resolve);
    });
  }

  static async clear() {
    return new Promise((resolve, _reject) => {
      chrome.storage.sync.clear(resolve);
    });
  }
}

class LocalStorage extends StorageBase {
  static LS_KEY = 'DG_DATA';

  static async get(keys) {
    const data = JSON.parse(localStorage.getItem(this.LS_KEY)) || {};
    const result = {};
    if (Array.isArray(keys)) {
      keys.forEach(key => {
        result[key] = data[key];
      });
    } else if (typeof keys === 'string') {
      const key = keys;
      result[key] = data[key];
    } else if (typeof keys === 'object') {
      Object.keys(keys).forEach(key => {
        result[key] = data[key] === undefined ? keys[key] : data[key];
      });
    }
    return Promise.resolve(result);
  }

  static async set(data) {
    const existingData = JSON.parse(localStorage.getItem(this.LS_KEY)) || {};
    const updatedData = Object.assign(existingData, data);
    localStorage.setItem(this.LS_KEY, JSON.stringify(updatedData));
    return Promise.resolve();
  }

  static async clear() {
    localStorage.removeItem(this.LS_KEY);
    return Promise.resolve();
  }
}

class StorageFactory {
  static getStorage() {
    return utils.isProduction() ? ChromeStorage : LocalStorage;
  }
}

export default StorageFactory.getStorage();
