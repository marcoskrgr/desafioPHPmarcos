import { useState, useEffect} from 'react'
import styles from './History.module.css'
import axios from 'axios'

const History = () => {

  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState('');
  const [details, setDetails] = useState([]);
  


  var res = details.filter(code => code.order_code == orderSelected);
  console.log(typeof(res))
  console.log(res)

  // if(res) {
  //   res.map((item, index) => {
  //     console.log(item.code)
  //   })
  // }
  
    

  useEffect(() => {
    axios.get('http://localhost/api/pullOrdersToHistory.php')
    .then(res => {
        setOrders(res.data);
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost/api/pullOrderItemToHistory.php')
    .then(res => {
        setDetails(res.data);
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div>
      <main>
      <form className={styles.carrinhoTable}>
        <table id="carrinho-table" className={styles.carrinhoTable}>
            <tr>
                <th>Code</th>
                <th>Tax</th>
                <th>Total</th>
            </tr>

            {
              orders.map((data, index) => (
                <tr key={index}>
                  <td>{data.code}</td>
                  <td>{data.tax}</td>
                  <td>{data.total}</td>
                </tr>
              ))
            }
        </table>
      </form>

      <div className={styles.linha}></div>

      <form method="POST" className={styles.carrinhoDetails}>
        <select name="order-select" id="details" className={styles.details} onChange={(e) => setOrderSelected(e.target.value)}>
            <option disabled selected>Select purchase code</option>
            {
              orders.map((data, index) => (
                <option key={index} value={data.code}>{data.code}</option>
              ))
            }
        </select>

        <input type="submit" name="submit-order-selected" value="Enviar" id="details" className={styles.details}/>

        <table id="carrinho-details" className={styles.carrinhoDetails}>
          <thead>
            <tr>
                <th>Product</th>
                <th>Unit price</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Total</th>
            </tr>
          </thead>
            
          {   

              res ? res.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>${item.price}</td>
                    <td>{item.amount}</td>
                    <td>%{item.tax}</td>
                    <td>${item.price * item.amount}</td>
                  </tr>
                )) : console.log('oi')
          }

          
        </table>
      </form>
      </main>
    </div>
  )
}

export default History