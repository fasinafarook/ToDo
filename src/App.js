import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [deletedToDos, setDeletedToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];

  const handleDeleteToDo = (id) => {
    const deletedItem = toDos.find(todo => todo.id === id);
    const confirmation = window.confirm(`Are you sure you want to delete "${deletedItem.text}"?`);
    if (confirmation) {
      setDeletedToDos([...deletedToDos, deletedItem]);
      setToDos(toDos.filter(todo => todo.id !== id));
    }
  };

  const handleAddToDo = () => {
    if (toDo.trim() === '') return;
    const newToDo = { id: Date.now(), text: toDo.trim(), status: false };
    setToDos(prevToDos => {
      if (prevToDos.find(todo => todo.text === newToDo.text)) {
        alert('Todo already exists!');
        return prevToDos;
      } else {
        return [...prevToDos, newToDo];
      }
    });
    setToDo('');
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{`Whoop, it's ${currentDay} 🌝 ☕`}</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddToDo} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  setToDos(toDos.map((obj2) => {
                    if (obj2.id === obj.id) {
                      return { ...obj2, status: e.target.checked };
                    }
                    return obj2;
                  }));
                }}
                checked={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => handleDeleteToDo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
      <div className="selectedItems">
        <h3>Selected Items</h3>
        {toDos.map((obj) => {
          if (obj.status) {
            return <h5 key={obj.id}>{obj.text}</h5>;
          }
          return null;
        })}
      </div>
      <div className="deletedItems">
        <h3>Deleted Items</h3>
        {deletedToDos.map((deletedItem) => (
          <div key={deletedItem.id}>
            <h5>{deletedItem.text}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
