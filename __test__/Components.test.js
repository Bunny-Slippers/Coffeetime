const path = require("path");
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../client/src/components/Login";

describe("Log in ", () => {
  beforeAll((done) => {
    render(<Login components />);
  });

  afterAll((done) => {});

  describe("Component elements", () => {
    it('login page contains 2 fields with name value to "username","password" and a button', () => {
      expect(screen.getByLabelText("Username")).toBeDefined();
      expect(screen.getByLabelText("Password")).toBeDefined();
      expect(screen.getByRole("button")).toBeDefined();
    });

    xit("username field should work when typing", async () => {
      const user = userEvent.setup();
      let userNameinput = screen.getByLabelText("Username");
      await user.click(userNameinput);
      await user.keyboard("john");
      userNameinput.toHaveTextContent("john");
    });

    xit("password component state should update when user typing in field", () => {});
    xit("type of password and username must be strings", () => {});

    xit("returns an error if password is wrong", () => {});

    xit("returns an error when location value is not a string", () => {});

    xit("returns an error when cards value is not a number", () => {});
  });

  // Extension TODO: Unit test the #find and #drop functions
  //   describe("#find", () => {
  //     xit("returns list of all markets from the json file", () => {});

  //     xit("works if the list of markets is empty", () => {});
  //   });

  //   describe("#drop", () => {
  //     xit("writes an empty array to the json file", () => {});
  //   });
});
