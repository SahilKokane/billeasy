import { useState, useEffect } from 'react'
import axios from 'axios'

function Bills() {
  const [bills, setBills] = useState([])
  const [customers, setCustomers] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [totalAmount, setTotalAmount] = useState('')

  useEffect(() => {
    fetchBills()
    fetchCustomers()
  }, [])

  const fetchBills = () => {
    axios.get('http://localhost:8080/bills')
      .then(res => setBills(res.data))
  }

  const fetchCustomers = () => {
    axios.get('http://localhost:8080/customers')
      .then(res => setCustomers(res.data))
  }

  const addBill = () => {
    axios.post('http://localhost:8080/bills', {
      customer: { id: customerId },
      totalAmount: totalAmount
    }).then(() => {
      fetchBills()
      setCustomerId('')
      setTotalAmount('')
    })
  }

  const deleteBill = (id) => {
    axios.delete(`http://localhost:8080/bills/${id}`)
      .then(() => fetchBills())
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>BillEasy - Bills</h1>

      <div>
        <select value={customerId} onChange={e => setCustomerId(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input placeholder="Total Amount" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
        <button onClick={addBill}>Add Bill</button>
      </div>

      <ul>
        {bills.map(b => (
          <li key={b.id}>
            Customer: {b.customer?.name} - Total: ₹{b.totalAmount}
            <button onClick={() => deleteBill(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bills