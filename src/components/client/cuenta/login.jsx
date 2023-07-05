import { useState } from 'react'


export default function Login({ login, setIsLoading, handleGoogle, handleFacebook }) {
    // Hooks Log In
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleLogin = async e => {
        e.preventDefault()
        await login(email, password)
        setIsLoading(true)
    }

    return (
        <article>
            <div className='flex flex-col  mt-8'>
                <h2 className='font-semibold text-3xl '>Iniciar sesión en MdpCuts</h2>
                <div className='flex flex-col lg:flex-row gap-10 py-10 items-center'>
                    <button
                        onClick={handleGoogle}
                        className='
                     w-[328px] bg-white border border-zinc-800 rounded-xl py-4 px-[10px] 
                     flex items-center justify-center gap-x-2 font-semibold text-base
                     '
                    >
                        <img src="https://i.ibb.co/bsKnZYq/buscar.png" alt="Logo google" />
                        Iniciar sesion con Google
                    </button>
                    <button
                        onClick={handleFacebook}
                        className='
                     w-[328px] bg-[#1e1e1e] border border-zinc-800 rounded-xl py-4 px-[10px]  
                     flex items-center justify-center gap-x-2 font-semibold text-base text-white'
                    >
                        <img src="https://i.ibb.co/ckD2sLT/facebook.png" alt="Logo Facebook" />
                        Iniciar sesion con Facebook
                    </button>
                </div>
                <div className='w-full flex justify-center items-center gap-x-2'>
                    <div className='w-[32px] border border-gray-400'></div>
                    <p className='text-2xl font-medium text-gray-400'>OR</p>
                    <div className='w-[32px] border border-gray-400'></div>
                </div>
            </div>

            <form
                onSubmit={handleLogin}
                
            >
               
                <div className='flex flex-col'>
                    
                    <div className="form__group  ">
                        <input
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            className="form__field"
                            placeholder="Input"
                            id='email'
                            required
                        />
                        <label className="form__label " htmlFor='email'>
                            Email
                        </label>
                    </div>
                    <div className="form__group  ">
                        <input
                            type={ showPassword ? 'text' : 'password'  }
                            id='contraseña'
                            onChange={e => setPassword(e.target.value)}
                            className="form__field"
                            placeholder="Input"
                            required
                        />
                        <label className="form__label " htmlFor="contraseña">
                            Contraseña
                        </label>
                        <p 
                            onClick={handleTogglePassword}
                            className='absolute top-5 text-lg text-gray-400 right-2'>
                                {
                                    showPassword 
                                    ? <ion-icon name="eye-sharp"></ion-icon>
                                    :<ion-icon name="eye-off-sharp"></ion-icon>
                                }
                        </p>
                    </div>
                    
                </div>
               
                <div className='flex justify-center mt-10'>
                    <input
                        type="submit"
                        value="Iniciar sesion"
                        className='
                        w-[292px] h-[52px] flex justify-center items-center py-4 px-[10px] 
                        bg-[#1E1E1E] text-white text-base font-bold rounded-xl mx-auto'
                    />
                </div>
            </form>
        </article>
    )
}
