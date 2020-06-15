import React, {useState} from 'react';
import './App.css';

const AddQuantity = (props) => (
  <button className="op-button" onClick={()=> {if(!props.freezed) {props.handleAddQuantity(props);}}} name="add_quantity">+</button>
)
const SubtractQuantity = (props) => (
  <button className="op-button" onClick={()=> {if(!props.freezed) {props.handleSubtractQuantity(props);}}} name="subtract_quantity">-</button>
)
const DeleteItem = (props) => (
  <button className="op-button" onClick={()=> {if(!props.freezed) {props.handleDeleteItem(props);}}} name="delete_item">X</button>
)

const ListItem = (props) => (
  <>
  <div className="button-wrap">
    <DeleteItem 
      id = {props.id} 
      quantity = {props.quantity}
      name = {props.name}
      freezed = {props.freezed}
      handleDeleteItem={props.handleDeleteItem} 
    />
    <SubtractQuantity 
      id = {props.id} 
      quantity = {props.quantity}
      name = {props.name}
      freezed = {props.freezed}
      handleSubtractQuantity={props.handleSubtractQuantity} 
    />
    <AddQuantity 
      id = {props.id} 
      quantity = {props.quantity}
      name = {props.name}
      freezed = {props.freezed}
      handleAddQuantity={props.handleAddQuantity} 
    />
  </div>
  <li style={{ background: props.color }} onClick={()=> {props.handleClick(props);} }>
    {props.name} X {props.quantity}
  </li>
</>
)
const ListDisplay = (props) => {
  const items = props.items.map((item, i) => (
    <ListItem
      key={i}
      id={item.id}
      name={item.name}
      quantity={item.quantity}
      freezed={item.freezed}
      color={item.color}
      handleClick={props.handleClick}
      handleAddQuantity={props.handleAddQuantity}
      handleSubtractQuantity={props.handleSubtractQuantity} 
      handleDeleteItem={props.handleDeleteItem} 
    />
  ))
  
  return (
    <ul>
      {items}
    </ul>
  )
}

const InputText = (props) => {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.handleSubmit(value);
      setValue('');
    }}>
      <TextInput onChange={e => setValue(e.target.value)}  />
      <button className="add_button" type="submit" >Add Item</button>
    </form>
  )
}
const ClearAllItem = (props) => (
  <button className="add_button" onClick={()=> props.handleClearAllItem()} name="clear_all_item">Clear All Items</button>
)

function App() {
  const [items, setItems] = useState([
    {id:1, name:"oranges", quantity:2, freezed:false, color: '#61dafb'},
    {id:2, name:"apple", quantity:2, freezed:false, color: '#61dafb'},
    {id:3, name:"candy", quantity:2, freezed:false, color: '#61dafb'}
  ]);
  let idCount  = items.length;
 
  return (
    <div id="list-container">
      <ListDisplay items={items} 
        handleClick={(item) => { setItems(items.map((i) => {if(i.id === item.id) { 
                                                              if (item.freezed === true){
                                                                i.freezed = false;
                                                                i.color = '#61dafb';
                                                              } else {
                                                                i.freezed = true;
                                                                i.color = 'red';
                                                              }
                                                            }return i;}));}}
        handleDeleteItem={(item) => { setItems(items.slice().filter((i) =>  i.id !== item.id)); }}
        handleAddQuantity={(item) => { setItems(items.map((i) => {if(i.id === item.id) { i.quantity = item.quantity+1; }return i;}));}}
        handleSubtractQuantity={(item) => { setItems(items.map((i) => {if(i.id === item.id) {i.quantity = item.quantity-1<0 ? 0 : item.quantity-1; }return i;}));}}
        />
      <InputText handleSubmit={(item) => {
          let itemExist = false;
          for (let key in items) {
            if(items[key].name === item.toLowerCase()) {
              itemExist = true;
              setItems(items.map((i) => {if(i.name === item.toLowerCase()) {i.quantity += 1; } return i; }));
            }
          }
          if (!itemExist) {
            let itemObj = {};
            idCount += 1
            itemObj.id = idCount;
            itemObj.name = item.toLowerCase();
            itemObj.quantity = 0;
            itemObj.freezed = false;
            itemObj.color = '#61dafb';
            setItems(items.concat(itemObj));
          }
        }}
      />
      <ClearAllItem handleClearAllItem={() => {setItems([])}}
      />
    </div>
  );
}

export default App;
