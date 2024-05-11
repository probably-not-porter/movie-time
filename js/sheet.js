async function getSheet(id){
    document.getElementById("sheet").style.display = "none";
    document.getElementById("wheel").innerHTML = "Loading...";
    try {
        const parser = new PublicGoogleSheetsParser(id);
        const result = await parser.parse();
        if (result.length === 0) {
            alert("No data found, or something is wrong with this Sheet ID...");
        } else {
            localStorage['sheetid'] = id;
            console.log(result);
            return result;
        }
    } catch (error) {
        alert("Please enter a Sheet ID");
        throw error; // Propagate the error
    }
}

// get NEW sheet
async function getNewSheet(id){
    await getSheet(id);
    location.reload();
}

// reset local storage Sheet ID
async function reset(){
    localStorage.removeItem("sheetid");
    location.reload();
}