// src/app.js

import {
    initChat,
    setCharacter,
    getCharacter
} from "./chat.js";
import { CHARACTERS } from "./characters.js";

const app = document.getElementById("app");


// =========================
// HOME
// =========================

function renderHome() {

    app.innerHTML = `

    <section class="home">

        <h1>Tres Mentes</h1>

        <p>
            Elegí con qué personaje querés conversar.
        </p>


        <div class="character-list">


            ${Object.values(CHARACTERS).map(character => `


                <div class="character-preview">


                    <img
                        src="${character.image}"
                        alt="${character.name}"
                    >


                    <h2>
                        ${character.name}
                    </h2>


                    <p>
                        ${character.tagline}
                    </p>


                    <button
                        class="select-character"
                        data-character="${character.name}"
                    >
                        Hablar con ${character.name}
                    </button>


                </div>


            `).join("")}


        </div>


    </section>

    `;



    document
    .querySelectorAll(".select-character")
    .forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const character =
                    button.dataset.character;


                setCharacter(character);


                navigate("/chat");


            }
        );


    });


}



// =========================
// CHAT
// =========================

function renderChat() {


    app.innerHTML = `


    <section class="chat-page">


        <!-- Selección de personajes -->

        <div class="chat-characters">


            ${Object.values(CHARACTERS).map(character => `


                <button
                    class="chat-character"
                    data-character="${character.name}"
                >


                    <img
                        src="${character.image}"
                        alt="${character.name}"
                    >


                    <span>
                        ${character.name}
                    </span>


                </button>


            `).join("")}


        </div>




        <!-- Mensajes -->

        <div id="messages"></div>





        <!-- Entrada -->

        <div class="input-area">


            <input
                id="message-input"
                type="text"
                placeholder="Escribí un mensaje..."
            >



            <button id="send-btn">
                Enviar
            </button>


        </div>



    </section>


    `;



    // Cambiar personaje

    document
    .querySelectorAll(".chat-character")
    .forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const character =
                    button.dataset.character;


                setCharacter(character);


            }
        );


    });



    initChat();


}



// =========================
// ABOUT
// =========================

function renderAbout() {

    app.innerHTML = `

    <section class="about">

        <h2>Acerca del proyecto</h2>

        <p>
            <strong>Tres Mentes</strong> es una aplicación web desarrollada como una
            Single Page Application (SPA) que permite conversar con tres personajes
            de inteligencia artificial mediante Google Gemini AI. Cada personaje
            posee una personalidad única, ofreciendo una experiencia de conversación
            diferente para el usuario.
        </p>

        <p>
            El usuario puede navegar entre las distintas secciones de la aplicación,
            seleccionar un personaje y mantener una conversación interactiva sin
            necesidad de recargar la página.
        </p>

        <hr>

        <h2>Personajes</h2>

        ${Object.values(CHARACTERS).map(character => `

            <div class="about-character">

                <img
                    src="${character.image}"
                    alt="${character.name}"
                    class="about-character-image"
                >

                <h3>${character.name}</h3>

                <p>
                    <strong>${character.tagline}</strong>
                </p>

                <p>
                    ${character.description}
                </p>

            </div>

        `).join("")}

    </section>

    `;

}

// =========================
// ROUTER
// =========================

function renderRoute() {


    switch(window.location.pathname){


        case "/":

        case "/home":

            renderHome();

            break;



        case "/chat":

            renderChat();

            break;



        case "/about":

            renderAbout();

            break;



        default:

            renderHome();


    }


}



// =========================
// NAVEGAR
// =========================

function navigate(path) {


    history.pushState(
        {},
        "",
        path
    );


    renderRoute();


}



// =========================
// MENÚ SUPERIOR
// =========================

function initNavigation() {


    document
    .querySelectorAll("[data-route]")
    .forEach(button => {


        button.addEventListener(
            "click",
            () => {


                navigate(
                    button.dataset.route
                );


            }
        );


    });


}



// =========================
// EVENTOS
// =========================

window.addEventListener(
    "popstate",
    renderRoute
);



initNavigation();

renderRoute();