import { useState } from "react"
import { submit } from "./createUserUtils";

export interface loginForm {
    username: string;
    password: string;
}

export default function CreateUser() {
    const [formData, setFormData] = useState<loginForm>({
        username: "",
        password: "",
    })
    const [errorList, setErrorList] = useState<Partial<loginForm>>({});

    function handleSubmit() {
        //setFormData({username, password,})
        console.log(formData.username, formData.password, setErrorList);
        submit(formData.username, formData.password, setErrorList);
    }

    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}} name="userCreate-form">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}></input>
            <label htmlFor="password">Password:</label>
            <input id="password" type="text" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}></input>
            <button type="submit">Create</button>
        </form>
    )
}