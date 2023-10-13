import React, { useRef, useState } from 'react'
import './EmiCalculator.css'

const EmiCalculator = () => {

    const[emiResult, setEmiResult] = useState(0.00)
    const principleRef = useRef(0)
    const interestRef = useRef(0)
    const MonthsRef = useRef(0)

    const CalculateEmi = () => {
        let p = principleRef.current.value
        let r = interestRef.current.value/1200
        let n = MonthsRef.current.value

        const result = (p * r *    
            Math.pow(1 + r, n)) /
    
          (Math.pow(1 + r, n) - 1);
        
          setEmiResult(result.toFixed(2))
    }

  return (
    <div className='emi-container'>
    <div className='container-inputs'>
        <h3 className='Emi-Header-text'>Emi calculator</h3>
        <input type='number' className='emi-input' placeholder='Amount' ref={principleRef}/>
        <input type='number' className='emi-input' placeholder='Interest'ref={interestRef}/>
        <input type='number' className='emi-input' placeholder='Loan tenure' ref={MonthsRef}/>
        <input onClick={CalculateEmi} className='emi-calcuatle-btn' type='submit' value='Calculate'/>
    </div>
    <div className='container-result-purple'>
        <h3>Your EMI</h3>
        <div className='result-container'>
            <div className='result'>{`₹${emiResult}`}</div>
        </div>
        <p className='footer-text'>Don't buy things in EMI</p>
    </div>
    </div>
  )
}

export default EmiCalculator
