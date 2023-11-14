import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Counter from './Counter/Counter';

const Home = (props) => {
  const navigate = useNavigate();
  const [arr,setArr]=useState([{title:"",count:"",id:773}])
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                navigate('/signup');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }
    function removeHandler(i){
        let newArr=arr.filter(item=>item.id!==i);
        setArr(newArr);
        console.log(newArr)
    }
    function updateData(i,count,title){
      let updatIndesData=[...arr];
      updatIndesData[i]={
        'title':title,
        'count':count
      }
      setArr(updatIndesData)
    }
  return (
    <div>
      <Link to ="/login">Login</Link>
      <Link to ="/signup">Signup</Link>
      <button onClick={handleLogout}>Logout</button>
      <br/>
      <h2>{props.name?`Welcome-${props.name}`:"Login please"}</h2>
      <div className='mainbody'>
        <div className="cal-container-frame">
      <button onClick={()=>setArr([...arr,{title:"",count:"",id:Date.now()}])}>ADD COUNTER</button>
      <div className="main-rfarm-counter">
        {arr.map((item,i)=>{
          return(
            <div key={i} className="">
                <Counter index={i} updateData={updateData} removeHandler={removeHandler} data={item}/>
            </div>
          
          )
        })

        }

      </div>
        </div>
      </div>
    </div>

  )
}

export default Home

