import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Recruiter } from '../../../types/Recruiters';
import RecruiterC from './RecruiterC';

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

const ListRecruiter: React.FC = () => {
    const { data, loading } = useQuery(QUERY);
    return (
        <div className="flex justify-center self-center items-center mx-20">
            {loading ? (
                <div>loading...</div>
            ) : (
                <div className="py-5">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                        <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead className="bg-yellow_henry">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-yellow_henry border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            Recruiter
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-yellow_henry border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-yellow_henry border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-yellow_henry border-b border-grayHenry text-grayHenry text-left text-xl uppercase font-semibold">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.empresas.map(
                                            (recruiter: Recruiter) => (
                                                <RecruiterC
                                                    key={recruiter._id}
                                                    recruiter={recruiter}
                                                />
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListRecruiter;
