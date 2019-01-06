class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor() {
        const btn = document.querySelector('button');
        console.log(this);
        btn.addEventListener('click', this.addName());
    }

    addName() {
        const name = new NameField("Vuong");
    }
}

const gen = new NameGenerator();