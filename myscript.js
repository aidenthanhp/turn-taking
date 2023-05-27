let data = localStorage.getItem("turntaking-data");
let techs = [];
if (data) {
    techs = [ ...JSON.parse(data) ]
}
const table = document.getElementById('table');
retable(techs)

function restartDay() {
    techs = [];
    retable(techs)
    localStorage.clear();
}

function retable(arr) {
    if (!techs.length) {
        table.innerHTML = `
            <p>No One Checked In Yet</p>
        `
    }

    else {
        table.innerHTML = `
            <h3 class="text-primary">Next: ${arr[0].name}</h3>
        `;
        arr.forEach(tech => {
            table.innerHTML += `
                <div class="d-flex justify-content-center align-item-center my-1">
                    <h3 class="p-0 m-0 mr-2">${tech.name}</h3>
                    <button id="updatebtn-${tech.name}-${tech.available}" class="btn btn-${tech.available ? 'primary' : 'danger'}">${tech.available ? 'START' : 'STOP'}</button>
                </div>
            `
        })

        const updateBtns = document.querySelectorAll("button[id^='updatebtn']");
        updateBtns.forEach(btn => {
            console.log(btn);
            btn.addEventListener("click", () => {
                const btninfo = btn.getAttribute('id').split('-')
                const techname = btninfo[1];
                const techavai = btninfo[2];

                updateTech(techname, techavai)
            })
        })
    }
}

function techCheckIn(event) {
    event.preventDefault();
    const name = document.getElementById('tech-name').value;

    if (name) {
        const availabletech = [];
        const unavailabletech = [];

        techs.forEach(tech => {
            if (tech.available) {
                availabletech.push(tech)
            } else if (!tech.available) {
                unavailabletech.push(tech)
            }
        })

        availabletech.push({
            name,
            available: true
        });

        localStorage.setItem("turntaking-data", JSON.stringify(techs));
        techs = [ ...availabletech, ...unavailabletech ];
        retable(techs)
    }
    
    document.getElementById('tech-name').value = ''
}

function updateTech(name, avai) {
    console.log(name, avai)
    const available = avai == 'true' ? true : false
    if (available) {
        const newtech = [];
        techs.forEach(tech => {
            if (tech.name != name) {
                newtech.push({
                    name: tech.name,
                    available: tech.available
                })
            } 
        })

        newtech.push({
            name,
            available: false
        })

        techs = [ ...newtech ];
        localStorage.setItem("turntaking-data", JSON.stringify(techs))
        retable(techs);
    } else {
        const availabletech = [];
        const unavailabletech = [];
        techs.forEach(tech => {
            if (tech.name != name && tech.available) {
                availabletech.push({
                    name: tech.name,
                    available: tech.available
                })
            } else if (tech.name != name && !tech.available) {
                unavailabletech.push({
                    name: tech.name,
                    available: tech.available
                })
            }
        })

        availabletech.push({
            name,
            available: true
        })

        techs = [ ...availabletech, ...unavailabletech ];
        localStorage.setItem("turntaking-data", JSON.stringify(techs))
        retable(techs);
    }
}

