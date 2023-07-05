import { Transition } from '@headlessui/react';
import { CircularProgress } from '@mui/material'
import { BeatLoader } from 'react-spinners';

export default function PantallaCargando({ isLoading }) {

    return (
        <Transition show={isLoading}>
            <div className="fixed z-[99] inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="w-64 h-64 text-white flex flex-col items-center justify-center">
                    <BeatLoader
                        color={'#1e1e1e'}
                        loading={isLoading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <div className="mt-4 font-bold text-lg text-[#1e1e1e]">Cargando...</div>
                </div>
            </div>
        </Transition>
    );
}

;
