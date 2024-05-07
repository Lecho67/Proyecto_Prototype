
import './Login.css'
import 'boxicons'
export const Login = () =>{


    return (
        <>
        <div className="loginPage">

            <div className="wrapperLogin">

                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Email' required />
                        <box-icon type='solid' name='user'></box-icon>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' required />
                        <box-icon type='solid' name='lock-alt'></box-icon>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Recuerdame
                        </label>

                        <a href="#">Olvide mi contraseña</a>
                    </div>

                    <button>Iniciar Sesión</button>

                    <div className="register">
                        <p>
                            ¿No tienes cuenta?
                            <a href="#">Registrate</a>
                        </p>
                    </div>
                </form>

            </div>


        </div>
        </>
    )
}