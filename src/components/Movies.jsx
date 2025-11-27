  import React, { useEffect, useState } from 'react'
  import MovieCard from './MovieCard'
  import axios from 'axios'
  import Pagination from './Pagination';

  function Movies({handleAddToWatchlist,handleRemoveFromWatchList,watchlist}) {
    const[movies,setMovies]=useState([]);
    const[pageNo,setPageNo]=useState(1);


    const handlePrev=()=>{
      if(pageNo>1){
      setPageNo(pageNo-1);
    }}
    const handleNext=()=>{
      setPageNo(pageNo+1);
    }
    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a9fda8f61d28c74260ad390c79d3df15&include_adult=false&include_video=false&language=en-US&page=${pageNo}&sort_by=popularity.desc`).then(function(res){
        
        console.log(res.data.results);
        setMovies(res.data.results)

      })
    },[pageNo])
    return (
      <div className='background: linear-gradient(140deg, #e3f2ff 0%, #f0f7ff 50%, #f7eaff 100%);
'>
      <div className='p-5'>
          <div className='text-2xl m-5 font-bold text-center'>
            Trending Movies
          </div>
          <div className='flex flex-row flex-wrap justify-around gap-8 m-10'>

        
    
    {movies.map((movieObj) => (
    <MovieCard 
       key={movieObj.id} 
      movieObj={movieObj}
     
      poster_path={movieObj.poster_path} 
      name={movieObj.original_title} 
      handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}
    />
  ))}
  
      
        </div>

        <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>
      </div>
      </div>
    )
  }

  export default Movies
// https://api.themoviedb.org/3/discover/movie?api_key=a9fda8f61d28c74260ad390c79d3df15&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc