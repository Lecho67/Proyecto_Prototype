import './Login.css'
import 'boxicons'
import { useForm } from '../../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { loginUser, loginGoogle } from '../../redux/slices/auth/Thunks';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleButton from 'react-google-button'

export const Login = () =>{
    const dispatch = useDispatch();
    const {email, password, formState, onInputChange, onResetForm, onResetPasswd} = useForm({email:'', password:''});
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorGoogle, setErrorGoogle] = useState(false);

    const onSubmitForm = async (evt) => {
        evt.preventDefault();
        try {
            await dispatch(loginUser(email, password));
            onResetForm();
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate(lastPath, {replace:true});
        } catch(e) {
            setError(true);
            onResetPasswd();
        }
    }

    const onGoogleLogin = async () => {
        try {
            await dispatch(loginGoogle());
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate(lastPath, {replace:true});
        } catch(e) {
            setErrorGoogle(true);
        }
    }

    return (
        <>
        <div className="loginPage">
            <div className="wrapperLogin">
                <form action="" onSubmit={(evt) => onSubmitForm(evt)}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder='Email' name='email' value={email} onChange={(evt) => onInputChange(evt)} required />
                        <box-icon type='solid' name='user'></box-icon>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' value={password} name='password' onChange={(evt) => onInputChange(evt)} required />
                        <box-icon type='solid' name='lock-alt'></box-icon>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Recuérdame
                        </label>
                        <Link href="#">Olvidé mi contraseña</Link>
                    </div>
                    {error && <div className='loginErrorContainer'> <box-icon name='error-alt' animation='tada' color='red'></box-icon> <p>Email o contraseña incorrectos</p></div>}
                    {errorGoogle && <div className='loginErrorContainer'> <box-icon name='error-alt' animation='tada' color='red'></box-icon> <p>Error al iniciar sesión con Google</p></div>}
                    <button className='btnLogin'>Iniciar Sesión</button>
                    <div className="btnGoogleContainer">
                        <GoogleButton className='btnGoogle' onClick={() => onGoogleLogin()} />
                    </div>
                    <div className="register">
                        <p>
                            ¿No tienes cuenta?
                            <Link to="/register">Regístrate</Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className='loginGoHome'> <Link to="/">Volver a la página de inicio</Link></div>
        </div>
        </>
    );
}
