import { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'

const Categories = () => {

    const [category, setCategory] = useState('');
    const [tax_category, setTax] = useState('');
    const [data, setData] = useState([]);


    var checkCat = true;
    var result = data.find(cat => cat.category_name === category);
    if(result || tax_category < 0) {
        checkCat = false;
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(checkCat === false) {
            alert("A categoria ja existe ou o valor da taxa é negativo!")
        } else {
            try {
                axios.post('http://localhost/api/insertCategories.php',
                {
                    category: category,
                    tax: tax_category
                })
                location.reload();   
            }   catch (error) {
                console.error('Erro ao enviar dados: ', error);
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost/api/selectCat.php')
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    
    return (
        <div>
            <main>
            <form onSubmit={handleSubmit} method="POST" className={styles.category} id="category">
                <div className={styles.categoryInputs}>
                    <input type="text" name="category-name" id="categoryName" className={styles.categoryName} placeholder="Category" required onChange={(e) => setCategory(e.target.value)}/>

                    <input type="number" name="category-tax" id="categoryTax" className={styles.categoryTax} placeholder="%" required onChange={(e) => setTax(e.target.value)}/>
                </div> 

                <input type="submit" name="category-submit" value="Add Category" id="categoryAdd" className={styles.categoryAdd}/>
            </form>
            
            <div className={styles.linha}></div>

            <form className={styles.carrinho}>
                <table id="carrinho-table" className={styles.carrinhoTable}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Category</th>
                            <th>Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((data, index) => (
                            <tr key={index}>
                                <td>{data.code}</td>
                                <td>{data.category_name}</td>
                                <td>{data.tax}</td>
                            </tr>
                        ))
                    }
                    </tbody>            
                </table>
            </form>
        </main>
        </div>
    )
}

export default Categories