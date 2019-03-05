class SimpleStore {
  constructor() {
    if (!this.singleton) {
      this.singleton = new SimpleStore();
    }
  }

  factory = () => {
    return this.singleton;
  }
  
  setItem = (key, value) => {
    localStorage.setItem(key, value);
  }

  getItem = (key) => {
    localStorage.getItem(key);
  }
}

const singleton = (new SimpleStore()).factory();

export default singleton;
