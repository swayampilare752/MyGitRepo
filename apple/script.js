let searchText = '13';

function searchHandler(isShowAll = false) {
    loading(true);
    const searchField = document.getElementById("searchField");
    searchText = searchField.value.trim();
    loadPhone(searchText, isShowAll);
}

const loading = (isLoading) => {
    const loadingElement = document.getElementById("loading");
    loadingElement.classList.toggle('hidden', !isLoading);
}

const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = '';

    const showAllBtn = document.getElementById("showALLBtn");
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card');

        phoneCard.innerHTML = `
            <img src="${phone.image}" alt="${phone.phone_name}" class="product-image">
            <h2>${phone.phone_name}</h2>
            <p>Latest smartphone with amazing features.</p>
            <button onclick="showDetailsHandler('${phone.slug}')" class="btn-primary">Show Details</button>
            <button class="compare-btn">Compare</button>
        `;

        phoneContainer.appendChild(phoneCard);
    });

    loading(false);
}

function showBtn() {
    searchHandler(true);
}

const showDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (details) => {
    const modal = document.getElementById('my_modal');
    modal.showModal();

    document.getElementById('imgContainer').innerHTML = `<img src="${details.image}" class="product-image">`;
    document.getElementById('detailsPhoneName').innerText = details.name;
    document.getElementById('detailsBrand').innerText = `Brand: ${details.brand}`;
    
    let features = details.mainFeatures;
    let specs = "";
    for (const key in features) {
        specs += `${key}: ${features[key]}\n`;
    }
    document.getElementById('detailsSpec').innerText = specs;
    document.getElementById('releaseDate').innerText = details.releaseDate || "No release date available.";
}

function closeModal() {
    document.getElementById('my_modal').close();
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Load initial data
loadPhone(searchText);
