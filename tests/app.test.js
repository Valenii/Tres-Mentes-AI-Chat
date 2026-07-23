import { describe, it, expect } from "vitest";
import { CHARACTERS } from "../src/characters.js";

describe("Characters", () => {

    it("existen tres personajes", () => {
        expect(Object.keys(CHARACTERS).length).toBe(3);
    });

    it("Ash tiene nombre", () => {
        expect(CHARACTERS.Ash.name).toBe("Ash");
    });

    it("Mime tiene una imagen", () => {
        expect(CHARACTERS.Mime.image).toContain("mime.png");
    });

    it("Sabia tiene descripción", () => {
        expect(CHARACTERS.Sabia.description.length).toBeGreaterThan(20);
    });

});