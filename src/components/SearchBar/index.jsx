import './SearchBar.scss'
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useAsync } from "../../hooks/useAsync";
export const SearchBar = () => {
	const [searchValue, setSearchValue] = useState()
	const {searchImageList, loadImageList} = useAppContext()
	const handleSetSearchValue = (event) => {
		setSearchValue(event.target.value)
	}
	const handleSearchGiphy = async () => {
		await searchImageList({q: searchValue})
	}
	const handleDefaultGiphy = async () => { 
		await loadImageList();
	}
	const {execute: refreshList} = useAsync({asyncFunction: handleSearchGiphy, immediate:false})
	const {execute: defaultList} = useAsync({asyncFunction: handleDefaultGiphy, immediate:false})

 return <div className='search-bar'>
	 <label for='search'>Search Gifs!</label>
	 <input onChange={handleSetSearchValue} id='search' type={'search'} />
	 <button className='common-button' onClick={refreshList}>Search</button>
	 <button className='common-button' onClick={defaultList}>Clear</button>
 </div>
}