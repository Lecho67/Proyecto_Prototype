
import './Login.css'
import 'boxicons'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/auth/Thunks';
import { useForm } from '../../Hooks/useForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const Registro = () =>{

    const dispatch = useDispatch();
    const {email,password,onInputChange,onResetForm,formState} = useForm({email:'',password:''})

    const navigate = useNavigate();


    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log(formState)
        dispatch(registerUser(email, password))
        onResetForm();
        const lastPath = localStorage.getItem('lastPath') || '/';
        navigate(lastPath, {replace:true})
    }


    return (
        <>
        <div className="loginPage">

            <div className="wrapperLogin">

                <form action="" onSubmit={(evt) => onSubmit(evt)}>
                    <h1>Registro</h1>
                    <div className="input-box">
                        <input type="email" placeholder='Email' value={email} name='email' onChange={(evt) => onInputChange(evt)} required  />
                        <box-icon type='solid' name='user'></box-icon>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' value={password} name='password' onChange={(evt) => onInputChange(evt)} required />
                        <box-icon type='solid' name='lock-alt'></box-icon>
                    </div>

                    <button className='btnLogin'>Registrarme</button>

                    <div className="register">
                        <p>
                            ¿Ya tienes una cuenta?
                            <Link to="/login">Iniciar Sesión</Link>
                        </p>
                    </div>
                </form>

            </div>
            <div className='loginGoHome'> <Link to="/">Volver a la pagina de inicio</Link></div>
        </div>
        </>
    )
}