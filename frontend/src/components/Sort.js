import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {  listProductByCategoriesDetails, sortProducts } from '../actions/productActions'

function Sort(props) {
  const dispatch = useDispatch()
  const [sort, setSort] = useState('')

  const sortOptions = [
    { label: 'Product Reviews', value: 'prodReviews' },
    { label: 'Price: High to Low', value: 'highPrice' },
    { label: 'Price: Low to High', value: 'lowPrice' },
    { label: 'Number of Reviews', value: 'numReviews' }
  ]

  const handleSortChange = (event) => {
    const selectedSort = event.target.value
    console.log(selectedSort)
    setSort(selectedSort)
    dispatch(listProductByCategoriesDetails({categoryId:props.id, sectionId:props._id, sort:selectedSort}))
  }

  useEffect(() => {
    dispatch(listProductByCategoriesDetails({categoryId:props.id, sectionId:props._id}))

  }, [dispatch])

  return (
    <div className='d-flex justify-content-end me-2 mb-2 border-0'>
    <Form.Group controlId='sort border-0'>
      <Form.Label className='mr-2 border-0'></Form.Label>
      <Form.Control className='d-inline w-auto border-0' as='select' value={sort} onChange={handleSortChange}>
        <option value=''>Select Sort</option>
        <i class="fa-light fa-caret-up fa-rotate-180"></i>
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label }
            <i className="fa-light fa-caret-up fa-rotate-180 fa-2xs"></i>
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </div>
  )
}

export default Sort