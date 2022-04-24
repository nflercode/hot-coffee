import React from "react";
import { StartPage } from "../start-page";
import { render, screen, fireEvent } from "@testing-library/react";
import { UnitTestHarness } from "../../../components/unit-test-harness/unit-test-harness";
describe("Start-page", () => {
    const defaultChipData = {
        type: "BLUE",
        value: 1337,
        amount: 666
    };

    const authenticatedFakeState = {
        auth: {
            coolAuthStuff: "This is so cool",
            authToken: { token: `It wasn't that cool` }
        }
    };

    const unAuthenticatedState = {
        auth: {
            coolAuthStuff: "This is so cool",
            authToken: {}
        }
    };

    it("Should show correct start page when authenticatd", () => {
        render(
            <UnitTestHarness store={authenticatedFakeState}>
                <StartPage />
            </UnitTestHarness>
        );

        expect(
            screen.getByTestId("qa-startpage-authenticated-message").textContent
        ).toBe(
            "It seems like you are in a lobby alread, do you want to join it again?"
        );

        expect(
            screen.getByTestId("qa-startpage-authenticated-toLobby").textContent
        ).toBe("To lobby");

        expect(
            screen.getByTestId("qa-startpage-authenticated-leave").textContent
        ).toBe("Leave lobby");

        // TODO: Write tests for onClick
    });

    it("Should show correct start page when not authenticatd", () => {
        render(
            <UnitTestHarness store={unAuthenticatedState}>
                <StartPage />
            </UnitTestHarness>
        );

        expect(screen.getByTestId("qa-startpage-new-player").textContent).toBe(
            "Create a tableInvite friendsPlay and we’ll keep count of chips"
        );

        expect(document.querySelector(".snackbar-container").textContent).toBe(
            "Mychips.online[alpha]The web app is still under development, but you are of course welcome to test it out!Sure!"
        );
        // TODO: Write tests for onClick
    });
});
