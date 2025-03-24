import React, { useState, useEffect } from 'react';

function App() {
  const [backendMsg, setBackendMsg] = useState('');
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);

  // Получаем ответ от базового эндпоинта и список элементов при монтировании компонента
  useEffect(() => {
    fetch('/api/api')
      .then(res => res.text())
      .then(data => setBackendMsg(data))
      .catch(err => setBackendMsg('Ошибка связи с backend'));

    fetchItems();
  }, []);

  // Функция для получения списка элементов
  const fetchItems = () => {
    fetch('/api/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  };

  // Обработчик отправки формы для добавления нового элемента
  const addItem = (e) => {
    e.preventDefault();
    fetch('/api/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName })
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Ошибка при добавлении элемента');
      })
      .then(newItem => {
        setItemName('');
        fetchItems(); // обновляем список элементов после успешного добавления
      })
      .catch(err => console.error(err));
  };

  // Обработчик для теста масштабируемости (быстрая отправка запросов)
  const testScalability = () => {
    const numberOfRequests = 100;  // Количество запросов для теста
    let requestsCompleted = 0;
    
    // Функция для отправки запросов
    const sendRequests = () => {
      fetch('/api/api')
        .then(res => res.text())
        .then(() => {
          requestsCompleted++;
          if (requestsCompleted < numberOfRequests) {
            sendRequests(); // отправляем следующий запрос
          } else {
            alert('Масштабируемость протестирована');
          }
        })
        .catch(() => {
          requestsCompleted++;
          if (requestsCompleted < numberOfRequests) {
            sendRequests();
          } else {
            alert('Ошибка теста масштабируемости');
          }
        });
    };

    sendRequests(); // Стартуем отправку запросов
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Frontend на React</h1>
      <p>Ответ от backend: {backendMsg}</p>

      <hr />

      <h2>Список элементов</h2>
      <ul>
        {items.map(item => (
          <li key={item._id || item.name}>{item.name}</li>
        ))}
      </ul>

      <h3>Добавить новый элемент</h3>
      <form onSubmit={addItem}>
        <input 
          type="text" 
          placeholder="Название элемента" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          required
        />
        <button type="submit">Добавить</button>
      </form>

      <hr />
      {/* Кнопка для тестирования масштабируемости */}
      <button onClick={testScalability}>Проверить масштабируемость</button>
    </div>
  );
}

export default App;
