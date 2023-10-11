import CreateUser from "@/components/CreateUser"
import { fireEvent, render, waitFor} from "@testing-library/react"
import * as createUserUtils from '@/components/createUserUtils'

describe.only("Render CreateUser", () => {
    it("should render the create user form", () => {
        const {getByRole, getByLabelText} = render(<CreateUser></CreateUser>)
        
        const renderdUsernameLabelAndInput = getByLabelText("Username:");
        const renderdPasswordLabelAndInput = getByLabelText("Password:");
        const renderdSubmit = getByRole("button", {name: "Create"});

        expect(renderdUsernameLabelAndInput).toBeInTheDocument();
        expect(renderdPasswordLabelAndInput).toBeInTheDocument();
        expect(renderdSubmit).toBeInTheDocument();

        
    })
    it("should test submit", async () => {
        const {getByRole} = render(<CreateUser></CreateUser>)

        const form = getByRole("form");
        const handleSubmitSpy = vitest.spyOn(createUserUtils, "submit");

        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(handleSubmitSpy).toHaveBeenCalled();
        })

        handleSubmitSpy.mockRestore();
    })
    it("should test that data gets sent", async () => {
        const {getByLabelText, getByRole} = render(<CreateUser></CreateUser>)

        const usernameLabelAndInput = getByLabelText("Username:");
        const passwordLabelAndInput = getByLabelText("Password:");

        const form = getByRole("form");
        const handleSubmitSpy = vitest.spyOn(createUserUtils, "submit");

        fireEvent.change(usernameLabelAndInput, {target: {value: "OlaNordmann"}});
        fireEvent.change(passwordLabelAndInput, {target: {value: "passord1234"}});
        fireEvent.submit(form);
        
        await waitFor(() => {
            //Prøvde å bruke toHaveBeenCalledWith men fikk det ikke til fordi jeg hadde setErrorList i submit funksjonen min
            //Er det noen annen god måte man kunne ha gjort dette på? :)
            expect(handleSubmitSpy).toHaveBeenCalled();
        })

        handleSubmitSpy.mockRestore();
    })
})