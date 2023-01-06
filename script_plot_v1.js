var layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
var layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};

var demo = [{x: 0, y: 0, mode:"lines"}];

Plotly.newPlot("myPlot", demo, layout);
Plotly.newPlot("myPlot1", demo, layout1);  

firebase
.database()
.ref("WAAM")
.update({control: 0, Print: 0})

firebase
.database()
.ref("WAAM")
.on("value", function (snap) {

  (async() => {

        if (snap.val().control == 1){

            let point = snap.val().point;
            let point1 = snap.val().point1;

            let value = snap.val().value;  
            let value1 = snap.val().value1;  
            value = value.toFixed(1); 
            value1 = value1.toFixed(0); 

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const stt = [];
  
            let k=2;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data' + value1.toString() + value.toString() + ".csv";
            
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());

           function data_update(k){
            for(let i = 2; i < k; i++){
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
            }}
  
            var data = [{x: stt, y: data1, mode:"lines"}];
            var datax1 = [{x: stt, y: data2, mode:"lines"}];

            if(point == 0){
              data = [{x: stt, y: data1, mode:"lines"}];
              layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 1850"};
            } else if(point == 1){
              data = [{x: stt, y: data2, mode:"lines"}];
              layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 1322"};
            }else if(point == 2){
              data = [{x: stt, y: data3, mode:"lines"}];
              layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 19299"};
            } else{
              data = [{x: stt, y: data4, mode:"lines"}];
              layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 19310"};
            }

            if(point1 == 0){
              datax1 = [{x: stt, y: data1, mode:"lines"}];
              layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 1850"};
            } else if(point1 == 1){
              datax1 = [{x: stt, y: data2, mode:"lines"}];
              layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 1322"};
            }else if(point1 == 2){
              datax1 = [{x: stt, y: data3, mode:"lines"}];
              layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 19299"};
            } else{
              datax1 = [{x: stt, y: data4, mode:"lines"}];
              layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "# 19310"};
            }

           function update(){
             if (k<420){
              k = k+1;
             if (k < 420){data_update(k);}
             Plotly.newPlot("myPlot", data, layout);
             Plotly.newPlot("myPlot1", datax1, layout1);
             requestAnimationFrame(update);
           }}
           requestAnimationFrame(update);}})(); }) 