import React, {useState, useRef, useEffect} from 'react'
import { Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { listSearch } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';


const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [showBackdrop, setShowBackdrop] = useState(false);

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchList = useSelector((state) => state.searchList);
  const { loading, error, products } = searchList;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(listSearch(`?keyword=${keyword}`));
      navigate(`/products/search`);
    }
  };

  const handleFocus = () => {
    if (!showBackdrop) {
      setShowBackdrop(true);
    }
  };

  const handleBlur = (e) => {
    const clickedInsideInput = e.target === inputRef.current;
    if (!clickedInsideInput) {
      setShowBackdrop(false);
    }
  };

  const handleHideBackdrop = () => {
    setShowBackdrop(false);
  };

  const handleClickOutside = (e) => {
    const clickedInsideSearchBox =
      e.target.closest('.search-box-backdrop') !== null;
    if (!clickedInsideSearchBox) {
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    handleHideBackdrop();
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value.trim() !== '') {
      dispatch(listSearch(`?keyword=${e.target.value}`));
    }
  };

  return (
    <div
      className={`ps-5 px-5 ${showBackdrop ? 'search-box-backdrop' : ''}`}
      style={{ flexGrow: 1, position: 'relative' }}
    >
      <Form onSubmit={handleSubmit}>
        <InputGroup>
        <FormControl
          type="text"
          placeholder="Поиск по сайту"
          value={keyword}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onClick={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          style={{
            border: 'none',
            boxShadow: 'none',
            borderRadius: showBackdrop ? '4px 0 0 0' : '4px 0 0 4px',
            zIndex: showBackdrop ? 1 : 'inherit',
            outline: 'none',
          }}
        />
        <Button
          type="submit"
          onClick={handleFocus}
          style={{
            borderRadius: showBackdrop ? '0 4px 0 0' : '0 4px 4px 0',
            zIndex: showBackdrop ? 1 : 'inherit',
            outline: 'none',
          }}
        >
          Поиск
        </Button>
        </InputGroup>
      </Form>
      {showBackdrop && (
        <>
          {/* Dimming effect */}
          <div
            className="search-backdrop"
            style={{
              position: 'fixed',
              top: 50,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 9999,
            }}
            onClick={handleHideBackdrop}
          ></div>

          {/* White backdrop */}
          <div
            className="search-backdrop"
            style={{
              position: 'absolute',
              top: 'calc(100%)',
              left: '48px',
              width: 'calc(100% - 96px)',
              maxHeight: '400px', // Ограничение высоты контейнера
              overflowY: 'auto', // Добавление прокрутки, если контент выходит за границы
              backgroundColor: 'white',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '20px',
              borderRadius: '0 0 4px 4px',
            }}
          >
            {products &&
              products.slice(0, 8).map((product) => (
                <div key={product.id}>
                  <div>
                    <strong>{product.categories}</strong>
                  </div>
                  <Link
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      handleLinkClick();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ps-2">
                      <strong>{product.name}</strong>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBox;

