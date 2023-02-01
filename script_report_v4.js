document.getElementById("section2").style.display = "none";
document.getElementById("section3").style.display = "none";



firebase
.database()
.ref("WAAM")
.on("value", function (snap) {

  if(snap.val().section%3 == 1 ){
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_1").innerHTML = dateTime;
  } else if(snap.val().section%3 == 2){
    document.getElementById("section2").style.display = "block";
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_2").innerHTML = dateTime;
  } else {
    document.getElementById("section3").style.display = "block";
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_3").innerHTML = dateTime;
  }


  if (snap.val().Print == 1 || snap.val().control == 3){
    if(snap.val().section%3 == 1){
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_1").innerHTML = dateTime1;
  } else if(snap.val().section%3 == 2){
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_2").innerHTML = dateTime1;
  } else {
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_3").innerHTML = dateTime1;
  }

    firebase
    .database()
    .ref("WAAM")
    .update({Print: 0, control: 0}) 
  }

  (async() => {

    if (snap.val().control == 1){
      
    let value = snap.val().value;  
    let value1 = snap.val().value1;  
    value = value.toFixed(1); 
    value1 = value1.toFixed(0); 

    const data1 = [];
    const data2 = [];
    const data3 = [];
    const data4 = [];
    const stt = [];

    url1 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data' + value1.toString() + value.toString() + ".csv";
    
    let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());

    for(let i = 2; i < 420; i++){
        const locale1 = "A"+i;
        const locale2 = "B"+i; 
        const locale3 = "C"+i;  
        const locale4 = "D"+i;                
        const locale5 = "E"+i;

        data1[i-2] = workbook1.Sheets.Sheet1[locale2].v;
        data2[i-2] = workbook1.Sheets.Sheet1[locale3].v;
        data3[i-2] = workbook1.Sheets.Sheet1[locale4].v;
        data4[i-2] = workbook1.Sheets.Sheet1[locale5].v;
        stt[i-2] = workbook1.Sheets.Sheet1[locale1].v;
    }

    var data = [{x: stt, y: data1, mode:"lines"}];
    var datax1 = [{x: stt, y: data2, mode:"lines"}];
    var datax2 = [{x: stt, y: data3, mode:"lines"}];
    var datax3 = [{x: stt, y: data4, mode:"lines"}];
    
    layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout2 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout3 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};

    if(snap.val().section%3 == 1){
      document.getElementById("V_1").innerHTML = value;
      document.getElementById("C_1").innerHTML = value1;
      Plotly.newPlot("myPlot1_3", data, layout);
      Plotly.newPlot("myPlot1_4", datax1, layout1);
      Plotly.newPlot("myPlot1_5", datax2, layout2);
      Plotly.newPlot("myPlot1_6", datax3, layout3);
    } else if(snap.val().section%3 == 2){
      document.getElementById("V_2").innerHTML = value;
      document.getElementById("C_2").innerHTML = value1;
      Plotly.newPlot("myPlot2_3", data, layout);
      Plotly.newPlot("myPlot2_4", datax1, layout1);
      Plotly.newPlot("myPlot2_5", datax2, layout2);
      Plotly.newPlot("myPlot2_6", datax3, layout3);
    } else {
      document.getElementById("V_3").innerHTML = value;
      document.getElementById("C_3").innerHTML = value1;
      Plotly.newPlot("myPlot3_3", data, layout);
      Plotly.newPlot("myPlot3_4", datax1, layout1);
      Plotly.newPlot("myPlot3_5", datax2, layout2);
      Plotly.newPlot("myPlot3_6", datax3, layout3);
    }


  }})();
});
