import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';


let GetExpApi = () => {
    const [emps, setEmps] = useState([]);
    const [pageNum, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const pagesVisited = pageNum * itemsPerPage;

    const pageCount = Math.ceil(emps.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };




    useEffect(() => 
    {
        const fetchData = async () => 
        {
        try 
        {
                //const response = await fetch("http://localhost:8080/product");
                const response = await fetch("https://jsonplaceholder.typicode.com/comments") //optional api for check 1000 data 
                    if (!response.ok) 
                    {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                const data = await response.json();
                setEmps(data);
        }
            catch (error)
            {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
  


    const displayData = emps
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((v) => (
            // <tr key={v.EMPNO}>    {/*This data is used for database fetch api data  place holder data */}
            //     <td>{v.EMPNO}</td>
            //     <td>{v.ENAME}</td>
            //     <td>{v.JOB}</td>
            //     <td>{v.DEPTNO}</td>
            // </tr>
             <tr key={v.id}> {/*This data is used for json place holder data */}
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.body}</td>
            </tr>
        ));

    return (
        <div>
            <h1>Get Employee information from your DB</h1>
            <table border={2}>
                <thead>
                    <tr>
                        <th>EMPLOYEE NO</th>
                        <th>EMPLOYEE Name</th>
                        <th>EMPLOYEE JOB</th>
                        <th>EMPLOYEE DEPT</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageRangeDisplayed={0}
                marginPagesDisplayed={0}
            />
        </div>
    )
}

export default GetExpApi;


// import React, { useEffect, useState } from "react";
// import ReactPaginate from 'react-paginate';
// import './App.css';

// let GetExpApi = () => {
//   const [emps, setEmps] = useState([]);
//   const [pageNum, setPageNumber] = useState(0);
//   const itemsPerPage = 10;
//   const pagesVisited = pageNum * itemsPerPage;

//   const pageCount = Math.ceil(emps.length / itemsPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/product");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setEmps(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Optionally display an error message to the user
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array: fetch data only once on component mount

//   const displayData = emps
//     .slice(pagesVisited, pagesVisited + itemsPerPage)
//     .map((v) => (
//       <tr key={v.EMPNO}> {/* Use a unique key like EMPNO */}
//         <td>{v.EMPNO}</td>
//         <td>{v.ENAME}</td>
//         <td>{v.JOB}</td>
//         <td>{v.DEPTNO}</td>
//       </tr>
//     ));

//   return (
//     <div>
//       <h1>Get Employee information from your DB</h1>
//       <table border={2}>
//         <thead>
//           <tr>
//             <th>Employee No</th>
//             <th>Employee Name</th>
//             <th>Job</th>
//             <th>Department No</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayData.length > 0 ? (
//             displayData
//           ) : (
//             <tr>
//               <td colSpan={4}>No data found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         pageCount={pageCount}
//         onPageChange={changePage}
//         containerClassName={"pagination"}
//         previousLinkClassName={"pagination__link"}
//         nextLinkClassName={"pagination__link"}
//         disabledClassName={"pagination__link--disabled"}
//         activeClassName={"pagination__link--active"}
//         pageRangeDisplayed={0}
//         marginPagesDisplayed={0}
//       />
//     </div>
//   );
// };

// export default GetExpApi;
