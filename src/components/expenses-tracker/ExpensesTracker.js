import React, { useEffect, useState } from "react"
import "./ExpnensesTracker.css"
export const ExpensesTracker = () => {

  
	const initialState = {
		srNo: 0,
		name: "",
		amount: "",
		catagory: "",
	}
  const [initialiseValue,setInitialiseValue] =useState(initialState)
  const [expenseList,setexpenseList]=useState([])
  const [num, setnum] = useState(0)
  const [colourPercent,setColourPercent]=useState({
    lightblue:100,
    red:100,
    lightgreen:100,
    orange:100

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
    //console.log(initialiseValue)
    if(initialiseValue?.name===""){
      alert('Expense Name required')
    }
     if(initialiseValue?.amount==="" || parseInt(initialiseValue?.amount)<=0){
      alert("Expense Amount required and should be greater than 0")
    }
     if(initialiseValue?.catagory===""){
      alert("Please Choose Expense Type")
    }
    else{ 
    setexpenseList((prev)=>{
		
		return[...prev, initialiseValue]
	})
    

	//   setExpenses((prev)=>{

	// 	return {
	// 		food: prev.food,
    //         Travel:prev.Travel,
    //         Shopping:prev.Shopping,
    //         Other:prev.Other,
    //         [initialiseValue.catagory]:prev[initialiseValue.catagory]+initialiseValue.amount
	// 	}
	//   })
       
  }
  }
  const percentFn = ()=>{
	expenseList.map((value, id)=>{
		setTotalExpenses((prev)=>{
			return prev + Number(value.amount)})
		if(value.catagory === "Food"){
			const obj = {[value.catagory]: expenses.food + value.amount}
			setExpenses((prev)=>{

				return {
					...prev,
					...obj
				}
			  })
		} else if(value.catagory === "Travel"){
			
			setExpenses((prev)=>{
				const obj = {[value.catagory]:expenses.Travel + value.amount}
				return {
					...prev,
					...obj
				}
			  })
		}else if(value.catagory === "Shopping"){
			const obj = {[value.catagory]: expenses.Shopping+ value.amount}
			setExpenses((prev)=>{

				return {
					...prev,
					...obj
				}
			  })
		}else if(value.catagory === "Other"){
			const obj = {[value.catagory]: expenses.Other + value.amount}
			setExpenses((prev)=>{

				return {
					...prev,
					...obj
				}
			  })
		}
		setColourPercent({
			lightblue:Math.floor(expenses.food/totalExpenses*100),
		red:Math.floor(expenses.Travel/totalExpenses*100),
		lightgreen:Math.floor(expenses.Shopping/totalExpenses*100),
		orange:Math.floor(expenses.Other/totalExpenses*100)
		})
	})
  }

useEffect(()=>{
	percentFn()
	// setnum(initialiseValue.srNo + 1)
},[expenseList])

  const onChangeHandler=(e)=>{
    e.persist()
    setInitialiseValue((prev)=>{
      return {
        ...prev,
      [e.target.name]:e.target.value,
	  srNo: num
      }
    })
  }
console.log({colourPercent})
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
              {expenseList.map((val,id)=>{
                return(<tr key={id} data-testid={`expense-list-${id}`}>
								<td>{val.srNo}</td>
								<td>{val.name}</td>
								<td>{val.amount}</td>
								<td>{val.catagory}</td>
							</tr>
                )
              })}		
					</tbody>
				</table>
			</div>
			<div className="card ml-5 m-10" style={{ width: '50%' }}>
				<p className="title">Expenses Breakdown</p>
				<br />
				<div style={{ height: '30px', display: 'flex' }}>
					<div data-testid="expense-distribution-food" style={{width:`${colourPercent.lightblue}%`  }} className="lightblue"></div>
					<div data-testid="expense-distribution-travel" style={{width:`${colourPercent.red}%`}} className="red"></div>
					<div data-testid="expense-distribution-shopping" style={{width:`${colourPercent.lightgreen}%` }} className="lightgreen"></div>
					<div data-testid="expense-distribution-other" style={{width:`${colourPercent.orange}%` }} className="orange"></div>
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


