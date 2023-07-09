import {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');


  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/item', {item: itemText, completed:false,})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }


  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:5000/api/items')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);


  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }


  const updateItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }

  const handleComplete = async (id) => {
    try {
      const itemIndex = listItems.findIndex((item) => item._id === id);
      const updatedItems = [...listItems];
      updatedItems[itemIndex].completed = !updatedItems[itemIndex].completed;
      setListItems(updatedItems);
  

      await axios.put(`http://localhost:5000/api/item/${id}`, {
        completed: updatedItems[itemIndex].completed,
      });
    } catch (err) {
      console.log(err);
    }
  };


  const renderUpdateForm = () => (
    <form className="flex pt-6 pb-8 items-center justify-center h-[20px]" onSubmit={(e)=>{updateItem(e)}} >
      <input className="p-3 w-[280px] bg-transparent text-white rounded-lg border-2 border-purple-500" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <div className='pl-5'>
            <button type='submit' className='p-2 rounded-xl border-2 border-purple bg-purple-900 text-white font-semibold uppercase text-[10px] w-[80px]' > update </button>
            </div>
    </form>
  )

  return (
    <div className='bg-site overflow-y-auto min-h-screen flex flex-col items-center justify-center '>
  <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-purple-300 mb-8'>TASKER</h1>
  <form className="flex flex-col sm:flex-row items-center justify-center mb-10" onSubmit={e => addItem(e)}>
    <input className='p-3 w-full sm:w-[280px] bg-transparent text-white rounded-lg border-2 border-purple-500 mb-4 sm:mb-0 sm:mr-2' type="text" placeholder='Add Task' onChange={e => {setItemText(e.target.value)} } value={itemText} />
    <button type='submit' className='p-2 rounded-xl border-2 border-purple bg-purple-900 text-white font-semibold uppercase text-[10px] w-[80px] hover:bg-violet-100 hover:text-violet-800'> Add Task </button>
  </form>
  <div className='rounded-lg p-10 bg-black/30 flex flex-col items-center border-2 border-white max-h-[70%] overflow-y-auto'>
    <div className='pt-12 text-white text-xl sm:text-2xl font-bold hover:text-violet-400'>TASKS LIST</div>
    <div className=" flex flex-col items-start mt-4">
        {
  listItems.map((item) => (
    <div key={item._id} >
      {
        isUpdating === item._id ? (
          renderUpdateForm()
        ) : (
          <>
          <div className='bg-purple-800 border-2 rounded-xl border-white hover:border-purple-400 hover:bg-black/20 pl-10 pr-10 pt-3 pb-3 flex items-center justify-between my-4 lg:w-[380px] w-[180px] '>
          <div className='flex overflow-y-auto'>
            <input className=' mr-1 ' type='checkbox' checked={item.completed} onChange={() => handleComplete(item._id)} />
            <p className={`mr-9 text-[8px] lg:text-[16px]  ${item.completed ? 'line-through text-black' : ''}  text-white font-bold ` }>{item.item}</p>
          </div>

          <div>
            <FontAwesomeIcon icon={faPenToSquare} className='text-white h-3 md:h-4 lg:h-5 hover:text-green-500' onClick={() => setIsUpdating(item._id)} />
            <FontAwesomeIcon icon={faTrash} className='ml-4 text-white h-3 md:h-4 lg:h-5 hover:text-red-500' onClick={() => deleteItem(item._id)} />
          </div>
          </div>

        </>
        )
      }
      
    </div>
  ))
        }
      </div>
      </div>
      </div>
    
  );
}

export default App;
