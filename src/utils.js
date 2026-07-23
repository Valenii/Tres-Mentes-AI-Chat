// src/utils.js

import { CHARACTERS } from "./characters.js";

// =========================
// CREAR MENSAJE
// =========================

export function createMessage(
    text,
    type,
    image = null
){

    const element =
        document.createElement("div");


    element.classList.add(
        "message",
        type
    );


    // =========================
    // AVATAR DEL PERSONAJE
    // =========================

    if(image && type === "ai"){


        const avatar =
            document.createElement("img");


        avatar.src =
            image;


        avatar.alt =
            "Avatar del personaje";


        avatar.classList.add(
            "message-avatar"
        );


        // Abrir tarjeta al tocar imagen

        avatar.addEventListener(
            "click",
            ()=>{

                openCharacterCard(
                    image
                );

            }
        );


        element.appendChild(
            avatar
        );

    }


    const content =
        document.createElement("span");


    // =========================
    // FORMATO DEL TEXTO
    // =========================

    let formatted = text;

    // **texto** -> negrita
    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // *texto* -> cursiva
    formatted = formatted.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );

    content.innerHTML =
        formatted;


    element.appendChild(
        content
    );


    return element;

}



// =========================
// MOSTRAR MENSAJE
// =========================

export function addMessage(
    container,
    text,
    type,
    image = null
){

    const element =
        createMessage(
            text,
            type,
            image
        );


    container.appendChild(
        element
    );


    scrollBottom(
        container
    );


    return element;

}



// =========================
// INDICADOR ESCRIBIENDO
// =========================

export function showTyping(
    container,
    character
){

    return addMessage(
        container,
        `${character} está escribiendo...`,
        "typing"
    );

}



// =========================
// ABRIR TARJETA PERSONAJE
// =========================

function openCharacterCard(
    image
){

    const modal =
        document.getElementById(
            "characterModal"
        );


    const modalImg =
        document.getElementById(
            "modalImg"
        );


    const modalName =
        document.getElementById(
            "modalName"
        );


    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    if(
        !modal ||
        !modalImg
    ){

        return;

    }


    const character =
        Object.values(CHARACTERS)
        .find(
            item =>
            item.image === image
        );


    if(!character){

        console.log(
            "Personaje no encontrado:",
            image
        );

        return;

    }


    modalImg.src =
        character.image;


    modalName.textContent =
        character.name;


    modalDescription.textContent =
        character.description;


    modal.classList.add(
        "show"
    );

}



// =========================
// CERRAR MODAL
// =========================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const closeButton =
            document.getElementById(
                "closeModal"
            );


        const modal =
            document.getElementById(
                "characterModal"
            );


        if(
            closeButton &&
            modal
        ){

            closeButton.addEventListener(
                "click",
                ()=>{

                    modal.classList.remove(
                        "show"
                    );

                }
            );

        }

    }
);



// =========================
// SCROLL AUTOMÁTICO
// =========================

export function scrollBottom(
    container
){

    container.scrollTop =
        container.scrollHeight;

}



// =========================
// VALIDAR INPUT
// =========================

export function isEmpty(
    text
){

    return text.trim() === "";

}



// =========================
// LIMPIAR INPUT
// =========================

export function clearInput(
    input
){

    input.value = "";

}