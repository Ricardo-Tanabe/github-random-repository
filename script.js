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
            open_issues_count
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

function setrootStyle(config) {
    rootVar.setProperty(config.direction.property, config.direction.value);
    rootVar.setProperty(config.position.property, config.position.value);
}

function adjusteDropDownStyle() {
    const dropVerification = dropDown.style.display === 'flex'
    const rootVerification = rootVar.getPropertyValue('--position-value') === '0%'
    const config = {
        direction: {property: '--arrow-direction', value: 'transparent transparent black'},
        position: {property: '--position-value', value: '0%'}
    }
    dropDown.style.display = dropVerification ? 'none' : 'flex';
    if(rootVerification) {
        config.direction = {property: '--arrow-direction', value: 'black transparent transparent'};
        config.position = {property: '--position-value', value: '40%'};
    }
    setrootStyle(config);
}

function setRandomAndButtonContainer(styleConfig) {
    randomContainer.style.background = styleConfig.color.personal;
    randomContainer.style.border = styleConfig.shape.border;
    buttonRepeat.style.display = styleConfig.shape.display;
    buttonRepeat.style.background = styleConfig.color.general;
    buttonRepeat.style.borderColor = styleConfig.color.general;
    innerText.style.textAlign = styleConfig.align.text;
    innerTitle.style.margin = styleConfig.align.marginTitle;
    innerText.style.margin = styleConfig.align.marginText;
    innerRepo.style.margin = styleConfig.align.marginRepo;
}

function errorRandomContainer() {
    const styleConfig = {
        color: {personal: '#ffb4b4', general: 'red'},
        shape: {border: 'none', display: 'block'},
        align: {text: 'center', marginTitle: 'auto', marginText: 'auto', marginRepo: 'auto'}
    };
    setRandomAndButtonContainer(styleConfig);
    innerTitle.innerHTML = ''
    innerText.innerHTML = 'Error fetching repositories';
    for (let i = 0; i < innerRepoInfo.length; i++) {
        innerRepoInfo[i].innerHTML = '';
    }
    buttonRepeat.firstChild.innerHTML = 'Click to retry'
}

function loadRandomContainer() {
    const styleConfig = {
        color: {personal: '#e6e6e6', general: 'black'},
        shape: {border: 'none', display: 'none'},
        align: {text: 'center', marginTitle: 'auto', marginText: 'auto', marginRepo: 'auto'}
    };
    setRandomAndButtonContainer(styleConfig);
    innerTitle.innerHTML = ''
    innerText.innerHTML = 'Loading, please wait...';
    for (let i = 0; i < innerRepoInfo.length; i++) {
        innerRepoInfo[i].innerHTML = '';
    }
}

function resultRandomContainer(name, description, language, stargazers_count, forks_count, open_issues_count) {
    const spanContent = [language, stargazers_count, forks_count, open_issues_count]
    const simbol = ['&#9899;', '&#9734;', '&#9872;', '&#9432;']
    const styleConfig = {
        color: {personal: 'white', general: 'black'},
        shape: {border: '2px solid black', display: 'block'},
        align: {text: 'justify', marginTitle: '10px auto 5px', marginText: '0 auto 5px', marginRepo: 'auto auto 10px'}
    };
    setRandomAndButtonContainer(styleConfig);
    innerTitle.innerHTML = name
    innerText.innerHTML = description;
    for (let i = 0; i < spanContent.length; i++) {
        innerRepoInfo[i].innerHTML = `${simbol[i]} ${spanContent[i]}`;
    }
    buttonRepeat.firstChild.innerHTML = 'Refresh'
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

