document.getElementById('create-form').addEventListener('submit', createItem);

// Fetch all items on load
getAllItems();

// Function to create a new item
function createItem(e) {
    e.preventDefault();
    const itemName = document.getElementById('create-name').value;
    fetch('http://localhost:5000/items', { // Replace with your API URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    })
        .then(response => response.json())
        .then(item => {
            getAllItems(); // Refresh the list
            document.getElementById('create-name').value = ''; // Clear the input
        })
        .catch(error => console.error('Error:', error));
}

// Function to get all items
function getAllItems() {
    fetch('http://localhost:5000/items')
        .then(response => response.json())
        .then(items => {
            const itemsList = document.getElementById('items-list');
            itemsList.innerHTML = ''; // Clear the list
            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
        ${item.name} 
        <button onclick="startUpdate('${item._id}', '${item.name}')">Edit</button>
        <button onclick="deleteItem('${item._id}')">Delete</button>
      `;
                itemsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to delete an item
function deleteItem(id) {
    fetch(`http://localhost:5000/items/${id}`, {
        method: 'DELETE',
    })
        .then(() => getAllItems())
        .catch(error => console.error('Error:', error));
}

// Function to start updating an item
function startUpdate(id, name) {
    document.getElementById('update-form').style.display = 'block';
    document.getElementById('update-id').value = id;
    document.getElementById('update-name').value = name;
}

// Function to update an item
document.getElementById('update-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const itemId = document.getElementById('update-id').value;
    const itemName = document.getElementById('update-name').value;
    fetch(`http://localhost:5000/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    })
        .then(response => response.json())
        .then(() => {
            getAllItems();
            cancelUpdate();
        })
        .catch(error => console.error('Error:', error));
});

// Function to cancel the update operation
function cancelUpdate() {
    document.getElementById('update-form').style.display = 'none';
}
