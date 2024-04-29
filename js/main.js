$( document ).ready( async function() {
    if (localStorage['sheetid'] != null){
        data = await getSheet(localStorage['sheetid'])

        document.getElementById("controls").style.display = "inline-block";
        document.getElementById("spinbutton").style.display = "inline-block";
        getFilters();
        createWheel();
    }else{
        console.log("No existing ID");
    }
});