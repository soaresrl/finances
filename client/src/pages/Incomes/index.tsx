import { Button, Input, Modal, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { AiOutlineFilter } from 'react-icons/ai';
import { useAuth } from '../../contexts/auth';
import { useLoading } from '../../contexts/useLoading';

import "./styles.css";

interface IIncome {
    _id: string;
    name: string;
    value: number;
    date: Date;
}

const Incomes: React.FC =  (): ReactElement => {
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [draftIncome, setDraftIncome] = useState({});
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

    fetch('/incomes', requestOptions)
      .then(response => response.json())
      .then(incomes => setIncomes(incomes))
      .finally(()=>{loading.stop()});

    return(()=>setIncomes([]));
  }, [currentUser]);

  const dataSource = useMemo(() => {
    const data = incomes.map((income, index) => {
      return {
        key: index,
        id: income._id,
        name: income.name,
        value: income.value,
        date: income.date
      }
    });

    return data;
  }, [incomes]);

  function handleCreateIncome(){
    setIsModalVisible(true);
  }

  function handleChangeDraftIncomeName(name: string){
    setDraftIncome((income: IIncome): IIncome => {
        income.name = name;

      return income;
    });
  }

  function handleChangeDraftIncomeValue(value: string){

    const validFormat = value.match(/^\d+(\.\d{2})?$/);
    setIsValueFormatted(!!validFormat);

    setDraftIncome((income: IIncome): IIncome => {
        income.value = Number(value);

      return income;
    });
  }

  function handleChangeDraftIncomeDate(date: string){
    setDraftIncome((income: IIncome): IIncome => {
        income.date = new Date(date);

      return income;
    });
  }

  function handleDeleteIncome(record: any){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({userId: currentUser?.id, id: record.id})
    };

    loading.start();

    fetch('/incomes/delete', requestOptions).then(response => {
      return {status: response.status, msg: response.json()};
    })
    .then((result) => {
      if(result.status === 200){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
          body: JSON.stringify({userId: currentUser?.id})
        };

        fetch('/incomes', requestOptions).then(response => response.json()).then(incomes => setIncomes(incomes));
      }
      else{
        console.log(result.msg);
      }
    })
    .finally(()=>{
      loading.stop();
    });
  }

  function handleOk(){
    saveDraftExpense();

    setIsModalVisible(false);
  }

  function handleCancel(){

    setDraftIncome({});

    setIsModalVisible(false);
  }

  function saveDraftExpense(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': currentUser?.token as string },
      body: JSON.stringify({...draftIncome, userId: currentUser?.id})
    };

    loading.start();

    fetch('/incomes/create', requestOptions).then(response => {
      return response.json();
    })
    .then((result) => {
      if(!result.msg){
        setIncomes([...incomes, result]);
      }
    })
    .finally(()=>{
      loading.stop();
    });
  }

  return (
    <>
      <div className='income-page'>
        <div className='toolbar'>
          <Button icon={<AiOutlineFilter />}></Button>
          <Button type='primary' onClick={handleCreateIncome}>Create new income</Button>
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
                <a onClick={()=>handleDeleteIncome(record)}>Delete</a>
              </Space>
            )} 
          />
        </Table>
      </div>
      <Modal title="Create new income" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='modal-form'>
          <p>Name:</p>
          <Input 
            type='text' 
            defaultValue={(draftIncome as IIncome).name}
            placeholder='Insert income name...' 
            onChange={(e) => handleChangeDraftIncomeName(e.target.value)} />
          
          <p title='Formats accepted: 11; 11.11'>Value (R$):</p>
          <Input 
            type='number' 
            defaultValue={(draftIncome as IIncome).value}
            placeholder='Insert income value...' 
            onChange={(e) => handleChangeDraftIncomeValue(e.target.value)} 
            status={!isValueFormatted ? 'error' : ''} />
          
          <p>Date:</p>
          <Input type='date' defaultValue={(draftIncome as IIncome).date?.toString()} onChange={(e) => handleChangeDraftIncomeDate(e.target.value)}/>
        </div>
      </Modal>
    </>
  );
}

export default Incomes;