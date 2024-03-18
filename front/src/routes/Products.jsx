import { useState, useEffect } from 'react'
import styles from './Products.module.css'
import axios from 'axios'

const Products = () => {

    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    const [loadProducts, setLoadProducts] = useState([]);

    var checkProd = true;
    var result = loadProducts.find(prod => prod.product_name === product);
    if(result) {
        checkProd = false;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(checkProd === false) {
            alert("O produto já está cadastrado!")
        } else if (price < 0){
            alert("O valor do produto não pode ser negativo!")
        } else if(amount < 0) {
            alert("A quantidade do produto não pode ser negativa!")
        } else {
            try {
                axios.post('http://localhost/api/insertProduct.php',
                {
                    product: product,
                    amount: amount,
                    price: price,
                    category: category
                })
                console.log("Enviou com sucesso!");
                location.reload();   
            }   catch (error) {
                console.error('Erro ao enviar dados: ', error);
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost/api/selectProduct.php')
        .then(res => {
            setLoadProducts(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    

    useEffect(() => {
        axios.get('http://localhost/api/pullCategoriesToProduct.php')
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit} method="POST" className={styles.product}>

            <div className={styles.productInputs}>
                <input type="text" name="product-name" id="product-product" placeholder="Product" className={styles.productProduct} onChange={(e) => setProduct(e.target.value)}/>

                <input type="number" name="product-amount" id="product-amount" placeholder="Amount" className={styles.productAmount} onChange={(e) => setAmount(e.target.value)}/>

                <input type="number" name="product-unitPrice" id="product-unit" placeholder="Unit price" className={styles.productUnit} onChange={(e) => setPrice(e.target.value)}/>
            </div>

            <select name="product-category" id="product-category" className={styles.productCategory} onChange={(e) => setCategory(e.target.value)}>
                <option value="" data-default="" disabled selected>Category</option>
                {
                    data.map((data, index) => (
                        <option value={data.category_name} key={index}>{data.category_name}</option>
                    ))
                }
            </select>
            
            <input type="submit" name="product-submit" id="product-add" value="Add Product" className={styles.productAdd}/>

        </form>

        <div className={styles.linha}></div>

        <form action="" className={styles.carrinho}>
            <table id="carrinho-table" className={styles.carrinhoTable}>
                <tr>
                    <th id="code">Code</th>
                    <th id="product">Product</th>
                    <th id="amount">Amount</th>
                    <th id="unit">Unit price</th>
                    <th id="category">Category</th>
                </tr>
                {
                    loadProducts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.code}</td>
                            <td>{item.product_name}</td>
                            <td>{item.amount}</td>
                            <td>{item.price}</td>
                            <td>{item.category_name}</td>
                        </tr>
                    ))
                }

            </table>
        </form>
    </main>
    </div>
  )
}

export default Products