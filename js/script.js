let page = 1;
const characterList = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');



function call(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Solicitud no exitosa');
            }
            return response.json();
        })
        .then ((data) => {
            characterList.innerHTML = ''; //borrar contenido antes de agregar (preguntar a Data en clase)
            createTemplate(data.results);
            pageButtons(data.info.prev, data.info.next);
        })       
}

    
function createTemplate(characters) {
    characters.forEach(character => {
        const template =
        `
        <div>
            <img src='${character.image}' alt='${character.name}' />
            <h2><span>Name:</span> ${character.name}</h2>
            <h2><span>Species:</span> ${character.species}</h2>            
        </div>
        `
        characterList.innerHTML += template;
    })
}

function pageButtons(prev, next) { //para deshabilitar los botones en caso de que no haya mas data.info.next o prev
    prevBtn.disabled = !prev;
    nextBtn.disabled = !next;
}

nextBtn.addEventListener('click', () => {
    page++;
    call(page)
})

prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page--;
        call(page);
    }
})


call(page)