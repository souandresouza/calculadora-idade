// Days in each month, index 0 is January, index 1 is February, etc.
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
// Function to update the number of days based on selected month and year
function updateDays(selectId) {
    const selectElement = document.querySelector(`#${selectId}`);
    const month = parseInt(document.querySelector(`#${selectId.replace('-day', '-month')}`).value) - 1; // Get the selected month (0-indexed)
    const year = parseInt(document.querySelector(`#${selectId.replace('-day', '-year')}`).value);
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    // Get the correct number of days for the selected month
    let days = daysInMonth[month];
    
    // February (index 1) in a leap year
    if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            days = 29; // Leap year
        }
    }

    // Add day options dynamically
    for (let i = 1; i <= days; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
}

// Function to calculate the age and different time formats
function calculateAge(event) {
    event.preventDefault();

    // Get Date of Birth (DOB) values
    const dobMonth = parseInt(document.querySelector("#dob-month").value);
    const dobDay = parseInt(document.querySelector("#dob-day").value);
    const dobYear = parseInt(document.querySelector("#dob-year").value);

    // Create Date object for DOB
    const dob = new Date(dobYear, dobMonth - 1, dobDay);

    // Calculate age once and update display
    updateAgeDisplay(dob);
}

function updateAgeDisplay(dob) {
    const currentDate = new Date();

    // Calculate age
    let years = currentDate.getFullYear() - dob.getFullYear();
    let months = currentDate.getMonth() - dob.getMonth();
    let days = currentDate.getDate() - dob.getDate();

    // Adjust if days or months are negative
    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total days, hours, minutes, and seconds
    const totalDays = Math.floor((currentDate - dob) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24 + currentDate.getHours();
    const totalMinutes = totalHours * 60 + currentDate.getMinutes();
    const totalSeconds = totalMinutes * 60 + currentDate.getSeconds();

    // Display results in Portuguese
    document.querySelector("#result").innerHTML = `
        <p class="age-bold">Idade na data selecionada: ${years} anos ${months} meses ${days} dias</p>
        <p><strong>Idade em dias:</strong> ${totalDays} dias</p>
        <p><strong>Idade em horas:</strong> ${totalHours} horas</p>
        <p><strong>Idade em minutos:</strong> ${totalMinutes} minutos</p>
        <p><strong>Idade em segundos:</strong> ${totalSeconds} segundos</p>
    `;
}

// Set default values for Date of Birth and current Age-at date
window.onload = function() {
    // Set default Date of Birth (8 June 1981)
    document.querySelector("#dob-month").value = 6;
    document.querySelector("#dob-day").value = 8;
    document.querySelector("#dob-year").value = 1981;
    updateDays("dob-day");

    // Set Age-as-of date to current date
    const currentDate = new Date();
    document.querySelector("#ageAt-month").value = currentDate.getMonth() + 1;
    document.querySelector("#ageAt-day").value = currentDate.getDate();
    document.querySelector("#ageAt-year").value = currentDate.getFullYear();
    updateDays("ageAt-day");

    // Calculate age once on load
    calculateAge({ preventDefault: () => {} });
};