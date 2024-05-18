import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import FlightDetails from "./FlightDetails/FlightDetails";
import { Container, Skeleton, TablePagination } from "@mui/material";

const FlightSearch = () => {
  // State to store the flight data
  const [data, setData] = React.useState(null);
  // State to manage loading status
  const [loading, setLoading] = React.useState(true);
  // State to track the current page for pagination
  const [page, pagechange] = React.useState(0);
  // State to track the number of rows per page for pagination
  const [rowperpage, rowperpagechange] = React.useState(5);

  // Function to handle page change in pagination
  const handlechangepage = (event, newPage) => {
    pagechange(newPage);
  };

  // Function to handle change in rows per page
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  // Fetch flight data on component mount
  React.useEffect(() => {
    fetch("/flightSearch.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  // Extract rows from data
  const rows = data?.result;

  // const rows = []  check rows when there have no data

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <p
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {rows && rows?.length} Flight available
      </p>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {rows && rows?.length > 0 ? (
                <>
                  {rows
                    ?.slice(page * rowperpage, page * rowperpage + rowperpage)
                    ?.map((row) => (
                      <FlightDetails key={row?.id} rows={row} />
                    ))}
                </>
              ) : (
                <p style={{ padding: "15px" }}>No Flight Available</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Show skeleton loaders while data is loading
        <>
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
          <Skeleton
            sx={{ bgcolor: "grey.200", mb: 2 }}
            variant="rectangular"
            width="100%"
            height={122}
          />
        </>
      )}

      {/* Table pagination component */}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowperpage}
        page={page}
        count={rows?.length}
        component="div"
        onPageChange={handlechangepage}
        onRowsPerPageChange={handleRowsPerPage}
      ></TablePagination>
    </Container>
  );
};

export default FlightSearch;
