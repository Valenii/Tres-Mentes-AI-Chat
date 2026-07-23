import { describe, it, expect } from "vitest";
import { isEmpty, clearInput } from "../src/utils.js";

describe("Utils", () => {

    it("isEmpty devuelve true si el texto está vacío", () => {
        expect(isEmpty("")).toBe(true);
    });

    it("isEmpty devuelve false cuando hay texto", () => {
        expect(isEmpty("Hola")).toBe(false);
    });

    it("isEmpty devuelve true cuando solo hay espacios", () => {
        expect(isEmpty("     ")).toBe(true);
    });

    it("clearInput limpia el contenido del input", () => {

        const input = {
            value: "Mensaje de prueba"
        };

        clearInput(input);

        expect(input.value).toBe("");

    });

});