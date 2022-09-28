import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
 
export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const [characterCount, setCharacterCount] = useState(0);
 
    const updateCharacterCount = (e) => {
        setCharacterCount(e.target.value.length);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout 
          auth={auth}
          header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Chirps</h2>}
        >
            <Head title="Chirps" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => { setData('message', e.target.value); updateCharacterCount(e)} }
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <div className="flex justify-between items-center">
                        <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                        <small className="text-xs text-gray-500 flex space-x-2">
                          <span>{ characterCount }</span>
                          <span>/</span>
                          <span>255</span>
                        </small>
                    </div>
                    
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}