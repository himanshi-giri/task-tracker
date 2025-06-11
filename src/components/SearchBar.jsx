// Component for real-time search
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <>
    
 <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ margin: '20px', width: '90%', height:"30px" , borderRadius: "10px", border:"2px solid #B2BEB5", fontSize:"18px" }}
      
   />
    
    
   

    </>
  );
}

export default SearchBar;