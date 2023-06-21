import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {

  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  return (
    <Pagination className='my-5 text-center' >
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={{
            pathname: '/',
            search: !isAdmin ?
              `/?keyword=${keyword}&page=${x + 1}`
              : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`,
          }}

        >
          <Pagination.Item className=''  active={x + 1 === page}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
