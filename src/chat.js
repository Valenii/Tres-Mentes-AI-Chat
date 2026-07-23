// src/chat.js

import {
    addMessage,
    showTyping,
    isEmpty,
    clearInput
} from "./utils.js";

import { CHARACTERS } from "./characters.js";


// =========================
// PERSONAJE ACTUAL
// =========================

let currentCharacter = "Mime";


// Historial de conversación

const conversation = [];



// =========================
// CAMBIAR PERSONAJE
// =========================

export function setCharacter(character) {

    currentCharacter = character;

    conversation.length = 0;


    const messages =
        document.getElementById("messages");


    if(messages){

        messages.innerHTML = "";

        showWelcomeMessage(messages);

    }

}



// =========================
// OBTENER PERSONAJE
// =========================

export function getCharacter(){

    return currentCharacter;

}



// =========================
// INICIALIZAR CHAT
// =========================

export function initChat(){


    const messages =
        document.getElementById("messages");


    const input =
        document.getElementById("message-input");


    const button =
        document.getElementById("send-btn");



    if(!messages || !input || !button){

        return;

    }



    button.addEventListener(
        "click",
        () => {

            sendMessage(
                input,
                messages
            );

        }
    );



    input.addEventListener(
        "keydown",
        (event)=>{


            if(event.key === "Enter"){


                sendMessage(
                    input,
                    messages
                );

            }


        }
    );



    showWelcomeMessage(messages);


}



// =========================
// MENSAJE INICIAL
// =========================

function showWelcomeMessage(container){


    const greetings = {


        Mime:
        "¡Hola! Soy Mime. Me encanta descubrir cosas nuevas. ¿Qué te gustaría explorar hoy?",


        Ash:
        "Bienvenido. Soy Ash. Cuéntame qué sucede y analizaremos la situación con calma.",


        Sabia:
        "Me alegra que estés aquí. Soy Sabia. Puedes contarme lo que quieras; te escucharé con tranquilidad."

    };



    addMessage(

        container,

        greetings[currentCharacter],

        "ai",

        CHARACTERS[currentCharacter].image

    );


}



// =========================
// ENVIAR MENSAJE
// =========================

async function sendMessage(
    input,
    container
){


    const text =
        input.value.trim();



    if(isEmpty(text)){

        return;

    }



    addMessage(
        container,
        text,
        "user"
    );



    conversation.push({

        role:"user",

        content:text

    });



    clearInput(input);



    const typing =
        showTyping(
            container,
            currentCharacter
        );



    try{


        const response =
            await fetch(
                "/api/functions",
                {


                    method:"POST",


                    headers:{


                        "Content-Type":
                        "application/json"


                    },


                    body:JSON.stringify({


                        character:
                        currentCharacter,


                        message:
                        text,


                        history:
                        conversation


                    })


                }
            );



        if(!response.ok){


            throw new Error(
                "Error en la petición"
            );


        }



        const data =
            await response.json();



        typing.remove();



        addMessage(

            container,

            data.response,

            "ai",

            CHARACTERS[currentCharacter].image

        );



        conversation.push({


            role:"assistant",


            content:data.response


        });



    }catch(error){


        console.error(error);



        typing.remove();



        addMessage(

            container,

            "No pude conectarme con Gemini en este momento.",

            "ai",

            CHARACTERS[currentCharacter].image

        );


    }


}