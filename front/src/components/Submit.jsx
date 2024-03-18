import styles from './Submit.module.css'


const Submit = ({type, name, id, placeholder, handleOnChange, value}) => {
  return (
    <div>
        <input type={type} name={name} placeholder={placeholder} id={id} className={styles.inputSubmit} value={value} onChange={handleOnChange}/>
    </div>
  )
}

export default Submit