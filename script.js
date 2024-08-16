const hamburger = document.querySelector(".hamburgerMenu");
const navMenu = document.querySelector(".nav-menu");
const columns = document.querySelector('.columns');
const col1 = document.querySelector('.col1');


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  
  document.querySelectorAll(".navLink").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
  );

//for left side arrow 
const arrow = document.getElementById('arrow');
arrow.addEventListener('click', ()=> {
    if (arrow.classList.contains('rotate')) {
        arrow.classList.remove('rotate');
        document.querySelector('.image').style.display = 'block';
        document.querySelector('.heading').classList.remove('show');
        document.querySelector('.head').style.justifyContent = 'end';
        document.querySelector('.data').style.display = 'none';
        if (window.screen.width < 550) {
            document.querySelector('.left').style.width = '95px';
        } else {
            document.querySelector('.left').style.width = '132px';
        }
    } else {
        arrow.classList.add('rotate');
        document.querySelector('.data').style.display = 'block';
        document.querySelector('.image').style.display = 'none';
        // document.querySelector('.heading').style.display = 'block';
        document.querySelector('.heading').classList.add('show');
        document.querySelector('.head').style.justifyContent = 'space-between';
            document.querySelector('.left').style.width = 'fit-content';
    }
})

async function getData(params) {
    try {
        let response = await fetch('./data.json');
        let data = await response.json();
        console.log(response);
        console.log(data.tasks[0].assets);
        let tasks = data.tasks[0].assets;
        renderData(tasks);
    } catch (error) {
        console.log('An error occurred ', error);
    }
}

getData();


function renderData(data) {
    const cols = document.querySelectorAll('.col');

    if (cols.length !== data.length) {
        console.error("The number of columns and data items do not match.");
        return;
    }

    cols.forEach((col, index) => {

        let columnHeading = document.createElement('div');
        columnHeading.className = 'all-heading';

        let item = data[index];
        let itemContent = document.createElement('div');
        itemContent.innerHTML = `
            <div class='col-head'>
                <p>${item.asset_title}</p>
                <p class="info">i</p>
            </div>
            <p class="desc"><span class="bold">Description:</span> ${item.asset_description}</p>
        `;
        columnHeading.appendChild(itemContent);

        col.insertBefore(columnHeading, col.firstChild);
    });
}
const details = document.getElementsByClassName('detail');
const detailsTag = document.getElementsByTagName('details');
const arrows = document.getElementsByClassName('arrow');

Array.from(details).forEach((detail,index) => {
    detail.addEventListener('click', ()=> {
        if (detailsTag[index].open === false) {
            arrows[index].src = 'assets/up-arrow.png'
        } else {
            arrows[index].src = 'assets/down-arrow.png'
        }
    })
})
