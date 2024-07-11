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
  const [pokemonDataSlice, setpokemonDataSlice] = useState([])
  const [isloading, setisloading]= useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);
  const [activeIndex, setActiveIndex] = useState(null);
  const[modal,setModel] = useState(false)
  const [pokemonType, setPokemonType] = useState(null)

  
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
        setisloading(false);
       
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonData.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber,index) =>{ 
    
    setCurrentPage(pageNumber);
    setActiveIndex(index)
    
  }


  

  return (
    <main className="flex min-h-screen flex-col px-12 pt-10 max-sm:p-6 ">
      {/* Title */}
      <div className="max-sm:flex max-sm:flex-col   " > <span className="text-3xl font-bold px-3 max-sm:px-0 max-sm:border-b-2 md:border-r-2 border-[#5D5F7E] py-1">Pokédex</span><span className="p-2  max-sm:px-0">Search for any Pokémon that exists on the planet</span></div>
      
      <PokePage pokemons={currentPosts} isloading={isloading}></PokePage>
      <Pagination postsPerPage={postsPerPage} totalPosts={pokemonData.length} paginate={paginate} activeIndex={activeIndex} ></Pagination>
    </main>
  );
}
