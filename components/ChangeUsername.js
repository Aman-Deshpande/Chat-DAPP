import { useMoralis } from "react-moralis"

function ChangeUsername() {

    const {setUserData, isUserUpdating, userError, user} = useMoralis();
    const setUserName = ()=>{
        const username = prompt(`Enter your new Username: ${user.getUsername()}`);

        if(!username) return;

        setUserData({
            username,
        })
    }

    return (
        <div className="text-sm absolute top-5 right-5 ">
            <button disabled={isUserUpdating} onClick={setUserName} className="hover:text-pink-600">Change your Username</button>
        </div>
    )
}

export default ChangeUsername;
