import React from 'react';

function Search(props) {
    
    let [searchString, setSearchString] = React.useState("");


    let handleChange = (e) => {
        searchString = e;

        let filteredList = props.list;
        if(searchString !== ""){
            filteredList = filteredList.filter(entry => {
                let returnValue = false;
                props.keys.forEach(key => {
                    if(entry[key].toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1){
                        returnValue = true;
                    }
                });
                return returnValue;
            });
        }

        props.listCallback(filteredList);
    }

    return(
        <div className="Search">
            <input type="text" placeholder={props.placeholder} onChange={e => {handleChange(e.target.value)}}></input>
        </div>
    );
}

export default Search;