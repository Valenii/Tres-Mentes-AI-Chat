// api/functions.js

import { GoogleGenAI } from "@google/genai";

import ash from "./characters/ash.js";
import mime from "./characters/mime.js";
import sabia from "./characters/sabia.js";



const ai = new GoogleGenAI({

    apiKey: process.env.GEMINI_API_KEY,

});



const CHARACTERS = {

    Ash: ash,

    Mime: mime,

    Sabia: sabia,

};





export default async function handler(req, res) {


    // Solo aceptar POST

    if (req.method !== "POST") {

        return res.status(405).json({

            error: "Método no permitido",

        });

    }



    try {


        const {

            character,

            message,

            history = []

        } = req.body;



        // Validación

        if (!character || !message) {


            return res.status(400).json({

                error: "Faltan datos necesarios",

            });


        }




        // Buscar personaje

        const selectedCharacter =
            CHARACTERS[character];



        if (!selectedCharacter) {


            return res.status(404).json({

                error: "Personaje no encontrado",

            });


        }





        // Crear historial para Gemini

        const contents = [


            ...history.map(item => ({


                role:
                    item.role === "assistant"
                    ? "model"
                    : "user",


                parts: [

                    {
                        text: item.content
                    }

                ]


            })),



            {


                role: "user",


                parts: [

                    {
                        text: message
                    }

                ]


            }


        ];

const result = await ai.models.generateContent({

model: "gemini-3.5-flash-lite",

    contents,

    config: {

        systemInstruction:
            selectedCharacter.prompt +
          `
    
    Reglas obligatorias de respuesta:
    - Responde siempre de forma breve.
    - No des explicaciones largas ni desarrolles demasiado las ideas.
    - Máximo 50 palabras por respuesta.
    - Sé directo y natural.
    - Habla como un personaje de conversación, no como un asistente.
    - No repitas información innecesaria.

    `,

        temperature: 0.7,

        maxOutputTokens: 200,

    },


});





        return res.status(200).json({


            response:
                result.text,


        });





    } catch(error) {

    console.error("===== ERROR COMPLETO =====");
    console.error(JSON.stringify(error, null, 2));

    return res.status(500).json({
        error: "Error al conectar con Gemini",
        details: error.message,
    });

}

}