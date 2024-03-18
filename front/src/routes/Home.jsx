import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import Submit from '../components/Submit'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState([]);
    const [productId, setProductId] = useState('');
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [amount, setAmount] = useState('');
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState ([{stax: '0', stotal: '0'}]);

    function changeProduct () {       
        if(productId) {
            setSelectedProduct(data.find(item => item.code == productId));
        } 
    }

    const clearCart = () => {
        try {
            axios.post('http://localhost/api/clearCart.php')
            location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    var checkProd = true;
    var result = cart.find(prod => prod.product_name === selectedProduct.product_name);
    if(result) {
        checkProd = false;
    }

    let valAmount = data.find(data => data.product_name === selectedProduct.product_name);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (checkProd === false) {
            alert("O produto ja existe no carrinho, selecione outro!")
        } else if(amount > valAmount.amount) {
            alert(`O produto só tem ${valAmount.amount} em estoque!`)
        } else {
            try {
                axios.post('http://localhost/api/insertCart.php',
                {
                    product: selectedProduct.code,
                    amount: amount,
                    price: selectedProduct.price,
                    tax: selectedProduct.tax
                })
                console.log("Enviou com sucesso!");
                location.reload();   
            }   catch (error) {
                console.error('Erro ao enviar dados: ', error);
            }
        }
    }

    const finishCart = () => {
        try {
            axios.post('http://localhost/api/finishCart.php')
            location.reload();
            clearCart();
        } catch(error) {
            console.log(error)
        }
    }

    const getProduct = async() => {
        await axios.get('http://localhost/api/pullProductToHome.php')
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost/api/pullCartToHome.php')
        .then(res => {
            setCart(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost/api/pullTaxTotal.php')
        .then(res => {
            setTotal(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        changeProduct();
    }, [productId])

  return (
    <div>
        <main>
        <form method="POST" onSubmit={handleSubmit} className={styles.home}>
            <select onChange={(e) => setProductId(e.target.options[e.target.selectedIndex].id)} name="home-product" id="home-select-product" className={styles.homeSelectProduct}>
                <option id="default" disabled selected>
                    Product
                </option>
                {
                    data.map((data) => (
                        <option id={data.code} value={data.product_name} key={data.code}>{data.product_name}</option>
                    ))
                }
            </select>

            <div className={styles.homeInputs}>

                <input type="number" onChange={(e) => setAmount(e.target.value)} name="home-amount" id="home-input-amount" className={styles.homeInputAmount} placeholder="Amount"/>

                <input type="text" name="home-tax" placeholder="Tax" id="home-input-tax" className={styles.homeInputTax} value={selectedProduct.tax} disabled/>

                <input type="text" name="home-value" placeholder="Value" id="home-input-unit" className={styles.homeInputUnit} value={selectedProduct.price}  disabled/>
            </div>
            
            <Submit type="submit" name="home-submit" placeholder="Add product" id="home-submit" value="Add product"/>

        </form>

        <div className={styles.linha}></div>

        <form className={styles.carrinho}>
            <table className={styles.carrinhoTable} id="carrinho-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item) => (
                            <tr key={item.code}>
                                <td>{item.product_name}</td>
                                <td>{item.price}</td>
                                <td>{item.amount}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={styles.totalTax}>
                <div className={styles.carrinhoTax}>
                    <label htmlFor="carrinho-tax" className={styles.carrinhoTax}>Tax: </label>
                    <input type="text" name="cart-tax" id="carrinho-tax" className={styles.carrinhoTax} disabled value={total[0].stax}/>
                </div>

                <div className={styles.carrinhoTotal}>
                    <label htmlFor="carrinho-total" className={styles.carrinhoTotal}>Total: </label>
                    <input type="text" name="cart-total" id="carrinho-total" className={styles.carrinhoTotal} disabled value={total[0].stotal}/>
                </div>
            </div>

            <div className={styles.carrinhoCancelFinish}>
                <input type="submit" name="cart-cancel" id="carrinho-cancel" className={styles.carrinhoCancel} onClick={clearCart} value="Cancel"/>

                <input type="submit" name="cart-submit" id="carrinho-finish" className={styles.carrinhoFinish} onClick={finishCart} value="Finish"/>
            </div>
        </form>
    </main>
    </div>
  )
}

export default Home