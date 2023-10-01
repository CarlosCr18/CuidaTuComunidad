import ctcApi from './apiConfig.js';

export const getTasks = async ({ search, MXState }) => {
	const tasks = await ctcApi.get('/tasks', {
		params: {
			...(search ? { search } : {}),
			...(MXState ? { MXState } : {}),
		},
	});
	if (tasks && tasks.status === 200) {
		return tasks.data;
	}
	return [];
};

export const createTask = async ({
	title,
	description,
	MXState,
	creator,
	likes,
}) => {
	const formData = new FormData();
	formData.append('title', title);
	formData.append('description', description);
	formData.append('MXState', MXState);
	formData.append('creator', creator);
	formData.append('likes', likes);
	const createdTask = await ctcApi.post('/tasks/create', formData);
	if (createdTask && createdTask.status === 201) {
		return createdTask.data;
	}
	return null;
};

export const deleteTask = async ({ id }) => {
	const deletedTask = await ctcApi.patch(`/tasks/delete/${id}`, { id });
	if (deletedTask && deletedTask.status === 200) {
		return true;
	}
	return null;
};

export const updateTask = async ({ id, likes }) => {
	const updatedTask = await ctcApi.patch(`/tasks/update/${id}`, { likes });
	if (updatedTask && updatedTask.status === 200) {
		return true;
	}
	return null;
};
export const likeTask = async ({ id }) => {
	const likedTask = await ctcApi.patch(`/tasks/like/${id}`);
	if (likedTask && likedTask.status === 200) {
		return true;
	}
	return null;
};
