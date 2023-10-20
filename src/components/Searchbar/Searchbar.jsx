import { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { Search, Button, Input } from "./Searchbar.styled";
import toast from 'react-hot-toast';

export const Searchbar = ({ handelSearch })=> {
    const [value, setValue] = useState('');

 const handlerChange = evt => {
        setValue(evt.target.value);
    }
    
    const handlerSubmit = evt => {
        evt.preventDefault();
        if (value.trim() === '') {
            return toast.success('Please enter a search word.', { position: 'top-right' });
        }
    
        handelSearch(value);
         
        reset();
    };
    
  const  reset = () => {
         setValue('');
    }
    
    return (
           <Search  onSubmit= {handlerSubmit}>
            <Button type="submit"><BiSearch size = "18px"/></Button>

            <Input
                type="text"
                    placeholder="Search images and photos"
                    value={value} 
                onChange = {handlerChange}
    />
  </Search>
        )
    }



