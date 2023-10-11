import { loginForm } from "./CreateUser";

function sendDataToApi(data: loginForm) {
    console.log("Login user data has been submitted to the database")
}

export function submit(username: string, password: string, setErrorList: any) {
    const validationError: Partial<loginForm> = {};

    if (!username.trim()) {
        validationError.username = "Username requried!"
    }
    if (!password.trim()) {
        validationError.password = "Password requried!"
    }

    if (Object.keys(validationError).length > 0) {
        setErrorList(validationError);
    } else {
        sendDataToApi({username: username, password: password});
        setErrorList({});
    }
}