function pridejDoKosiku(polozkaKey) {
    fetch('slovnik.json')
        .then(response => response.json())
        .then(kosik => {
            const produkt = kosik[polozkaKey];
            let cart = JSON.parse(localStorage.getItem('kosik')) || [];
            cart.push({ nazev: produkt.nazev, cena: produkt.cena });
            localStorage.setItem('kosik', JSON.stringify(cart));
            notification(produkt.nazev + ' byl přidán do košíku');
        })
        .catch(() => alert("Chyba při načítání slovníku!"));
}

function notification(message) {
    const notificationDiv = document.createElement('div');
    const notificationText = document.createElement('h2');
    notificationText.textContent = message;
    notificationDiv.className = 'notification';
    notificationDiv.appendChild(notificationText);
    document.body.appendChild(notificationDiv);
    setTimeout(() => {
        notificationDiv.remove();
    }, 2000);
}
function zobrazKosik() {
    const itemsDiv = document.getElementById('yourItems');
    let cart = JSON.parse(localStorage.getItem('kosik')) || [];
    itemsDiv.innerHTML = ""; 
    if (cart.length === 0) {
        console.log("Košík je prázdný.");
        const emptyMessage = document.createElement('h1');
        emptyMessage.textContent = "Košík je prázdný ;(";
        itemsDiv.appendChild(emptyMessage);
        emptyMessage.style.textAlign = 'center';
        return;
    }
    cart.forEach(item => {
        const vec = document.createElement('div');
        vec.className = 'item';
        const nazev = document.createElement('h3');
        nazev.textContent = item.nazev;
        vec.appendChild(nazev);
        const cena = document.createElement('p');
        cena.textContent = "Cena: " + item.cena + " $";
        vec.appendChild(cena);
        itemsDiv.appendChild(vec);
    });
}
function toggleSections(){
    const sections = document.getElementById('sections');
    if (sections.style.display === 'none' || sections.style.display === '') {
        sections.style.display = 'inline';
    } else {
        sections.style.display = 'none';
    }
}