import React from 'react'
import './style.css'

export const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    const prevPage = (page) => {
        if (page > 1) {
            setCurrentPage(page - 1)
        }
    }
    const nextPage = (page) => {
        if (page < Math.ceil(totalPosts / postsPerPage)) {
            setCurrentPage(page + 1)
        }
    }

    return (
        <div className='pagination-container'>
            <div className='pagination-button' onClick={() => prevPage(currentPage)}>
                <div className='pagination-text'>Prev</div>
            </div>
            {
                pages.map((page, index) => {
                    return (
                        <div key={index} className={`pagination-page ${currentPage === page ? ' active' : null}`} onClick={() => setCurrentPage(page)}>
                            <div className='pagination-text'>{page}</div>
                        </div>
                    )
                })
            }
            <div className='pagination-button' onClick={() => nextPage(currentPage)}>
                <div className='pagination-text'>Next</div>
            </div>
        </div>
    )
}
