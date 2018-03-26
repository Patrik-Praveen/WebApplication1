var siteUrl = 'http://localhost:25269/';
var AmCharts_path = siteUrl + "/scripts/amChart/";
var isPrintChart = true;
$(document).ready(function () {
    var data = '{ "Status": "Success", "ErrorList": null, "ChartData": [{ "TotalClaim": { "Data": { "PlanYear": "2017", "Benchmark": "4230738.08245423585640000000", "Actual": "3636758.16000000000000000000", "MaxValue": null } }, "TotalMedical": { "Data": { "PlanYear": "2017", "Benchmark": "3370722.95317206058600000000", "Actual": "2945007.28000000000000000000", "MaxValue": "2945007.28" } }, "TotalRx": { "Data": { "PlanYear": "2017", "Benchmark": "860015.12928217527040000000", "Actual": "691750.88000000000000000000", "MaxValue": "1210564.04" } } }] }';
    var chartData = $.parseJSON(data);
    GenerateTotalclaimCharts("chartClaim", chartData.ChartData[0].TotalClaim.Data, chartData.ChartData[0].TotalClaim.Data.MaxValue);
});



function GenerateTotalclaimCharts(containerId, responseData, vMax) {
    var smallImage = !isPrintChart ? "-small" : "";
    if (containerId == 'chartClaim' || (vMax == null || vMax == '')) {
         vMax = Math.round(responseData.Actual) <= Math.round(responseData.Benchmark) ? Math.round(responseData.Benchmark) : Math.round(responseData.Actual);
    }
  
    var percentDiff = CalculaTePercentDiffStepCharts(responseData.Benchmark, responseData.Actual);

    var chart;
    var chartData = [
          [

              {
                  "year": "Benchmark",
                  "description": "",
                  "description1": "$" + commafy(parseInt(Math.round(responseData.Benchmark))),
                  "description2": "",
                  "europe": Math.round((Math.round(responseData.Benchmark) / vMax) * 100) < 10 ? 0 : Math.round((Math.round(responseData.Benchmark) / vMax) * 100), "pattern1": { "url": siteUrl + "/Content/images/greybottom" + smallImage + ".png", "width": 150, "height": 14 },
                  "description3": "",
                  "namerica": 5 < Math.round((Math.round(responseData.Benchmark) / vMax) * 100) <= 10 ? 5 : 0, "pattern2": { "url": siteUrl + "/Content/images/greymiddle" + smallImage + ".png", "width": 150, "height": 14 },
                  "asia": Math.round((Math.round(responseData.Benchmark) / vMax) * 100) == 0 ? 0 : 5, "pattern3": { "url": siteUrl + "/Content/images/greytop" + smallImage + ".png", "width": 150, "height": 14 },
                  "totalTextColor": "#000000"
              },
              {
                  "year": "Actual",
                  "description": "",
                  "description1": "$" + commafy(Math.round(responseData.Actual)),
                  "description2": "",
                  "europe": Math.round((Math.round(responseData.Actual) / vMax) * 100) < 10 ? 0 : Math.round((Math.round(responseData.Actual) / vMax) * 100), "pattern1": { "url": percentDiff < 0 ? siteUrl + "/Content/images/Greenbottom" + smallImage + ".png" : siteUrl + "/Content/images/BFunnel" + smallImage + ".png", "width": 150, "height": 14 },
                  "description3": "",
                  "namerica": 5 < Math.round((Math.round(responseData.Actual) / vMax) * 100) <= 10 ? 5 : 0, "pattern2": { "url": percentDiff < 0 ? siteUrl + "/Content/images/Greenmiddle" + smallImage + ".png" : siteUrl + "/Content/images/MFunnel" + smallImage + ".png", "width": 150, "height": 14 },
                  "asia": Math.round((Math.round(responseData.Actual) / vMax) * 100) == 0 ? 0 : 5, "pattern3": { "url": percentDiff < 0 ? siteUrl + "/Content/images/Greentop" + smallImage + ".png" : siteUrl + "/Content/images/TFunnel" + smallImage + ".png", "width": 150, "height": 14 },
                  "totalTextColor": (percentDiff < 0) ? "#000000" : "#FF0000"
              }
          ]
    ];

    // SERIAL CHART

    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData[0];
    chart.export = {
        enabled: "true",
        divId:  containerId,
    };
    chart.responsive = {
        "enabled": true
    };
    chart.categoryField = "year";
    //chart.sequencedAnimation = true;
    if (!isPrintChart) {
        chart.startDuration = 0.5;
        chart.startEffect = "easeInSine";
    }    
    chart.fontSize = 14;
    chart.plotAreaBorderColor = "#ffffff";  //side div rectangular border
    chart.plotAreaBorderAlpha = 15;
    chart.autoMargins = false;
    chart.marginBottom = 40;
    chart.allLabels.bold = "bold";
    chart.fontFamily = "'Open Sans', sans-serif";

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.axisThickness = 80;
    categoryAxis.labelOffset = -80;
    categoryAxis.gridPosition = 0;
    categoryAxis.offset = 10;
    categoryAxis.gridThickness = 0;
    //categoryAxis.gridAlpha = 0.09;
    categoryAxis.axisColor = "#DADADA";
    categoryAxis.tickLength = 0;
    //categoryAxis.addListener("clickItem", handleClick);
    // value
    if ((responseData.Benchmark >= 1 && responseData.Benchmark != null) || (responseData.Actual >= 1 && responseData.Actual != null)) {
        chart.allLabels = [{
            "y": "42%",
            "x": "0%",
            "align": "center",
            "text": isNaN(percentDiff) ? "" : (percentDiff < 0 ? Math.round(percentDiff) * -1 : Math.round(percentDiff)) + "%",
            "size": !isPrintChart ? 22 : 16,
            "bold": true,
            "color": percentDiff > 0 ? "#E74c3c" : "#4BB96D"
        }, {
            "y": !isPrintChart ? "50%" : "46%",
            "x": "0%",
            "align": "center",
            "text": percentDiff > 0 || isNaN(percentDiff) ? "Over\nBenchmark" : "Under\nBenchmark",
            "size": !isPrintChart ? 14 : 11,
            "bold": true,
            "color": percentDiff > 0 || isNaN(percentDiff) ? "#E74c3c" : "#4BB96D"
        }];
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.stackType = "regular";
        valueAxis.gridAlpha = 0;
        valueAxis.axisAlpha = 0;
        valueAxis.gridcount = false;
        valueAxis.autoWrap = true;
      //  valueAxis.totalText = "[[description1]]";
        //valueAxis.centerLabels = 10;
        valueAxis.labelsEnabled = true;
        valueAxis.axisAlpha = 0;
        valueAxis.color = "#FFFFFF";
        valueAxis.totalTextColor = "totalTextColor";
        //valueAxis.minimum = 0;
        //valueAxis.maximum = 120;
        //valueAxis.strictMinMax = true;
        valueAxis.visible = false;
        chart.addValueAxis(valueAxis);

        // GRAPHS
        // first graph
        var graph = new AmCharts.AmGraph();
        graph.title = "Europe";
        graph.labelText = "[[description]]";
        graph.valueField = "europe";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 1;
        //graph.columnWidth = .77;
        graph.lineColor = "#C72C95";
        graph.patternField = "pattern1";
        graph.showBalloon = false;
        graph.fillAlphas = 0.9,
        graph.lineAlpha = 0,
        graph.fixedColumnWidth = 150,
        graph.showHandOnHover = true;
        graph.labelPosition = "top";
        graph.fontSize = 20;
        chart.addGraph(graph);

        // second graph
        graph = new AmCharts.AmGraph();
        graph.title = "North America";
        graph.labelText = "[[description3]]";
        graph.valueField = "namerica";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 1;
        graph.lineColor = "#D8E0BD";
        //graph.columnWidth = 0.77;
        graph.patternField = "pattern2";
        graph.fixedColumnWidth = 150;
        graph.showBalloon = false;
        graph.showHandOnHover = true;
        graph.labelPosition = "top";
        graph.fontSize = 20;
        chart.addGraph(graph);

        // third graph
        graph = new AmCharts.AmGraph();
        graph.title = "Asia-Pacific";
        graph.labelText = "[[description1]]";
        graph.valueField = "asia";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 1;
        //graph.lineColor = "[[totalTextColor]]";
        //graph.columnWidth = 0.77;
        graph.patternField = "pattern3";
        graph.fixedColumnWidth = 150;
        graph.showBalloon = false;
        graph.showHandOnHover = true;
        graph.labelColorField = "totalTextColor";
        graph.showAllValueLabels = true;
        graph.labelPosition = "top";
        graph.fontSize = 20;
        //chart.addListener("clickGraphItem", handleClick);
       
        chart.addGraph(graph);


    } else {
        ChartDataNotAvaliable(chart, 'amchart');
    }
    chart.addListener("rendered", function () {
       // $('#curtain' + containerId).addClass('invisible');
       // PushRenderedCharts(containerId);
    });
    chart.write(containerId);
    chart.invalidateSize();
}

function commafy(num) {
    if (num == null) {
        return '';
    }
    var str = num.toString().split('.');
    if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}


function CalculaTePercentDiffStepCharts(benchmark, actual) {
    var percentDiff = ((parseFloat(actual) / parseFloat(benchmark)) - 1) * 100;
    percentDiff = parseFloat(benchmark) > parseFloat(actual) ? -Math.abs(parseFloat(percentDiff)) : parseFloat(percentDiff);
    return percentDiff;
}
