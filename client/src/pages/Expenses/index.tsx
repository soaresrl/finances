import React, { ReactElement, useEffect, useState } from 'react';

import "./styles.css";

interface IExpenses {
    _id: string;
    name: string;
    value: number;
    date: Date;
}

const Expenses: React.FC =  (): ReactElement => {
    const [expenses, setExpenses] = useState<IExpenses[]>([]);

    useEffect(()=>{
        fetch('/expenses').then(response => response.json()).then(expenses => setExpenses(expenses));
  
        return(()=>setExpenses([]));
    }, []);
  
    return (
      <div className='pages'>
        {expenses.map(expense => (<p key={expense._id}>{expense.name}</p>))}
      </div>
    );
}

export default Expenses;