"use client"
import Image from "next/image";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import Card from "./components/Card";
const COUNTRIES = ["Austria", "Belgium", "Croatia", "Bulgaria", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Ukraine"];

import Modal from "./components/Modal"
import PokePage from "./components/PokePage"
import PaginationControls from "./components/Pagination";
import { useEffect , useState} from 'react';
import Pagination from "./components/Pagination";


export default function Home({
  searchParams,
}) {


 
 

  const [pokemonData, setPokemonData] = useState([])
  const [filteredData, setfilteredData] = useState([])
  const [pokemonDataSlice, setpokemonDataSlice] = useState([])
  const [isloading, setisloading]= useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);
  const [activeIndex, setActiveIndex] = useState(null);
  const[modal,setModel] = useState(false)

  const [pokemonType, setPokemonType] = useState([])
  const [serach , setSerach] = useState()

  
  useEffect(() => {
    async function fetchData() {
      try {
        setisloading(true);
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=120');
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          
          setPokemonData(data.results)
          setfilteredData(data.results)
          console.log(data.results);
        setisloading(false);
       
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
    fetchData();
  }, []);


  function handletypefilter(list) {
    setPokemonType(list)
  }

  useEffect(() => {

    function extractId(url) {
      return parseInt(url.match(/\/(\d+)\//)[1], 10);
  }

    async function fetchData() {
      try {
        setisloading(true);
         const typeset = new Set([])
        const typelist = await Promise.all(pokemonType.map( async(value,index)=>{
          const response = await fetch(`https://pokeapi.co/api/v2/type/${value}`);
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();

          
          data.pokemon.forEach((value)=>{
            typeset.add(value.pokemon)
            console.log(value.pokemon.url);
          })
          const sortedArray = [...typeset].sort((a, b) => extractId(a.url) - extractId(b.url));;
          
          setfilteredData(sortedArray)
          console.log(sortedArray);  

          return data.pokemon
        }))
          

        
          
          // setPokemonData(data.results)
          // setfilteredData(data.results)
        setisloading(false);
       
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
    fetchData();
  }, [pokemonType]);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = pokemonData.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber,index) =>{ 
    
    setCurrentPage(pageNumber);
    setActiveIndex(index)
    
  }

  function handleOnChange(e){
    console.log(e.target.value);
    setSerach(e.target.value);
    filterData(e.target.value)
  }
  
  function filterData(name){
    let searchTerm = name.toLowerCase();
    console.log(pokemonData);
    let filterdata = pokemonData.filter(pokemon => 
      {
        console.log(pokemon);
       return pokemon.name.toLowerCase().includes(searchTerm)
      });
      console.log(filterdata);
      
      setfilteredData(filterdata)
      console.log(currentPosts);

  }

  return (
    <main className="flex min-h-screen flex-col px-12 pt-10 max-sm:p-6 ">
      {/* Title */}
      <div className="max-sm:flex max-sm:flex-col my-2  " > <span className="text-3xl font-bold pe-5 max-sm:px-0 max-sm:border-b-2 md:border-r-2 border-[#5D5F7E] py-2">Pokédex</span><span className="px-5 font-semibold  text-[#5D5F7E] max-sm:px-0">Search for any Pokémon that exists on the planet</span></div>
      
      <PokePage pokemons={filteredData} isloading={isloading} handleOnChange={handleOnChange} handletypefilter={handletypefilter}></PokePage>
      {/* <Pagination postsPerPage={postsPerPage} totalPosts={pokemonData.length} paginate={paginate} activeIndex={activeIndex} ></Pagination> */}
    </main>
  );
}
