const os = require("os");
const si = require("systeminformation");

const getHostname = () => {
  let el = document.querySelector("#hostname");
  el.innerHTML = os.hostname();
};

const updateStats = () => {
  updateCPU();
  updateGPU();
  updateNetwork();
};

const updateCPU = () => {
  si.cpu()
    .then((data) => {
      let root = document.querySelector("#cpu");
      root.innerHTML =
        "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
    })
    .catch((error) => console.error(error));
};

const updateGPU = () => {
  si.graphics()
    .then((data) => {
      let root = document.querySelector("#gpu");
      root.innerHTML =
        "<pre>" + JSON.stringify(data["controllers"], null, 2) + "</pre>";
    })
    .catch((error) => console.error(error));
};

const ready = (fn) => {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const start = () => {
  getHostname();
  updateStats();
};

ready(start);
