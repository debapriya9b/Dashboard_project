queue()
  .defer(d3.csv,"data/Mall_Customers.csv" )
  .await(makeGraphs);
  
function makeGraphs(error,incomeData) {
    var ndx = crossfilter(incomeData);
    
    show_gender_balance(ndx);
    show_gender_selector(ndx);
    show_age_distribution(ndx);
    
    dc.renderAll();
}

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('Gender'));
    var group = dim.group();
    
    dc.barChart("#gender-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}

function show_gender_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('Gender'));
    var group = dim.group();
    
    dc.selectMenu("#gender-selector")
        .dimension(dim)
        .group(group);
}







function show_age_distribution(ndx) {
    var dim = ndx.dimension(dc.pluck('Age'));
    var group = dim.group();
    
    dc.barChart("#age-distribution")
        .width(800)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Age")
        .yAxis().ticks(20);
}






