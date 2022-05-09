import { useState, useContext } from 'react'
import { createUser } from '../../context/userContext/apiCalls'
import { UserContext } from '../../context/userContext/UserContext'
import './newUser.scss'

const NewUser = () => {

    const [user, setUser] = useState(null)
    const { dispatch } = useContext(UserContext)

    const handleChange = (e) => {
        const value = e.target.value
        setUser({ ...user, [e.target.name]: value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        createUser(user, dispatch)
    }

    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        onChange={handleChange} 
                        placeholder="john" 
                    />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="john@gmail.com" 
                    />
                </div>

                <div className="newUserItem">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password" 
                        onChange={handleChange} 
                        placeholder="password" 
                    />
                </div>

           
                <button className="newUserButton" onClick={handleSubmit}>Create</button>

            </form>
        </div>
    )
}

export default NewUser