var wheel = null;
function createWheel(){
    console.log(data);
    var filterdata = data;

    if(document.getElementById('unwatched').checked){
        filterdata = filterdata.filter(item => item["Watched"] == false);
    }else if(document.getElementById('watched').checked){
        filterdata = filterdata.filter(item => item["Watched"] == true);
    }

    var groupFilter = [];
    $("input:checkbox[name=group]:checked").each(function(){
        groupFilter.push(this.value);
    });
    var typeFilter = [];
    $("input:checkbox[name=type]:checked").each(function(){
        typeFilter.push(this.value);
    });

    if (groupFilter.length > 0){
        filterdata = filterdata.filter(item => groupFilter.includes(item["Suggester"]));
    }
    if (typeFilter.length > 0){
        filterdata = filterdata.filter(item => typeFilter.includes(item["Type"]));
    }
    

    renderWheel(filterdata);
}

function renderWheel(input){
    document.getElementById("wheel").innerHTML = "";
    // 1. Configure the wheel's properties:
    wheel_items = [];
    for (x = 0; x < input.length; x++){
        wheel_items.push({
            label: input[x]["Title"],
            backgroundColor: colors[x % colors.length]
        });
    }
    const props = {
        items: wheel_items,
        overlayImage: "media/cursor.png",
        pointerAngle: 90,
        rotationSpeedMax: 1000,
        rotationResistance: -200,
    }
    console.log(props);
    
    // 2. Decide where you want it to go:
    const container = document.getElementById("wheel");
    
    // 3. Create the wheel in the container and initialise it with the props:
    wheel = new spinWheel.Wheel(container, props);
    wheel.onCurrentIndexChange = sound;
}