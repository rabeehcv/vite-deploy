import React from 'react';

const List = ({people}) => {
    return (
        <>
            {
                people.map((person) => {
                    const {id,name,age} = person;
                    return (
                        <article key="id" className="person">
                            <h4>{name}</h4>
                            <p>{age} years</p>
                        </article>
                    );
                }
                )
            }
        </>
    );
};

export default List;