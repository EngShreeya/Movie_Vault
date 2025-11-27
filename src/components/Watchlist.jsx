    import React, { use, useEffect, useState } from 'react'
    import genreids from '../utility/genres'

    function Watchlist({watchlist,setWatchlist,handleRemoveFromWatchList}) {
      const[search,setSearch]=useState("");
      const[genreList,setGenreList]=useState(['All Genres']);
      const[currGenre,setCurrGenre]=useState('All Genres');
      let handleSearch=(e)=>{
        setSearch(e.target.value);
      }
      let sortIncreasing=()=>{
        let sortedIncreasing=[...watchlist].sort((movieA,movieB) =>{
          return movieA.vote_average-movieB.vote_average;
        })
        setWatchlist([...sortedIncreasing]);
      }
      let sortDecreasing=()=>{
        let sortedDecreasing=[...watchlist].sort((movieA,movieB) =>{
          return movieB.vote_average-movieA.vote_average;
        })
        setWatchlist([...sortedDecreasing]);
      }
      
      useEffect(()=>{
        let temp=watchlist.map((movieObj)=>{
          return genreids[movieObj.genre_ids[0]];
        })
        temp=new Set(temp);
        setGenreList(['All Genres',...temp])
        console.log(temp);
      },[watchlist])
      
        let handleFilter=(genre)=>{
          setCurrGenre(genre);
        }

      return (


        <>
        {/* <div className="bg-gradient-to-br from-[#e0f2ff] via-[#f3f9ff] to-[#d6eaff]
  ">   */}
        {/* <div className='flex justify-center flex-wrap '>
          {genreList.map((genre)=>{
            return(
                <div onClick={()=>handleFilter(genre)} className={currGenre==genre?'flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-blue-400 m-4':flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-gray-400/50 m-4':
                    <div className='flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-gray-400/50 m-4 '>Action</div>}>{genre}</div>
          );
        })} */}
        <div className='flex justify-center flex-wrap '>
  {genreList.map((genre) => {
    return (
      <div
        onClick={() => handleFilter(genre)}
        className={
          currGenre === genre
            ? "flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-blue-400 m-4"
            : "flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-gray-400/50 m-4"
        }
      >
        {genre}
      </div>
    );
  })}
</div>

        
      
      
        {/* </div> */}




        {/* <div className='flex justify-center items-center h-[100vh] bg-gray-100'>
          <input type="text" /> */}
          <div className="flex justify-center items-center my-4 ">
          <input onChange={handleSearch} value={search} 
          type="text"
      placeholder="Search Movies"
      className="h-[3rem] w-[18rem] border border-gray-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200"/>
    </div>
    <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
          <tr>
            
            <th>Name</th>
            <th className='flex justify-center'>
              <div onClick={sortIncreasing}className='p-2'><i class="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Ratings</div>
                <div onClick={sortDecreasing} className='p-2'><i class="fa-solid fa-arrow-down"></i></div>
            </th>
          
            <th>Popularity</th>
            <th>Genres</th>

          </tr>
        </thead>
        <tbody>
          {watchlist.filter((movieObj)=>{
            if(currGenre==='All Genres'){
              return true;}
            else{
              return genreids[movieObj.genre_ids[0]]===currGenre;
            }
          }).filter((movieObj)=>{
            return movieObj.title.toLowerCase().includes(search.toLowerCase());
          }).map((movieObj)=>{
            return(
              <tr className='border-b-2'>
          <td className='flex items-center px-6 py-4' >
            <img className='h-[6rem] w-[10rem]'src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}/>
            <div className='mx-10'>{movieObj.title}</div>
          </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            <td onClick={()=>handleRemoveFromWatchList(movieObj)}className='text-red-800'>Delete</td>       
          </tr>);
          })}
        


        </tbody>
      </table>
    </div>
    {/* </div> */}
        </>
      )
    }

    export default Watchlist
