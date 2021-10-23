import {useState} from "react";

function Product(props) {
    const {item, fetchProducts, url} = props;
    const [editable, setEditable] = useState(false);

    const deleteProduct = (id) => {
        fetch(url + id, {method: 'DELETE'})
            .then(() => fetchProducts());
    };

    const editProduct = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        const target = e.target;
        const body = {
            'name': target.name.value,
            'price': target.price.value,
            'image': target.image.value
        }

        fetch(url + id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(() => editProductSuccess());
    };

    const editProductSuccess = () => {
        fetchProducts();
        setEditable(false);
    };

    return (
        <div className={'col-3 position-relative'}>
            <img className={'h-auto w-100'} src={item.image} alt=""/>
            <div onClick={() => setEditable(true)} className={'text-start'}>
                <div className={editable ? 'd-none' : ''}>
                    {item.name}
                    <br/>
                    {item.price}
                </div>
                <div className={editable ? '' : 'd-none'}>
                    <form onSubmit={(event) => editProduct(event, item.id)} action="">
                        <input className={'w-100 h-auto form-check-input mb-2'} type="text" name={'name'} defaultValue={item.name}/>
                        <input className={'w-100 h-auto form-check-input mb-2'} type="text" name={'price'} defaultValue={item.price}/>
                        <input type="text" name={'image'} defaultValue={item.image} hidden/>
                        <button
                            className={'btn btn-secondary me-2'}
                            type={'button'}
                            onClick={(event) => {event.stopPropagation(); setEditable(false)}}
                        >
                            Cancel
                        </button>
                        <button className={'btn btn-primary'}>
                            Done
                        </button>
                    </form>
                </div>
            </div>
            <button className={'btn py-0 px-2 btn-danger position-absolute top-0 end-0'}
                    onClick={() => deleteProduct(item.id)}>
                x
            </button>
        </div>
    )
}

export default Product;