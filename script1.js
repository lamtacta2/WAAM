var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Web.loader.js";
var config = {
  dataUrl: buildUrl + "/Web.data.unityweb",
  frameworkUrl: buildUrl + "/Web.framework.js.unityweb",
  codeUrl: buildUrl + "/Web.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "WAMM_Unity",
  productVersion: "0.1",
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
  container.className = "unity-mobile";
  canvas.className = "unity-mobile";
  unityShowBanner('WebGL builds are not supported on mobile devices.');
} else {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
}

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
  }).then((unityInstance) => {

  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);