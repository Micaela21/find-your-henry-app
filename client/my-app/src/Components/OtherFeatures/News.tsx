import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

type FormElement = React.FormEvent<HTMLFormElement>;

const AGREGAR_NOTICIA = gql`
    mutation agregarNews($description: String!) {
        agregarNews(news: { description: $description }) {
            _id
            description
        }
    }
`;

const ELIMINAR_NOTICIA = gql`
    mutation($id: ID) {
        borrarNews(_id: $id) {
            _id
            description
        }
    }
`;
const MODIFICAR_NOTICIA = gql`
    mutation($id: ID, $description: NewsInput) {
        modificarNews(_id: $id, description: $description) {
            _id
            description
        }
    }
`;

const QUERY = gql`
    query news {
        news {
            _id
            description
        }
    }
`;

const News = (): JSX.Element => {
    interface INews {
        description: string;
    }

    const [agregarNews] = useMutation(AGREGAR_NOTICIA);
    const [borrarNews] = useMutation(ELIMINAR_NOTICIA);
    const [modificarNews] = useMutation(MODIFICAR_NOTICIA);
    const { data } = useQuery(QUERY);
    const [nuevaNoticia, setNuevaNoticia] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [editNew, setEditNew] = useState<any>({ text: '', id: '' });

    //Se agregan Noticias
    const handleSubmit = async (e: FormElement) => {
        e.preventDefault();
        try {
            await agregarNews({
                variables: {
                    description: nuevaNoticia
                },
                update: async (cache) => {
                    const news: any = await cache.readQuery({
                        query: QUERY
                    });
                    cache.writeQuery({
                        query: QUERY,
                        data: {
                            news: news.news
                        }
                    });
                }
            });
        } catch {
            console.log('error');
        }
        alert('You have posted successfully');
        setNuevaNoticia('');
    };

    //Se eliminan Noticias
    const onDelete = async (id: string) => {
        try {
            await borrarNews({
                variables: {
                    id: id
                },
                update: async (cache) => {
                    const news: any = await cache.readQuery({
                        query: QUERY
                    });
                    cache.writeQuery({
                        query: QUERY,
                        data: {
                            news: news.news.filter(
                                (news: any) => news._id !== id
                            )
                        }
                    });
                }
            });
        } catch {
            console.log('error2');
        }
    };

    const onEdit = async () => {
        try {
            await modificarNews({
                variables: {
                    id: editNew.id,
                    description: {
                        description: editNew.text
                    }
                }
            });
        } catch {
            console.log('error2');
        }
    };

    return (
        <div className="grid grid-cols-2 bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0">
            <div className="col-start-1 col-end-2 flex flex-col p-5">
                <div className="bg-yellow_henry p-5 rounded-lg w-full">
                    <form onSubmit={handleSubmit}>
                        <label className="text-lg text-grayHenry font-medium">
                            News Form
                            <textarea
                                onChange={(e) =>
                                    setNuevaNoticia(e.target.value)
                                }
                                value={nuevaNoticia}
                                placeholder="Discribe your announcement"
                                className="my-5 h-52 bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </label>
                        <button className="w-auto p-4 float-right rounded-full bg-grayHenry text-white hover:bg-gray-600 focus:outline-none focus:bg-yellow_henry focus:text-black active:bg-yellow_henry">
                            Create Post
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-start-2 col-end-3 flex flex-col overflow-hidden p-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
                        <div className=" overflow-hidden  sm:rounded-lg">
                            <table className="min-w-full divide-y divide-grayHenry">
                                <thead className="bg-yellow_henry">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-lg font-medium text-grayHenry tracking-wider">
                                            News
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3">
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3">
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-yellow_henry divide-y divide-grayHenry">
                                    {data?.news.map(
                                        (obj: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-base text-grayHenry">
                                                                    {
                                                                        obj.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            className="text-grayHenry text-lg hover:text-indigo-900 focus:outline-none"
                                                            onClick={() => {
                                                                setOpen(true);
                                                                setEditNew({
                                                                    id: obj._id,
                                                                    text:
                                                                        obj.description
                                                                });
                                                            }}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            className="text-grayHenry text-lg hover:text-indigo-900 focus:outline-none"
                                                            onClick={() =>
                                                                onDelete(
                                                                    obj._id
                                                                )
                                                            }>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {open ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="relative p-6 flex-auto flex-col justify-center self-center ">
                                    <form className="flex flex-col justify-center">
                                        <h3 className="mb-5 text-2xl text-white font-bold border-b border-yellow_henry pb-5">
                                            Edit the new
                                        </h3>
                                        <div className="mt-5 flex flex-col">
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={editNew.text}
                                                onChange={(e) =>
                                                    setEditNew({
                                                        ...editNew,
                                                        text: e.target.value
                                                    })
                                                }
                                                className="h-48 rounded p-5 focus:outline-none opacity-50"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end border-solid border-yellow_henry rounded-b mt-5">
                                            <button
                                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                                                onClick={onEdit}
                                                style={{
                                                    transition: 'all .15s ease'
                                                }}>
                                                SAVE CHANGE
                                            </button>
                                            <button
                                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{
                                                    transition: 'all .15s ease'
                                                }}
                                                onClick={() => setOpen(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null}
        </div>
    );
};

export default News;
