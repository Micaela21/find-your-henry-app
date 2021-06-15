import React from 'react';
import { Recruiter, Company } from '../../../types/Recruiters';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import ShowMore from 'react-show-more';

type RecruiterProps = {
    key: string;
    recruiter: Recruiter;
};

const QUERY = gql`
    query empresas {
        empresas {
            name
            email
            description
            picture
            _id
        }
    }
`;

const DELETE_RECRUITER = gql`
    mutation empresa($id: ID) {
        borrarEmpresa(_id: $id) {
            name
            email
            description
            picture
            _id
        }
    }
`;

const RecruiterC: React.FC<RecruiterProps> = ({ recruiter }) => {
    const { name, email, description, _id } = recruiter;

    const [borrarEmpresa] = useMutation(DELETE_RECRUITER, {
        update(cache) {
            const empresas = cache.readQuery<Company>({
                query: QUERY
            })!.empresas;
            cache.writeQuery({
                query: QUERY,
                data: {
                    empresas: empresas.filter(
                        (recruiter: Recruiter) => recruiter._id !== _id
                    )
                }
            });
        }
    });

    const deleRecruiter = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009b00',
            cancelButtonColor: '#990000',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, Cancel'
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const { data } = await borrarEmpresa({
                        variables: {
                            id
                        }
                    });
                    Swal.fire(
                        'Deleted!',
                        'Recruiter has been deleted.',
                        'success'
                    );
                }
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-grayHenry bg-yellow_henry text-base">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-grayHenry whitespace-no-wrap">
                            {name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-grayHenry bg-yellow_henry text-base">
                <p className="text-grayHenry whitespace-no-wrap">{email}</p>
            </td>
            <td className="px-5 py-5 border-b border-grayHenry bg-yellow_henry text-base">
                <p className="text-grayHenry whitespace-no-wrap">
                    <ShowMore
                        lines={3}
                        more="Show more"
                        less="Show less"
                        anchorClass="text-black">
                        {description}
                    </ShowMore>
                </p>
            </td>
            <td className="px-5 py-5 border-b border-grayHenry bg-yellow_henry text-base">
                <button
                    onClick={() => deleRecruiter(_id)}
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

export default RecruiterC;
