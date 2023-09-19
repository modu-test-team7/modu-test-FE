import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

type SearchProps = {};

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="w-[200px] h-[40px] flex items-center justify-end mr-4 group">
      <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out group-hover:w-full group-hover:rounded-[25px] focus-keep-size">
        <input
          type="text"
          className=" w-0 h-full text-xs rounded-md box-border transition-all duration-300 ease-in-out border-none outline-none bg-transparent group-hover:pl-5 group-hover:w-[100%] group-hover:flex-grow hover:ml-0 focus:outline-none focus-keep-input"
          placeholder="Search..."
        />
        <button className="w-[40px] h-[40px] flex items-center justify-center">
          <BiSearchAlt size={20} />
        </button>
      </div>
    </div>
  );
};
export default Search;
