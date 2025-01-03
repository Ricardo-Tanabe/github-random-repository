import { Octokit } from "@octokit/rest";

const octokit = new Octokit();
const selector = document.querySelector('#select-items');
const dropDown = document.querySelector('.show-items');
const randomContainer = document.querySelector('.random-repository-container');
const buttonRepeat = document.querySelector('.button-container');
const innerTitle = randomContainer.children[0];
const innerText = randomContainer.children[1];
const innerRepo = randomContainer.children[2];
const innerRepoInfo = randomContainer.children[2].children;
const rootVar = document.documentElement.style;
let languageSelected = '';

async function getRandomRepo(language) {
    try {
        const response = await octokit.search.repos({
            q: `language:${language}`,
            sort: "stars",
            order: "desc",
            per_page: 100
        });
        const repos = response.data.items;
        const randomRepo = repos[Math.floor(Math.random() * repos.length)];
        const {
            name,
            description,
            stargazers_count,
            forks_count,
            open_issues_count,
            html_url
        } = randomRepo;
        resultRandomContainer(
            name,
            description,
            language,
            stargazers_count,
            forks_count,
            open_issues_count
        );
    } catch (error) {
        errorRandomContainer();
        // throw new Error("Erro ao buscar a lista de linguagens:", error);
    }
        
}

async function loadLanguages() {
    const url ='https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            selector.innerHTML = 'Erro no carregamento';
        }
        const languages = await response.json();
        createSelectionList(languages);
    } catch (error) {
        selector.innerHTML = 'Erro no carregamento';
        console.log(error)
    }
}

function createSelectionList(languages) {
    for (let index = 0; index < languages.length; index++) {
        const liElement = document.createElement('li');
        liElement.innerHTML = languages[index].title;
        dropDown.appendChild(liElement);
    }
}

function adjusteDropDownStyle() {
    dropDown.style.display = dropDown.style.display === 'flex' ? 'none' : 'flex';
    if(rootVar.getPropertyValue('--position-value') === '0%') {
        rootVar.setProperty('--arrow-direction', 'black transparent transparent');
        rootVar.setProperty('--position-value', '40%');
    } else {
        rootVar.setProperty('--arrow-direction', 'transparent transparent black');
        rootVar.setProperty('--position-value', '0%');
    }
}

function errorRandomContainer() {
    randomContainer.style.background = 'rgb(255, 180, 180)';
    randomContainer.style.border = 'none'
    buttonRepeat.style.display = 'block';
    buttonRepeat.style.background = 'red';
    buttonRepeat.style.borderColor = 'red';
    buttonRepeat.firstChild.innerHTML = ''
    innerText.style.textAlign = 'center' ;
    innerTitle.style.margin = innerText.style.margin = innerRepo.style.margin = 'auto';
    innerTitle.innerHTML = ''
    innerText.innerHTML = 'Error fetching repositories';
    for (let i = 0; i < innerRepoInfo.length; i++) {
        innerRepoInfo[i].innerHTML = '';
    }
}

function loadRandomContainer() {
    randomContainer.style.background = 'rgb(230, 230, 230)';
    randomContainer.style.border = 'none';
    buttonRepeat.style.background = 'black';
    buttonRepeat.style.borderColor = 'black';
    innerText.style.textAlign = 'center' ;
    innerTitle.style.margin = innerText.style.margin = innerRepo.style.margin = 'auto';
    innerTitle.innerHTML = ''
    innerText.innerHTML = 'Loading, please wait...';
    for (let i = 0; i < innerRepoInfo.length; i++) {
        innerRepoInfo[i].innerHTML = '';
    }
}

function resultRandomContainer(name, description, language, stargazers_count, forks_count, open_issues_count) {
    const spanContent = [language, stargazers_count, forks_count, open_issues_count]
    const simbol = ['&#9899;', '&#9734;', '&#9872;', '&#9432;']
    
    randomContainer.style.background = 'white';
    randomContainer.style.border = '2px solid black';
    buttonRepeat.style.display = 'block';
    buttonRepeat.style.background = 'black';
    buttonRepeat.style.borderColor = 'black';
    innerText.style.textAlign = 'justify';
    innerTitle.style.margin = '10px auto 5px'
    innerText.style.margin = '0 auto';
    innerRepo.style.margin = 'auto auto 10px';
    innerTitle.innerHTML = name
    innerText.innerHTML = description;
    for (let i = 0; i < spanContent.length; i++) {
        innerRepoInfo[i].innerHTML = `${simbol[i]} ${spanContent[i]}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguages();
})

document.addEventListener('click', (e) => {
    if(e.target === selector) {
        adjusteDropDownStyle();
    }

    if(Array.from(dropDown.children).includes(e.target)) {
        adjusteDropDownStyle();
        languageSelected = e.target.innerHTML;
        selector.innerHTML = languageSelected;
        const formattedLang = languageSelected.toLowerCase().trim();
        loadRandomContainer();
        getRandomRepo(formattedLang);
    }

    if(buttonRepeat.contains(e.target)) {
        const formattedLang = languageSelected.toLowerCase().trim();
        loadRandomContainer();
        getRandomRepo(formattedLang);
    }
})

