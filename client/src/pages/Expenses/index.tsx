import { Button, Dropdown, Input, Menu, Modal, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/auth';
import { useLoading } from '../../contexts/useLoading';

import "./styles.css";

interface IExpense {
    _id: string;
    name: string;
    value: number;
    category: string;
    date: Date;
}

interface ICategory {
  _id: string;
  type: string;
  userId: string;
}

const Expenses: React.FC =  (): ReactElement => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [draftExpense, setDraftExpense] = useState({});
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isValueFormatted, setIsValueFormatted] = useState<boolean>(true);

  const { currentUser } = useAuth();
  const loading = useLoading();

  useEffect(()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({userId: currentUser?.id})
    };
    loading.start();
    fetch('/expenses', requestOptions).then(response => response.json()).then(expenses => {
      setExpenses(expenses)
    }).then(async ()=>{
      await fetch('/categories', requestOptions).then(response => response.json()).then(categories => {
        setCategories(categories)
      });
    }).finally(()=>{
      loading.stop();
    });

    return(()=>setExpenses([]));
  }, [currentUser]);

  const dataSource = useMemo(() => {
    const data = expenses.map((expense, index) => {
      return {
        key: index,
        id: expense._id,
        name: expense.name,
        value: expense.value,
        date: new Date(expense.date).toLocaleDateString('pt-BR')
      }
    });

    return data;
  }, [expenses]);

  const categoriesMenu = useMemo(() => {
    return (
      <Menu>
        {categories.map((category, index) => (<Menu.Item key={index} onClick={handleFilterByCategory}>{category.type}</Menu.Item>))}
      </Menu>
    )
  }, [categories]);

  function handleCreateExpense(){
    setIsModalVisible(true);
  }

  function handleChangeDraftExpenseName(name: string){
    setDraftExpense((expense: IExpense): IExpense => {
      expense.name = name;

      return expense;
    });
  }

  function handleChangeDraftExpenseValue(value: string){

    const validFormat = value.match(/^\d+(\.\d{2})?$/);
    setIsValueFormatted(!!validFormat);

    setDraftExpense((expense: IExpense): IExpense => {
      expense.value = Number(value);

      return expense;
    });
  }

  function handleChangeDraftExpenseDate(date: string){
    setDraftExpense((expense: IExpense): IExpense => {
      expense.date = new Date(date);

      return expense;
    });
  }

  function handleChangeDraftExpenseCategoryType(category: any){
    setDraftExpense((expense: IExpense): IExpense => {
      expense.category = category;

      return expense;
    });
  }

  function handleDeleteExpense(record: any){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({userId: currentUser?.id, id: record.id})
    };

    loading.start();

    fetch('/expenses/delete', requestOptions).then(response => {
      return {status: response.status, msg: response.json()};
    }).then((result) => {
      if(result.status === 200){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
          body: JSON.stringify({userId: currentUser?.id})
        };

        fetch('/expenses', requestOptions).then(response => response.json()).then(expenses => setExpenses(expenses));
      }
      else{
        console.log(result.msg);
      }
    }).finally(()=>{
      loading.stop();
    });
  }

  function handleOk(){
    saveDraftExpense();

    setIsModalVisible(false);
  }

  function handleCancel(){

    setDraftExpense({});

    setIsModalVisible(false);
  }

  function handleClickFilter(){
    if(categoryFilter){
      handleRemoveFilters();

      return
    } 

    setIsFilterClicked(!isFilterClicked);
  }
  
  function handleFilterByName(){
    setIsFilterClicked(!isFilterClicked);
  }
  
  function handleFilterByCategory(event: any){

    const { key } = event;
    const category = categories[key];
    
    setCategoryFilter(category.type);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({userId: currentUser?.id, category})
    };

    loading.start();

    fetch('/expenses/filterByCategory', requestOptions)
    .then(response => response.json())
    .then(expenses => setExpenses(expenses))
    .finally(() => loading.stop());
  }
  
  function handleFilterByMonth(){
    setIsFilterClicked(!isFilterClicked);
  }
  
  function handleFilterByYear(){
    setIsFilterClicked(!isFilterClicked);
  }

  function handleRemoveFilters(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({userId: currentUser?.id})
    };

    loading.start();
    
    fetch('/expenses', requestOptions).then(response => response.json()).then(expenses => {
      setExpenses(expenses)
    }).then(async ()=>{
      await fetch('/categories', requestOptions).then(response => response.json()).then(categories => {
        setCategories(categories)
      });
    }).finally(()=>{
      loading.stop();
    });

    setCategoryFilter('');
  }

  function saveDraftExpense(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({...draftExpense, userId: currentUser?.id})
    };

    loading.start();

    fetch('/expenses/create', requestOptions).then(response => {
      return response.json();
    }).then((result) => {
      if(!result.msg){
        setExpenses([...expenses, result]);
      }
    }).finally(()=>{
      loading.stop();
    });
  }

  return (
    <>
      <div className='expense-page'>
        <div className='toolbar'>
          <Button icon={categoryFilter ? <RiFilterOffLine /> : <RiFilterLine />} onClick={handleClickFilter}></Button>
          {isFilterClicked && 
            (<div className='filter-options'>
              <Button onClick={handleFilterByName}>Name</Button>
              <Dropdown.Button 
                icon={<IoChevronDownOutline />} 
                onClick={handleFilterByCategory} 
                overlay={categoriesMenu}
              >
                {categoryFilter ? categoryFilter : 'Category'}
              </Dropdown.Button>
              <Button onClick={handleFilterByMonth}>Month</Button>
              <Button onClick={handleFilterByYear}>Year</Button>
            </div>)
          }

          <Button type='primary' onClick={handleCreateExpense}>Create new expense</Button>
        </div>
        
        <Table dataSource={dataSource} pagination={{pageSize: 10}} scroll={{x: 400}}>
          <Column title='Name' key='name' dataIndex='name' />
          <Column title='Value' key='value' dataIndex='value' />
          <Column title='Date' key='date' dataIndex='date' /> 
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <Space size="middle">
                <a>Expand</a>
                <a>Edit</a>
                <a onClick={()=>handleDeleteExpense(record)}>Delete</a>
              </Space>
            )} 
          />
        </Table>
      </div>
      <Modal title="Create new expense" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='modal-form'>
          <p>Name:</p>
          <Input 
            type='text' 
            defaultValue={(draftExpense as IExpense).name}
            placeholder='Insert expense name...' 
            onChange={(e) => handleChangeDraftExpenseName(e.target.value)} />
          
          <p title='Formats accepted: 11; 11.11'>Value (R$):</p>
          <Input 
            type='number' 
            defaultValue={(draftExpense as IExpense).value}
            placeholder='Insert expense value...' 
            onChange={(e) => handleChangeDraftExpenseValue(e.target.value)} 
            status={!isValueFormatted ? 'error' : ''} />

          <p>Category:</p>
          <Select onChange={handleChangeDraftExpenseCategoryType}>
            {
              categories.map(category => (
                <Select.Option value={category.type} key={category._id}>{category.type}</Select.Option>
              ))
            }
          </Select>
          
          <p>Date:</p>
          <Input type='date' defaultValue={(draftExpense as IExpense).date?.toString()} onChange={(e) => handleChangeDraftExpenseDate(e.target.value)}/>
        </div>
      </Modal>
    </>
  );
}

export default Expenses;