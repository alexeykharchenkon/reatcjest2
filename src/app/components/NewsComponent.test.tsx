import { render, screen, act, findByText } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import axios from "axios";
import { NewsComponent } from "./NewsComponent";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>

const hits = [
    {
        objectID: '1',
        title: "Angular"
    },
    {
        objectID: '2',
        title: "React"
    }
];

describe("News Component", () => {
    it("fetch news from api", async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: {hits} }));
        const {getByRole, findAllByRole} = render(<NewsComponent/>);
        userEvent.click(getByRole("button"));
        const items = await findAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("fetch news from api", async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error()));
        const {getByRole, findByText} = render(<NewsComponent/>);
        userEvent.click(getByRole("button"));
        const message = await findByText(/Something went wrong/);
        expect(message).toBeInTheDocument();
    });

    it("fetch news from api", async () => {
        const promise = new Promise<any>((resolve, reject) => resolve({ data: { hits } }));
        mockedAxios.get.mockImplementationOnce(() => promise);
        const {getByRole, getAllByRole} = render(<NewsComponent/>);
        userEvent.click(getByRole("button"));
        await act(() => promise);
        expect(getAllByRole("listitem")).toHaveLength(2);
    });
});

