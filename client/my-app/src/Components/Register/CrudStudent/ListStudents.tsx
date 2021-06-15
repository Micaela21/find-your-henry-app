import React from 'react';
import { Alumn, Alumns } from '../../../types/Alumns';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import LogoF from '../../Catalogue/Images/avatarF.png';
import LogoM from '../../Catalogue/Images/avatarM.png';

type StudentProps = {
    key: string;
    alumno: Alumn;
};

const ELIMINAR_ALUMNO = gql`
    mutation alumnodelete($id: ID) {
        borrarAlumno(_id: $id) {
            name
            surname
        }
    }
`;
const QUERY = gql`
    query obtenerAlumnos {
        alumnos {
            name
            surname
            picture
            email
            gender
            _id
        }
    }
`;

const ListStudents: React.FC<StudentProps> = ({ alumno }) => {
    const { _id, name, surname, picture, email, gender } = alumno;
    const [borrarAlumno] = useMutation(ELIMINAR_ALUMNO, {
        update(cache) {
            const alumnos = cache.readQuery<Alumns>({
                query: QUERY
            })!.alumnos;
            cache.writeQuery({
                query: QUERY,
                data: {
                    // alumnos tiene que ser parte del cache de apollo
                    alumnos: alumnos.filter(
                        (alumno1: Alumn) => alumno1._id !== _id
                    )
                }
            });
        }
    });

    const confirmarEliminarAlumno = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009b00',
            cancelButtonColor: '#990000',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await borrarAlumno({
                        variables: {
                            id: _id
                        }
                    });
                    Swal.fire('Deleted!', data.borrarAlumno.name, 'success');
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };
    return (
        <tr key={_id}>
            <td className="px-3 py-3 border-b border-grayHenry bg-yellow_henry text-base">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a className="block relative">
                            {picture ? (
                                <img
                                    alt="profil"
                                    src={picture}
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                            ) : (
                                <img
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                    alt="Testimonial avatar"
                                    src={gender === 'femenino' ? LogoF : LogoM}
                                />
                            )}
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-grayHenry whitespace-no-wrap">
                            {name} {surname}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-3 py-3 border-b border-grayHenry bg-yellow_henry text-base">
                <p className="text-grayHenry whitespace-no-wrap">{email}</p>
            </td>
            <td className="px-5 py-3 border-b border-grayHenry bg-yellow_henry text-base">
                <button
                    onClick={() => confirmarEliminarAlumno()}
                    className="relative inline-block px-3 py-1 font-semibold text-grayHenry leading-tight hover:bg-grayHenry hover:text-white border-grayHenry rounded-full focus:outline-none">
                    <span className="relative inline-block px-5 py-1 font-semibold leading-tight">
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 opacity-50 rounded-full"></span>
                        <span className="relative">
                            <i className="fas fa-trash"></i>
                        </span>
                    </span>
                </button>
            </td>
        </tr>
    );
};
export default ListStudents;
