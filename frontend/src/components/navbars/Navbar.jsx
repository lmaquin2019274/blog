import { useNavigate } from "react-router-dom";
import logo from '../../assets/logoMini.png'
import { useUserDetails } from '../../shared/hooks'

const NavLogo = () => {
    return(
        <div className="nav-logo-container">
            <img
                className="nav-logo"
                width='100%'
                height='100%'
                src={logo}
                alt="Logo"
            />
        </div>
    )
}

const NavButton = ({ text, onClickHandler }) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails()

    const navigate = useNavigate()

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleNavigateToSettingPage = () => {
        navigate('/settings')
    }

    const handleNavigateToHotelsPage = () => {
        navigate('/hotel')
    }

    const handleNavigateToRoomsPage = () => {
        navigate('/room')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="nav-container">
            <NavLogo/>
            <div className="nav-buttons-container">
                {!isLogged ? (
                    <NavButton text='Log in' onClickHandler={handleNavigateToAuthPage}/>
                ) : (
                    <div>
                        <NavButton text='My account' onClickHandler={handleNavigateToSettingPage}/>
                        <NavButton text='Log out' onClickHandler={handleLogout}/>
                    </div>
                )}
            </div>
        </div>
    )
}