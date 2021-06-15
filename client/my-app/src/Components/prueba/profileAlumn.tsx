import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Portfolio from './portfolio';

const QUERY = gql`
    query alumno($id: ID) {
        alumno(_id: $id) {
            _id
            name
            surname
            picture
            email
            Birthdate
            description
            ExtraAbilities
            abilities
            country
            location
            phone
            gender
            experience {
                _id
                description
                timeLapse
            }
            education {
                _id
                description
                timeLapse
            }
        }
    }
`;
const Perfil: React.FC = () => {
    const id = '605de70968428f37fc1e06a1';
    const { data, loading } = useQuery(QUERY, {
        variables: {
            id
        }
    });

    if (loading) return <p>cargando</p>;
    const { alumno } = data;
    console.log(alumno);

    return (
        <>
            <main className="profile-page">
                <section className="relative block" style={{ height: '500px' }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover bg-gray-600"
                        style={{
                            backgroundImage:
                                'url(' +
                                'https://data.1freewallpapers.com/detail/code-programming-text-strings-multicolored.jpg' +
                                ')'
                        }}>
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                        style={{ height: '70px' }}>
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0">
                            <polygon
                                className="text-gray-300 fill-current"
                                points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-gray-300">
                    <div className="container mx-auto px-4  bg-gray-700">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 bg-gray-700">
                            <div className="px-6">
                                <div className=" shadow-lg mt-10  grid grid-cols-2 gap-4  px-8 py-4 mx-auto bg-gray-800 rounded-lg shadow-lg dark:bg-gray-800">
                                    <div>
                                        <div>
                                            {' '}
                                            <img
                                                alt="..."
                                                src={
                                                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                                                }
                                                className=" float-left shadow-xl rounded-full border-solid border-4 border-yellow_henry mt-15 mr-2 "
                                                style={{
                                                    maxWidth: '150px'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                <h3 className=" text-white text-2xl  inline-block font-semibold  ">
                                                    Nombre y Apellido
                                                </h3>
                                            </div>
                                            <div className=" text-white ml-3  text-1xl font-semibold leading-normal ">
                                                Location
                                            </div>
                                            <div className="ml-3   text-white text-1xl font-semibold leading-normal">
                                                Idiomas
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="inline-block  mt-1 ">
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className=" ml-2 focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>
                                                </div>
                                                <div className="inline-block -ml-20 mt-1 "></div>
                                                <div className="inline-block  mt-1">
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className=" ml-2 focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>
                                                </div>
                                                <div className="inline-block -ml-20 mt-1"></div>
                                                <div className="inline-block  mt-1">
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className=" ml-2 focus:outline-none text-yellow_henry text-sm py-1.2 px-2.5 rounded-md border border-yellow_henry ">
                                                        Warning
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-semibold leading-normal mb-2 text-white mb-2 text-center">
                                            <i className="far fa-address-card "></i>{' '}
                                            About me
                                        </div>
                                        <div className=" text-center text-white  text-1xl font-semibold leading-normal mt-4">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in
                                            reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla
                                            pariatur.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 py-10 border-t border-white text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <Portfolio />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-white text-center">
                                    <section className="blog text-gray-700 body-font">
                                        <div className="container px-5  mx-auto">
                                            <div className=" text-4xl font-semibold leading-normal  text-white mb-16 text-center">
                                                <i className="fas fa-atom"></i>{' '}
                                                My proyects
                                            </div>
                                            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                                                <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
                                                    <div
                                                        className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                                                        style={{
                                                            backgroundImage:
                                                                'url(' +
                                                                'https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80' +
                                                                ')'
                                                        }}></div>

                                                    <div className=" w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                                                        <div className="header-content inline-flex ">
                                                            <div className="category-badge flex-1  h-4 w-4 m rounded-full m-1 bg-purple-100">
                                                                <div className="h-2 w-2 rounded-full m-1 bg-purple-500 "></div>
                                                            </div>
                                                            <div className="category-title flex-1 text-sm">
                                                                {' '}
                                                                PHP
                                                            </div>
                                                        </div>
                                                        <div className="title-post font-medium">
                                                            Mon titre
                                                        </div>

                                                        <div className="summary-post text-base text-justify">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Perspiciatis
                                                            veritatis vel
                                                            suscipit ex dolore
                                                            possimus iure.
                                                        </div>
                                                        <button
                                                            className="mt-4 bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button">
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
                                                    <div
                                                        className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                                                        style={{
                                                            backgroundImage:
                                                                'url(' +
                                                                'https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80' +
                                                                ')'
                                                        }}></div>

                                                    <div className=" w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                                                        <div className="header-content inline-flex ">
                                                            <div className="category-badge flex-1  h-4 w-4 m rounded-full m-1 bg-yellow-100">
                                                                <div className="h-2 w-2 rounded-full m-1 bg-yellow-500 "></div>
                                                            </div>
                                                            <div className="category-title flex-1 text-sm">
                                                                {' '}
                                                                JS
                                                            </div>
                                                        </div>
                                                        <div className="title-post font-medium">
                                                            Mon titre
                                                        </div>

                                                        <div className="summary-post text-base text-justify">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Perspiciatis
                                                            veritatis vel
                                                            suscipit ex dolore
                                                            possimus iure.
                                                        </div>
                                                        <button
                                                            className="mt-4 bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button">
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
                                                    <div
                                                        className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                                                        style={{
                                                            backgroundImage:
                                                                'url(' +
                                                                'https://images.unsplash.com/photo-1590608897129-79da98d15969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80' +
                                                                ')'
                                                        }}></div>

                                                    <div className=" w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                                                        <div className="header-content inline-flex ">
                                                            <div className="category-badge flex-1  h-4 w-4 m rounded-full m-1 bg-green-100">
                                                                <div className="h-2 w-2 rounded-full m-1 bg-green-500 "></div>
                                                            </div>
                                                            <div className="category-title flex-1 text-sm">
                                                                {' '}
                                                                Vue
                                                            </div>
                                                        </div>
                                                        <div className="title-post font-medium">
                                                            Mon titre
                                                        </div>

                                                        <div className="summary-post text-base text-justify">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Perspiciatis
                                                            veritatis vel
                                                            suscipit ex dolore
                                                            possimus iure.
                                                        </div>
                                                        <button
                                                            className="mt-4 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button">
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-900 text-center">
                                    <form
                                        id="contact-me"
                                        className="w-full mx-auto max-w-3xl bg-yellow-400 shadow p-8 text-gray-700 ">
                                        <h2 className="w-full my-2 text-3xl font-bold leading-tight my-5">
                                            Contact me!
                                        </h2>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="relative w-full appearance-none label-floating">
                                                <input
                                                    className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Your name"
                                                    required
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">
                                                    Your name
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="relative w-full appearance-none label-floating">
                                                <input
                                                    className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Your email"
                                                    required
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">
                                                    Your email
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="relative w-full appearance-none label-floating">
                                                <textarea
                                                    className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="message"
                                                    placeholder="Message..."></textarea>
                                                <label
                                                    htmlFor="message"
                                                    className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">
                                                    Message...
                                                </label>
                                            </div>
                                        </div>

                                        <div className="">
                                            <button
                                                className="w-full shadow bg-gray-700 hover:bg-gray-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                type="submit">
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Perfil;
