import { useNavigate } from "react-router-dom"

function NotFound() {

    const navigate = useNavigate()

    return(
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Page not found!</p>
            </header>
            <main>
                <button className="signOutButton"
                
                 onClick={() => navigate('/sign-in')}>
                    Return to sign-in</button>
            </main>
        </div>

    )
}

export default NotFound