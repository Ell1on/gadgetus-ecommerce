import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import {  listProductByCategoriesDetails } from '../actions/productActions'

function Filters(props) {
    const dispatch = useDispatch()
    console.log(props.products);
    const [allTitles, setAllTitles] = useState([])
    const [allInfo, setAllInfo] = useState([])
    const [selectedInfo, setSelectedInfo] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [range, setRange] = useState([minPrice, maxPrice]);

    const productByCategory = useSelector(state => state.productByCategory) 
    const {loading:loadingByCat, error:errorByCat, products} = productByCategory 
    console.log(products);

    const handleRangeChange = (value, range) => {
        setRange(value);
        // dispatch(listProductByCategoriesDetails({
        //   id: props.id,
        //   price: value
        // }));
    };

    const handleInfoChange = (title, info) => {
        setSelectedInfo((prevSelectedInfo) => ([
          ...prevSelectedInfo,
          { title: title, info: info }
        ]));
        // dispatch(listProductByCategoriesDetails({
        //   id: props.id,
        //   filter: [...selectedInfo, { title: title, info: info }]
        // }));
      };
      const submitHandler = () => {
        dispatch(listProductByCategoriesDetails({
          id: props.id,
          filter: selectedInfo,
          price: range
        }));
      };
  console.log(selectedInfo);
    
    useEffect(() => {
        if (Array.isArray(products)) {
          setAllTitles([...new Set(products?.flatMap(product => product?.info?.map(info => info.title)))])
        }

        if (Array.isArray(products)) {
          const filteredInfo = products?.flatMap(product => product?.info)
              .filter((info, index, arr) => {
                  return arr.findIndex(i => i.title === info.title && i.information === info.information) === index;
              });
          setAllInfo(filteredInfo);
      }
        
        if (Array.isArray(products)) {
            const priceRange = [...new Set(products?.flatMap((product) => product?.price))];
            const sortedPriceRange = priceRange.sort((a, b) => a - b); // сортировка по возрастанию
            setMinPrice(Math.round(sortedPriceRange[0]));
            setMaxPrice(Math.round(sortedPriceRange[sortedPriceRange.length - 1]));
          }
          
        }, [products]);

        useEffect(() => {
          dispatch(listProductByCategoriesDetails({id:props.id}))
        }, [dispatch]);
      
        useEffect(() => {
          if (minPrice !== 0 || maxPrice !== 0) {
            setRange([minPrice, maxPrice]);
          }
        }, [minPrice, maxPrice]);
      console.log(range);
     
    return (
        <div className='border-0'>
            <Form.Group controlId='sort' className='border-0'>
            <div className='mb-3'>
                <fieldset className="form-group">
                    <legend >Наличие</legend>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  />
                        <label className="form-check-label" for="flexCheckDefault">
                            В наличии
                        </label>
                    </div>
                    <div class="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked">
                            Нет в наличии
                        </label>
                    </div>
                </fieldset>

            </div>
            <div className='mb-3' >
                <legend>Цена</legend>
                <div>
                    {range[0]} - {range[1]}
                </div>
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={range}
                    onChange={handleRangeChange}
                />
            </div>
                <legend >Характеристики</legend>
                {allTitles?.map((title) => (
                <div>
                    <Form.Label>{title}</Form.Label>
                    
                    <div className="card flex justify-content-center">
                    <Dropdown
  value={selectedInfo.find(item => item.title === title)?.info}
  onChange={(e) => handleInfoChange(title, e.value)}
  options={allInfo.filter((info) => info.title === title)
    .map((info) => (info.information))}
  placeholder="Выберите"
  className="w-full md:w-14rem"
/>
                    </div>
                </div>
                ))}
                <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
                  <Button onClick={submitHandler} label="Применить" />
                </div>
                
            </Form.Group>
        </div>
    )
}

export default Filters