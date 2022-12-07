import React, { useState } from "react"
import "./ExpnensesTracker.css"
export const ExpensesTracker = () => {

  
	const initialState = {
		name: "",
		amount: "",
		catagory: "",
	}
  const [initialiseValue,setInitialiseValue] =useState(initialState)
  const [ExpenseList,setExpenseList]=useState([])
  const [colourPercent,setColourPercent]=useState({
    lightblue:25,
    red:25,
    lightgreen:25,
    orange:25

  })
  const [expenses, setExpenses] = useState({
    food: 0,
    Travel:0,
    Shopping:0,
    Other:0
    
  });
  const [totalExpenses,setTotalExpenses]=useState(0)

  const validateData=(e)=>{
    e.preventDefault()
    console.log(initialiseValue)
    if(initialiseValue.name===""){
      alert('Expense Name required')
    }
    else if(initialiseValue.amount==="" || parseInt(initialiseValue.amount)<0){
      alert("Expense Amount required and should be greater than 0 ")
    }
    else if(initialiseValue.catagory===""){
      alert("Please Choose Expense Type")
    }
    else{ 
    setExpenseList((prev)=>([...prev, initialiseValue ]))
    setTotalExpenses((prev)=>{
      return prev + parseInt(initialiseValue.amount)})

	  setExpenses((prev)=>{
		return {
			food: prev.food,
            Travel:prev.Travel,
            Shopping:prev.Shopping,
            Other:prev.Other,
            [initialiseValue.catagory]:prev[initialiseValue.catagory]+initialiseValue.amount
		}
	  })
       setColourPercent({
	lightblue:expenses.food/totalExpenses*100,
red:expenses.Travel/totalExpenses*100,
lightgreen:expenses.Shopping/totalExpenses*100,
orange:expenses.Other/totalExpenses*100
})
  }
  }



  const onChangeHandler=(e)=>{
    e.persist()
    setInitialiseValue((prev)=>{
      return {
        ...prev,
      [e.target.name]:e.target.value
      }
    })
  }

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div>
				<form onSubmit = {validateData}>
					<section
						className="my-30 layout-row align-items-center justify-content-center"
						style={{ width: "1000px" }}
					>
						<input
							type="text"
              value={initialiseValue.name}
							placeholder="New Expense"
							style={{ width: "40%", marginRight: "10px" }}
							name="name"
							data-testid="expense-name"
              onChange={onChangeHandler}
						/>
						<input
							type="number"
							placeholder="Enter Amount"
							style={{ width: "40%" }}
							name="amount"
              value={initialiseValue.amount}
							data-testid="expense-amount"
              onChange={onChangeHandler}
						/>
						<select className="ml-2" name="catagory"  onChange={onChangeHandler} data-testid="expense-type">
							<option disabled selected >Select Type</option>
							<option data-testid="expense-type-1" value={'food'}>Food</option>
							<option data-testid="expense-type-2" value={'Travel'}>Travel</option>
							<option data-testid="expense-type-3" value={'Shopping'}>Shopping</option>
							<option data-testid="expense-type-4" value={'Other'}>Other</option>
						</select>
						<button
							type="submit"
							style={{ width: "20%" }}
							data-testid="expense-submit-button"
						>
							Add Expense
						</button>
					</section>
				</form>
			</div>
			<div className="flex" style={{ width: '100%' }}>
				<div style={{ width: '48%' }} className="mx-5 m-10 card">
					<p className="title">Expense List</p>
					<table >
						<thead>
							<tr>
								<td>Sr No</td>
								<td>Expense</td>
								<td>Amount</td>
								<td>Catagory</td>
							</tr>
						</thead>
						<tbody>
              {ExpenseList.map((val,id)=>{
                return(
                  <>
                  <tr>
								<td>{id+1}</td>
								<td>{val.name}</td>
								<td>{val.amount}</td>
								<td>{val.catagory}</td>
							</tr>
                  </>
                )
              })}
							{/* <tr>
								<td>2</td>
								<td>Expense 2</td>
								<td>10</td>
								<td>Travel</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Expense 3</td>
								<td>10</td>
								<td>Shopping</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Expense 4</td>
								<td>10</td>
								<td>Other</td>
							</tr> */}
					</tbody>
				</table>
			</div>
			<div className="card ml-5 m-10" style={{ width: '50%' }}>
				<p className="title">Expenses Breakdown</p>
				<br />
				<div style={{ height: '30px', display: 'flex' }}>
					<div data-testid="expense-distribution-food" style={ExpenseList.length==0?{width:"25%"}:{ width:`${Math.floor(expenses.food/totalExpenses*100)}%`  }} className="lightblue"></div>
					<div data-testid="expense-distribution-travel" style={ExpenseList.length==0?{width:"25%"}:{ width:`${Math.floor(expenses.Travel/totalExpenses*100)}%`}} className="red"></div>
					<div data-testid="expense-distribution-shopping" style={ExpenseList.length==0?{width:"25%"}:{ width:  `${Math.floor(expenses.Shopping/totalExpenses*100)}%` }} className="lightgreen"></div>
					<div data-testid="expense-distribution-other" style={ExpenseList.length==0?{width:"25%"}:{ width:  `${Math.floor(expenses.Shopping/totalExpenses*100)}%` }} className="orange"></div>
				</div>
				<br />
				<div className="flex ml-10 mb-2">
					<div className="lightblue hight-20 width-20"></div> &nbsp; Food
				</div>
				<div className="flex ml-10 mb-2">
						<div className="red hight-20 width-20"></div> &nbsp; Travel
				</div>
				<div className="flex ml-10 mb-2">
						<div className="lightgreen hight-20 width-20" ></div> &nbsp; Shopping
				</div>
				<div className="flex ml-10 mb-10">
						<div className="orange hight-20 width-20"></div> &nbsp; Other
				</div>
			</div>
			</div>
		</div >
	)
}


