var DATA = null;
var colors = [
    "#F09EA7",
    "#F6CA94",
    "#FAFABE",
    "#C1EBC0",
    "#C7CAFF",
    "#CDABEB",
    "#F6C2F3"
]
var wheel = null;
async function reset(){
    localStorage.removeItem("sheetid");
    location.reload();
}
function getSheet(id){
    document.getElementById("sheet").style.display = "none";
    document.getElementById("wheel").innerHTML = "Loading...";
    const parser = new PublicGoogleSheetsParser(id)
    parser.parse().then(function(data){
        if (data.length == 0){
            alert("No data found, or something is wrong with this Sheet ID...");
        }
        else{
            DATA = data;
            localStorage['sheetid'] = id;
            document.getElementById("controls").style.display = "inline-block";
            document.getElementById("spinbutton").style.display = "inline-block";
            getGroup();
            createWheel();
        }
    }).catch(error => alert("Please enter a Sheet ID"));
}
function getGroup(){
    var group = [];
    var types = [];
    for (x = 0; x < DATA.length; x++){
        let name = DATA[x]["Suggester"];
        let type = DATA[x]["Type"];
        if (!group.includes(name)){
            group.push(name);
            document.getElementById('group').innerHTML += `
            <input onchange='createWheel()' type="checkbox" value="${name}" id="${name}" name="group" />
            <label for="${name}">${name}</label>
            <br>
            `;
        }
        if (!types.includes(type)){
            types.push(type);
            document.getElementById('type').innerHTML += `
            <input onchange='createWheel()' type="checkbox" value="${type}" id="${type}" name="type" />
            <label for="${type}">${type}</label>
            <br>
            `;
        }
    }
}
function createWheel(){
    var filterdata = DATA;

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
        overlayImage: "cursor.png",
        pointerAngle: 0
    }
    console.log(props);
    
    // 2. Decide where you want it to go:
    const container = document.getElementById("wheel");
    
    // 3. Create the wheel in the container and initialise it with the props:
    wheel = new spinWheel.Wheel(container, props);
}

$( document ).ready(function() {
    if (localStorage['sheetid'] != null){
        console.log("Existing ID");
        getSheet(localStorage['sheetid'])
    }else{
        console.log("No existing ID");
    }
});