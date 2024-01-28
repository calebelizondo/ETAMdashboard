if (DEBUG) {
    console.log("Debug mode is on!");
    console.log("DEBUG", DEBUG);
    console.log("BACKEND_URL", BACKEND_URL);
    // more debug statements can be added here: 
}

//get the initial data from the backend to populate dropdowns
const getInitData = async () => {
    const response = await fetch(`${BACKEND_URL}/init-data`);
    const data = await response.json();
    return data;
}

//get the admission data from the backend
const getAdmissionData = async () => {
    const response = await fetch(`${BACKEND_URL}/get-all-trends`);
    const data = await response.json();
    return data;
}

getInitData().then(data => {

    if (DEBUG) {
        console.log("Initial data", data);
    }

    //update the year and program dropdowns
    const yearDropdown = document.getElementById("year-select");
    const programDropdown = document.getElementById("program-select");

    data.years.forEach(year => {
        const option = document.createElement("option");
        option.text = year.year;
        yearDropdown.add(option);
    });

    data.programs.forEach(program => {
        const option = document.createElement("option");
        option.text = program.program;
        programDropdown.add(option);
    });
});

