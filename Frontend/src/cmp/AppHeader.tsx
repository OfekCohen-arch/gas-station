import { Link, NavLink, useNavigate } from "react-router-dom"
import { authService } from "../services/auth.service"

export function AppHeader(){
 const user = authService.getLoggedInUser()

 
    const navigate = useNavigate()

    const onLogout = () => {
        authService.logout()
        navigate('/')
    }

    return (
        <header className="app-header">
            <div className="header-content main-layout">
                <div className="logo" onClick={() => navigate('/')}>
                    <span className="icon">⛽</span>
                    <h1>GasStation<span>Pro</span></h1>
                </div>

                <nav className="main-nav">
                    {user?.isAdmin && <NavLink color="blue" to={`/admin/${user.id}`}>ניהול עובדים</NavLink>}
                   {user && <NavLink to={user.isAdmin ? `/shiftBoard`:`/worker/${user.id}`}>לוח משמרות</NavLink>}
                </nav>

                <div className="user-section">
                    {user ? (
                        <div className="user-info">
                            <div className="user-details">
                                <span className="user-name">{user.firstName} {user.lastName}</span>
                                <span className="station-name">{user.stationName || 'תחנת דלק'}</span>
                            </div>
                            <button className="logout-btn" onClick={onLogout}>התנתק</button>
                        </div>
                    ) : (
                        <Link className="login-link" to="/">התחברות</Link>
                    )}
                </div>
            </div>
            </header>)
}