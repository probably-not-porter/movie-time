function getFilters() {
    var group = [];
    var types = [];
    for (x = 0; x < data.length; x++) {
        console.log(data[x]);
        if (data[x].title != "" && "Title" in data[x]) {
            let name = data[x]["Suggester"];
            let type = data[x]["Type"];
            if (!group.includes(name)) {
                group.push(name);
                document.getElementById("group").innerHTML += `
                <input onchange='createWheel(data)' type="checkbox" value="${name}" id="${name}" name="group" />
                <label for="${name}">${name}</label>
                <br>
                `;
            }
            if (!types.includes(type)) {
                types.push(type);
                document.getElementById("type").innerHTML += `
                <input onchange='createWheel(data)' type="checkbox" value="${type}" id="${type}" name="type" />
                <label for="${type}">${type}</label>
                <br>
                `;
            }
        }
    }
}
