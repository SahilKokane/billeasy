import { useState, useEffect } from 'react'
import axios from 'axios'
import Customers from './Customers'
import Bills from './Bills'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [page, setPage] = useState('products')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios.get('http://localhost:8080/products')
      .then(res => setProducts(res.data))
  }

  const addProduct = () => {
    axios.post('http://localhost:8080/products', {
      name, price, stock
    }).then(() => {
      fetchProducts()
      setName('')
      setPrice('')
      setStock('')
    })
  }

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(() => fetchProducts())
  }

  return (
    <div style={{padding: '20px'}}>
      <div>
        <button onClick={() => setPage('products')}>Products</button>
        <button onClick={() => setPage('customers')}>Customers</button>
        <button onClick={() => setPage('bills')}>Bills</button>
      </div>

      {page === 'products' && (
        <div>
          <h1>BillEasy - Products</h1>
          <div>
            <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
            <button onClick={addProduct}>Add Product</button>
          </div>
          <ul>
            {products.map(p => (
              <li key={p.id}>
                {p.name} - ₹{p.price} - Stock: {p.stock}
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {page === 'customers' && <Customers />}
      {page === 'bills' && <Bills />}
    </div>
  )
}

export default App