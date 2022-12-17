var layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
var layout1 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
var layout2 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
Plotly.newPlot("myPlot",layout);
Plotly.newPlot("myPlot1",layout1);  
Plotly.newPlot("myPlot2",layout2);  


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

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const labelsa = [];
            const labelsb = [];
            const labelsc = [];
  
            let k=2;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data1' + value.toString() + ".csv";
            url2 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data2' + value.toString() + ".csv";
            url3 = 'https://raw.githubusercontent.com/lamtacta2/WAAM/main/Data/data' + value.toString() + ".csv";

            
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
            let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
            let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
  
  
           function data_update(k){
            for(let i = 2; i < k; i++){
                const locale2 = "A"+i;
                const locale1 = "B"+i;               

                data1[i-2] = workbook1.Sheets.Sheet1[locale1].v.slice(1,workbook1.Sheets.Sheet1[locale1].v.length-1);
                data2[i-2] = workbook2.Sheets.Sheet1[locale1].v.slice(1,workbook2.Sheets.Sheet1[locale1].v.length-1);
                data3[i-2] = workbook3.Sheets.Sheet1[locale1].v.slice(1,workbook3.Sheets.Sheet1[locale1].v.length-1);
                labelsa[i-2] = workbook1.Sheets.Sheet1[locale2].v;
                labelsb[i-2] = workbook2.Sheets.Sheet1[locale2].v;
                labelsc[i-2] = workbook3.Sheets.Sheet1[locale2].v;
            }}
  
            // Define Data
            var data = [{x: labelsa, y: data1, mode:"lines"}];
            var datax1 = [{x: labelsb, y: data2, mode:"lines"}];
            var datax1 = [{x: labelsc, y: data3, mode:"lines"}];

           function update(){

             if (k<1978){
              k = k+1;
             if (k < 1978){data_update(k);}
             Plotly.newPlot("myPlot", data, layout);
             Plotly.newPlot("myPlot1", datax1, layout1);
             Plotly.newPlot("myPlot2", datax2, layout2);
             requestAnimationFrame(update);

           }}
           requestAnimationFrame(update);}})(); }) 