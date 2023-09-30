import { useEffect, useMemo } from 'react';
import { constants } from '../../assets/constants';
import { FormField } from '../formField/FormField';
import { FormSelect } from '../formSelect/FormSelect';
import './FilterAndSearch.scss';
import { debounce } from 'lodash';

const MXStates = Object.keys(constants.MXStates);
export const FilterAndSearch = ({ setSearch, setState, search, state }) => {
	const handleStateChange = (e) => {
		setState(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};
	const debouncedSearch = useMemo(() => {
		return debounce(handleSearchChange, 500);
	}, []);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	});

	return (
		<div className="filter-and-search-container">
			<FormField
				title={'Busqueda'}
				register={() => {}}
				onChange={debouncedSearch}
				value={search}
			/>
			<FormSelect
				title={'Estado'}
				register={() => {}}
				options={MXStates}
				onChange={handleStateChange}
				value={state}
			/>
		</div>
	);
};
