import { useCallback, useEffect, useState } from 'react';
import { getTasks } from '../../services/api/tasks.js';

export const useTasks = (fetchOnMount = true) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [MXState, setMXState] = useState('');
	const [Error, setError] = useState(null);
	const [likedTasks, setLikedTasks] = useState([]);

	const useGetTasks = useCallback(
		async (callbackFunction) => {
			setLoading(true);
			try {
				const tasksResponse = await getTasks({ search, MXState });
				if (tasksResponse) {
					setTasks(tasksResponse);
					setLoading(false);
				}
				if (callbackFunction) {
					callbackFunction();
				}
				return tasksResponse;
			} catch (error) {
				setError(error?.data?.response || error);
				setLoading(false);
				return null;
			}
		},
		[MXState, search, setTasks, setLoading, setError]
	);

	useEffect(() => {
		if (fetchOnMount) void useGetTasks();
	}, [
		MXState,
		search,
		setTasks,
		setLoading,
		setError,
		setLoading,
		fetchOnMount,
	]);

	return {
		tasks,
		setTasks,
		loading,
		search,
		setSearch,
		MXState,
		setMXState,
		Error,
		mutateAsync: useGetTasks,
		likedTasks,
		setLikedTasks,
	};
};
