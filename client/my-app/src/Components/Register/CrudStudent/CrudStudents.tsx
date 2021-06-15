import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Alumn } from '../../../types/Alumns';
import ListStudents from './ListStudents';

const QUERY = gql`
    query obtenerAlumnos {
        alumnos {
            name
            surname
            picture
            email
            _id
        }
    }
`;
const CrudStudents: React.FC = () => {
    const { data, loading } = useQuery(QUERY);
    console.log(data);
    return (
        <div className="flex justify-center self-center items-center mx-20">
            {loading ? (
                <div>loading...</div>
            ) : (
                <div className="py-5">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className=" min-w-full leading-normal">
                                <thead className="bg-yellow_henry">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!data
                                        ? null
                                        : data.alumnos.map((alumno: Alumn) => (
                                              <ListStudents
                                                  key={alumno._id}
                                                  alumno={alumno}
                                              />
                                          ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrudStudents;
