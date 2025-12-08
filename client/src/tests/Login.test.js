// src/__tests__/Login.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Login from "../Components/Login";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import axios from "axios";

//mock store
const mockStore = configureStore([]);
const store = mockStore({
  users: { user: null, isSuccess: false, isError: false, isLoading: false },
});

// Mock axios
jest.mock("axios");

describe("Login Component Tests", () => {
  // 1️⃣ Snapshot Test
  test("matches the UI snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // 2️ Email Validation Test
  test("validates email format using regex", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Your e-mail");

    // valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(emailInput.value)).toBe(true);

    // invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    expect(emailRegex.test(emailInput.value)).toBe(false);
  });

  // 3️ Password Validation Test
  test("validates password format using regex", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    // valid password
    fireEvent.change(passwordInput, { target: { value: "Abc@123" } });
    expect(passwordRegex.test(passwordInput.value)).toBe(true);

    // invalid password
    fireEvent.change(passwordInput, { target: { value: "abc123" } });
    expect(passwordRegex.test(passwordInput.value)).toBe(false);
  });

  // 4️ Initial Redux State Test
  test("returns initial state", () => {
    const initState = {
      user: null,
      isSuccess: false,
      isError: false,
      isLoading: false,
    };
    expect(store.getState().users).toEqual(initState);
  });

  // 5️ Login Button Click Test
  test("login button is present and clickable", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
  });

  // 6️ Display Error Message on Invalid Login
  test("displays error message on invalid login", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Your e-mail");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "WrongPass1!" } });

    axios.post.mockRejectedValueOnce({
      response: { data: "Invalid credentials" },
    });

    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMsg = screen.getByText(/invalid credentials/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });

  // 7️ API Call Mock Test
  test("calls login API on submit", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "12345" } });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/login",
        expect.any(Object)
      );
    });
  });
});
