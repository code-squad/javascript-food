class Model {
    constructor() {
        this.listener = [];
        this.mainBannerIdx = 1;
    }

    subscribe(listener) {
        this.listener.push(listener);
    }

    notify() {
        for (let i = 0; i < this.listener.length; i++) {
            this.listener[i]();
        }
    }

    getMainBannerIdx() {
        return this.mainBannerIdx;
    }

    setMainBannerIdx(value) {
        this.mainBannerIdx = value;
        this.notify();
    }

}

export {
    Model
};