
// Inicjalizacja danych z LocalStorage lub pustej tablicy
let snakes = JSON.parse(localStorage.getItem('goldenScaleSnakes')) || [
    {
        id: 1,
        name: "Amel Motley",
        sex: "Samiec 1.0",
        status: "Dostępny",
        price: "350 PLN",
        image: "https://images.unsplash.com/photo-1596706900293-27e1f486e927?auto=format&fit=crop&w=800&q=80",
        description: "Piękny samiec z wyrazistym pomarańczowym kolorem i czystym brzuchem. Bardzo ładnie je, w pełni zdrowy, swojski chłopak!"
    },
    {
        id: 2,
        name: "Snow Tessera",
        sex: "Samica 0.1",
        status: "Rezerwacja",
        price: "450 PLN",
        image: "https://images.unsplash.com/photo-1599818809462-8178eef9cc20?auto=format&fit=crop&w=800&q=80",
        description: "Niesamowita samiczka w odmianie Snow Tessera. Zjada z pincety mrożonki, nigdy nie stwarzała problemów. Klasa premium!"
    }
];

// Renderowanie na stronie głównej
function loadSnakes() {
    const grid = document.getElementById('snake-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    snakes.forEach(snake => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(snake.id);
        
        let statusClass = snake.status.toLowerCase().includes('rezerwacja') ? 'rezerwacja' : '';

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${snake.image}" alt="${snake.name}">
            </div>
            <div class="card-content">
                <h3>${snake.name}</h3>
                <span class="card-status ${statusClass}">${snake.status}</span>
                <p>${snake.sex}</p>
                <p class="card-price">${snake.price}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Obsługa Modala Produktowego
function openModal(id) {
    const snake = snakes.find(s => s.id === id);
    if (!snake) return;

    document.getElementById('modal-img').src = snake.image;
    document.getElementById('modal-name').textContent = snake.name;
    document.getElementById('modal-status').textContent = snake.status;
    document.getElementById('modal-sex').textContent = snake.sex;
    document.getElementById('modal-price').textContent = snake.price;
    document.getElementById('modal-desc').textContent = snake.description;

    document.getElementById('snake-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('snake-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('snake-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// --- FUNKCJE ADMINA ---

function addSnake(imageData) {
    const newSnake = {
        id: Date.now(),
        name: document.getElementById('name').value,
        sex: document.getElementById('sex').value,
        status: document.getElementById('status').value,
        price: document.getElementById('price').value,
        image: imageData || '',
        description: document.getElementById('description').value
    };

    snakes.push(newSnake);
    saveData();
    document.getElementById('add-snake-form').reset();
    loadAdminSnakes();
}

function deleteSnake(id) {
    if(confirm('Na pewno chcesz usunąć tego węża z oferty?')) {
        snakes = snakes.filter(s => s.id !== id);
        saveData();
        loadAdminSnakes();
    }
}

function loadAdminSnakes() {
    const list = document.getElementById('admin-snake-list');
    if (!list) return;
    list.innerHTML = '';

    snakes.forEach(snake => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <img src="${snake.image}" alt="${snake.name}">
                <div>
                    <strong>${snake.name}</strong><br>
                    <small>${snake.price} | ${snake.status}</small>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteSnake(${snake.id})">Usuń</button>
        `;
        list.appendChild(item);
    });
}

function saveData() {
    localStorage.setItem('goldenScaleSnakes', JSON.stringify(snakes));
}

// Uruchomienie ładowania na starcie
document.addEventListener('DOMContentLoaded', loadSnakes);
