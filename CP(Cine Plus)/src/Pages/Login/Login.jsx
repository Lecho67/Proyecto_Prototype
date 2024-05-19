
import './Login.css'
import 'boxicons'
import { useForm } from '../../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/auth/Thunks';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () =>{
    const dispatch = useDispatch();
    const {email,password,formState,onInputChange,onResetForm,onResetPasswd} = useForm({email:'',password:''})
    const navigate = useNavigate();

    const [error,setError] = useState(false);
    const onSubmitForm = async (evt) => {
        evt.preventDefault();
        try{
            
            await dispatch(loginUser(email, password));
            onResetForm();
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate(lastPath, {replace:true})
        }catch(e){
            setError(true)
            onResetPasswd();
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
                            Recuerdame
                        </label>

                        <a href="#">Olvide mi contraseña</a>
                    </div>
                    {error && <div className='loginErrorContainer'> <box-icon name='error-alt' animation='tada' color='red'></box-icon> <p>Email o contraseña incorrectos</p></div>}
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