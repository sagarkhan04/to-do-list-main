const taskList = document.querySelector('ul');
const addForm = document.getElementById('add-form');
const updateForm = document.getElementById('update-form');

taskList.addEventListener('click', function (e) {
    const taskContainer = e.target.closest('li div.flex');
    if (!taskContainer) {
        return;
    }
    taskContainer.classList.toggle('line-through');

    const icon = taskContainer.querySelector('div .bi');
    icon.classList.toggle('bi-circle');
    icon.classList.toggle('bi-check-circle-fill');

    const buttons = taskContainer.parentNode.querySelectorAll('button');
    for (const button of buttons) {
        button.classList.toggle('hidden');
    }
});

// Add Task 
document.getElementById('new-task-btn').addEventListener('click', function () {
    addForm.classList.toggle('hidden');
});

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('gt');
    const taskName = addForm.querySelector('textarea[name="task"]').value;

    if(taskName == ''){
        alert('Please Enter a Task');
        return;
    }

    const task = document.createElement('li');
    task.classList.add('mb-4','flex');
    task.innerHTML = `
        <div class="flex flex-1">
            <i class="bi bi-circle text-[#af7eeb]"></i>
            <p class="ml-4">
                ${taskName}
            </p>
        </div>
        <button class="ml-4 bi bi-pencil-square update-icon"></button>
        <button class="hidden ml-4 bi bi-trash remove-icon"></button>
    `
    taskList.appendChild(task);

    addForm.classList.add('hidden');
});


// Remove Task
taskList.addEventListener('click', function (e) {
    const removeIcon = e.target.closest('.remove-icon');
    if (!removeIcon) {
        return;
    }
    taskList.removeChild(e.target.closest('li'));
});


// Show task
taskList.addEventListener('click', function (e) {
    const updateIcon = e.target.closest('.update-icon');
    const taskName = e.target.closest('li').innerText;
    if (!updateIcon) {
        return;
    }
    updateForm.querySelector('textarea[name="task"]').value = taskName;
    updateForm.classList.remove('hidden');
    updateForm.querySelector('input[type=hidden]').value = taskName;
});

// Update Task
updateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const oldtask = updateForm.querySelector('input[type=hidden]').value;
    const updatetask = updateForm.querySelector('textarea[name="task"]').value;
    if(updatetask == ''){
        alert('Please Enter a Task');
        return;
    }

    for (task of taskList.childNodes) {
        if (task.innerText == oldtask) {
            task.querySelector('p').innerText = updatetask;
            updateForm.classList.add('hidden');
        }
    }
});