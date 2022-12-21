var layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 1850"};
var layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 1322"};
var layout2 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 19299"};
var layout3 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 19310"};
Plotly.newPlot("myPlot",layout);
Plotly.newPlot("myPlot1",layout1);  
Plotly.newPlot("myPlot2",layout2);  
Plotly.newPlot("myPlot3",layout3);  

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

            let value = snap.val().value;  
            let value1 = snap.val().value1;  
            value1 = Math.round(value1)/10;

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const stt = [];
  
            let k=2;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data' + value.toString() + value1.toString() + ".csv";
            
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
  
            // Define Data
            var data = [{x: stt, y: data1, mode:"lines"}];
            var datax1 = [{x: stt, y: data2, mode:"lines"}];
            var datax2 = [{x: stt, y: data3, mode:"lines"}];
            var datax3 = [{x: stt, y: data4, mode:"lines"}];

           function update(){

             if (k<420){
              k = k+1;
             if (k < 420){data_update(k);}
             Plotly.newPlot("myPlot", data, layout);
             Plotly.newPlot("myPlot1", datax1, layout1);
             Plotly.newPlot("myPlot2", datax2, layout2); 
             Plotly.newPlot("myPlot3", datax3, layout3);
             requestAnimationFrame(update);

           }}
           requestAnimationFrame(update);}})(); }) 