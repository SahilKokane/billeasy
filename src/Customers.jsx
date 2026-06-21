import { useState, useEffect } from 'react'
import axios from 'axios'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = () => {
    axios.get('http://localhost:8080/customers')
      .then(res => setCustomers(res.data))
  }

  const addCustomer = () => {
    axios.post('http://localhost:8080/customers', {
      name, phone, email
    }).then(() => {
      fetchCustomers()
      setName('')
      setPhone('')
      setEmail('')
    })
  }

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:8080/customers/${id}`)
      .then(() => fetchCustomers())
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>BillEasy - Customers</h1>

      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={addCustomer}>Add Customer</button>
      </div>

      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.name} - {c.phone} - {c.email}
            <button onClick={() => deleteCustomer(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Customers