import './App.css';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from "./Product";
import NewProductForm from "./NewProductForm";

function App() {
    const [products, setProducts] = useState([]);
    const url = 'https://bouquets.herokuapp.com/bouquets/';
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setProducts(result);
                },
                (error) => {
                    console.error(error);
                }
            )
    };

  return (
    <div className="App">
        <div className="container-1440">
            <div className={'row mx-0'}>
                {products.map(item => (
                    <Product key={item.id}
                             item={item}
                             url={url}
                             fetchProducts={fetchProducts}
                    />
                ))}
                <NewProductForm fetchProducts={fetchProducts}
                                url={url}/>
            </div>
        </div>
    </div>
  );
}

export default App;
