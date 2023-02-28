import { useSelector } from "react-redux"

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    console.log(user)
    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    {user.name}'s InvoiceMe Profile
                </p>
            </header>
            
        </div>
    )
}

export default Profile