import { Item } from "@app/common/types";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { FormComponent } from "./FormComponent";

const item: Item = 
    {   
        id: '1',
        firstName: "Item 1",
        lastName: "1",
        email: '1'
    }

const addItem = jest.fn();
const updateItem = jest.fn();

describe('Form Component', () => {
    it('Form renders', () => {
        render(<FormComponent 
            addItem={addItem}
            updateItem={updateItem}
            activeItem={item}
        />);
        expect(screen.getByText(/Form/i)).toBeInTheDocument();
    });
    it('input is empty', () => {
        render(<FormComponent 
            addItem={addItem}
            updateItem={updateItem}
            activeItem={undefined}
        />);
        expect(screen.queryByPlaceholderText("Reacts")).toBeNull();
        
        userEvent.type(screen.getByTestId('first'), 'Reacts');
        expect(screen.queryByDisplayValue('Reacts')).toBeInTheDocument();   
    });

    it('typing in input', () => {
        render(<FormComponent 
            addItem={addItem}
            updateItem={updateItem}
            activeItem={undefined}
        />);
        fireEvent.change(screen.getByTestId('first'), {
            target: {value: "Reacts"},
        });

        expect(screen.queryByDisplayValue('Reacts')).toBeInTheDocument();

    });
});