function NewProductForm(props) {
    const { fetchProducts, url } = props;

    const createProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        const body = {
            'name': target.name.value,
            'price': target.price.value,
            'image': target.image.value
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(() => createProductSuccess(e));
    };

    const createProductSuccess = (e) => {
        fetchProducts();
        e.target.reset();
    };

    return (
        <div className="col-3 pt-3">
            <form onSubmit={(event) => createProduct(event)} >
                <div className={'text-start'}>
                    <label htmlFor="">
                        Name:
                    </label> <br />
                    <input className={'w-100 h-auto form-check-input'} name={'name'} type="text"/>
                </div>
                <div className={'text-start'}>
                    <label htmlFor="">
                        Price:
                    </label> <br />
                    <input className={'w-100 h-auto form-check-input'} name={'price'} type="text"/>
                </div>
                <div className={'text-start form-group'}>
                    <label htmlFor="">
                        Image:
                    </label> <br />
                    <input className={'w-100 h-auto form-check-input'} name={'image'} type="text"/>
                </div>
                <button className="btn btn-primary mt-3">
                    Create
                </button>
            </form>
        </div>
    )
}
export default NewProductForm;