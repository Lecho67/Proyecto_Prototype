
import './Login.css'
import 'boxicons'
import { useForm } from '../../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/auth/Thunks';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Login = () =>{
    const dispatch = useDispatch();
    const {email,password,formState,onInputChange,onResetForm} = useForm({email:'',password:''})
    const navigate = useNavigate();
    const onSubmitForm = (evt) => {
        evt.preventDefault();
        console.log(formState)
        dispatch(loginUser(email, password))
        onResetForm();
        const lastPath = localStorage.getItem('lastPath') || '/';
        navigate(lastPath, {replace:true})
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
                            Recuerdame
                        </label>

                        <a href="#">Olvide mi contraseña</a>
                    </div>

                    <button className='btnLogin'>Iniciar Sesión</button>

                    <div className="register">
                        <p>
                            ¿No tienes cuenta?
                            <Link to="/register">Registrate</Link>
                        </p>
                    </div>
                </form>

            </div>

            <div className='loginGoHome'> <Link to="/">Volver a la pagina de inicio</Link></div>

        </div>
        </>
    )
}