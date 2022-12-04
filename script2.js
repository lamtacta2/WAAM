var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");

// function unityShowBanner(type) {
//   function updateBannerVisibility() {
//     warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
//   }
//   // if (type == 'error') div.style = 'background: red; padding: 10px;';
//   // else {
//   //   if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
//   //   setTimeout(function() {
//   //     updateBannerVisibility();
//   //   }, 5000);
//   // }
//   updateBannerVisibility();
// }

var buildUrl = "Build";
      var loaderUrl = buildUrl + "/WAAM.loader.js";
      var config = {
        dataUrl: buildUrl + "/WAAM.data.unityweb",
        frameworkUrl: buildUrl + "/WAAM.framework.js.unityweb",
        codeUrl: buildUrl + "/WAAM.wasm.unityweb",
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
  canvas.style.width = "60%";
  canvas.style.height = "90%";
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