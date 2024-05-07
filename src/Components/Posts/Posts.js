import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../../firebase/config';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate();
  const [sortProduct, setSortProducts] = useState([]);
  const [products, setProduct] = useState([]);
  const { setPostDetails } = useContext(PostContext);

  useEffect(() => {
    const productCollection = collection(fireStore, "products");
    getDocs(productCollection).then((snapshot) => {
      const posts = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id
      }));
      setProduct(posts);
      const sortedProducts = [...posts].sort((a, b) => a.price - b.price);
      setSortProducts(sortedProducts);
    });
  }, []);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                setPostDetails(data);
                navigate('/ViewPost');
              }}
              className="card"
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={data.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {data.price}</p>
                <span className="kilometer">{data.category}</span>
                <p className="name"> {data.name}</p>
              </div>
              <div className="date">
                <span>{data.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {sortProduct.map((product, index) => (
            <div key={index} className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
