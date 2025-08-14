import { useState } from 'react'
import './App.css'

function App() {
  const [price, setPrice] = useState(100)
  const [discount, setDiscount] = useState(10)

  const grossPrice = price - discount
  const vat = grossPrice * 0.07

  return (
    <div className="app">
      <h2>VAT Calculator</h2>

      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>

      <label>
        Discount:
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </label>

      <h3>Gross Price = {grossPrice}</h3>
      <h3>VAT = {vat.toFixed(2)}</h3>
    </div>
  )
}


export default App
