import { Item } from "@app/common/types";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { addItem, deleteItem, updateItem } from "../actionCreators/itemsActions";
import { InitialState, itemsReducer } from "./itemsReducer";

let state: InitialState;
let user1: Item;
let user2: Item;
let user22: Item;
let user3: Item;

beforeEach(() => {
    user1 = {
        id: "1",
        firstName: "Oleksii",
        lastName: "Ivanov",
        email: "hello@gmail.com",
    };
    user2 = {
        id: "2",
        firstName: "Igor",
        lastName: "Petrov",
        email: "buy@gmail.com",
    };
    user22 = {
        id: "2",
        firstName: "Igor",
        lastName: "Sidorov",
        email: "buy@gmail.com",
    };
    
    user3 = {
        id: "3",
        firstName: "Igor",
        lastName: "Petrov",
        email: "buy@gmail.com",
    };

    state = {
        items: [user1, user2],
        activeItem: undefined,
      }

});

describe("Items reducer tests", () => {
    it("Delete Item", () => {
        const newState = itemsReducer(state, deleteItem("1"));
        expect(newState.items).toHaveLength(1);
    });
    it("Add Item", () => {
        const newState = itemsReducer(state, addItem(user3));
        expect(newState.items).toHaveLength(3);
    });
    it("Upadte Item", () => {
        const newState = itemsReducer(state, updateItem(user22));
        expect(newState.items
            .find((i: Item) => i.id === user22.id).lastName).toEqual('Sidorov');
    });
});