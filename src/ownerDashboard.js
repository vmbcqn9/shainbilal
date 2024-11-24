import React, { useState, useEffect } from 'react';

const OwnerDashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  // Fetch data from local storage or simulate a fetch from the server
  useEffect(() => {
    const taskDataFromLocal = localStorage.getItem('taskData');
    if (taskDataFromLocal) {
      setTaskData(JSON.parse(taskDataFromLocal));
    }

    const totalDiscountFromLocal = localStorage.getItem('totalDiscount');
    if (totalDiscountFromLocal) {
      setTotalDiscount(parseInt(totalDiscountFromLocal));
    }
  }, []);

  // Handle task approval
  const handleTaskApproval = (taskId) => {
    const updatedTaskData = taskData.map(task =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    setTaskData(updatedTaskData);
    localStorage.setItem('taskData', JSON.stringify(updatedTaskData));

    // Notify the owner about the completed task
    setNotifications([...notifications, `Task ${taskId} has been completed`]);

    // Update the total discount
    updateTotalDiscount(5); // Add 5% for each completed task (example)
  };

  // Update total discount in localStorage
  const updateTotalDiscount = (newDiscount) => {
    const updatedDiscount = totalDiscount + newDiscount;
    setTotalDiscount(updatedDiscount);
    localStorage.setItem('totalDiscount', updatedDiscount);
  };

  // Reject task (if necessary)
  const handleTaskRejection = (taskId) => {
    const updatedTaskData = taskData.map(task =>
      task.id === taskId ? { ...task, status: 'Rejected' } : task
    );
    setTaskData(updatedTaskData);
    localStorage.setItem('taskData', JSON.stringify(updatedTaskData));

    // Notify the owner about the rejected task
    setNotifications([...notifications, `Task ${taskId} has been rejected`]);
  };

  return (
    <div>
      <header>
        <h1>Restaurant Owner Dashboard</h1>
      </header>
      <div>
        <h2>Total Discount Given: {totalDiscount}%</h2>
        <h3>Customer Tasks</h3>
        <ul>
          {taskData.map(task => (
            <li key={task.id}>
              {task.description} - Status: {task.status}
              {task.status === 'Pending' && (
                <>
                  <button onClick={() => handleTaskApproval(task.id)}>
                    Approve Task
                  </button>
                  <button onClick={() => handleTaskRejection(task.id)}>
                    Reject Task
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OwnerDashboard;
