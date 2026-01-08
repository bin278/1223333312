import React, { useState } from 'react';

function TodoApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: '完成项目报告', completed: false, category: '工作' },
    { id: 2, text: '购买生活用品', completed: true, category: '生活' },
    { id: 3, text: '学习React Hooks', completed: false, category: '学习' },
    { id: 4, text: '健身房锻炼', completed: false, category: '健康' },
    { id: 5, text: '阅读技术文章', completed: false, category: '学习' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('工作');
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '工作', '生活', '学习', '健康'];

  const filteredTodos = activeCategory === '全部' 
    ? todos 
    : todos.filter(todo => todo.category === activeCategory);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      category: newCategory
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">待办事项</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '☀️ 浅色模式' : '🌙 深色模式'}
          </button>
        </div>

        <div className={`rounded-xl p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="输入新的待办事项..."
              className={`flex-1 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              添加
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-4 text-sm">
            <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              完成: {completedCount} / 总数: {totalCount}
            </span>
          </div>

          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className={`text-center py-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-gray-500">暂无待办事项</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  } ${todo.completed ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todo.completed 
                        ? 'bg-green-500 border-green-500' 
                        : darkMode ? 'border-gray-400' : 'border-gray-300'
                      }`}
                    >
                      {todo.completed && <span className="text-white text-sm">✓</span>}
                    </button>
                    <div>
                      <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        {todo.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>点击复选框标记完成，点击×删除项目</p>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;