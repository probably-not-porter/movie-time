$( document ).ready( async function() {
    if (localStorage['sheetid'] != null){
        var data = await getSheet(localStorage['sheetid'])

        document.getElementById("controls").style.display = "inline-block";
        document.getElementById("spinbutton").style.display = "inline-block";

        getFilters(data);
        createWheel(data);
    }else{
        console.log("No existing ID");
    }
});