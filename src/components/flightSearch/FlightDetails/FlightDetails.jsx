import {
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightIcon from "@mui/icons-material/Flight";

const FlightDetails = (rows) => {
  // State to track if the row is expanded or collapsed
  const [open, setOpen] = React.useState(false);

  // Function to handle the toggle of flight details expansion
  const handleFlightDetails = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Tooltip title="Flight Details">
            <IconButton
              aria-label="expand row"
              size="small"
              // onClick={() => setOpen(!open)}
              onClick={() => handleFlightDetails()}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          {rows?.rows?.priceBreakDownWithMarkup?.airlineCode} -{" "}
          {rows?.rows?.priceBreakDownWithMarkup?.airlineId}
        </TableCell>
        <TableCell>
          {rows?.rows?.legs?.map((row) => (
            <p key={row?.id}>
              {row?.segmentDetails?.slice(0, 1)?.map((segment) => (
                <div key={segment?.id}>
                  <p>{segment?.origin?.airport}</p>
                  <p>{segment?.origin?.dateTime}</p>
                </div>
              ))}
            </p>
          ))}
        </TableCell>
        <TableCell>
          <Stack spacing={2} direction="row">
            {rows?.rows?.legs?.map((row) => (
              <div key={row?.id}>
                <p>{row?.segment?.departureLocation}</p>
                <FlightIcon />
                <p>{row?.segment?.arrivalLocation}</p>
              </div>
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          {rows?.rows?.legs?.map((row) => (
            <p key={row?.id}>
              {row?.segmentDetails?.slice(-1)?.map((segment) => (
                <div key={segment?.id}>
                  <p>{segment?.destination?.airport}</p>
                  <p>{segment?.destination?.dateTime}</p>
                </div>
              ))}
            </p>
          ))}
        </TableCell>
        <TableCell>
          {rows?.rows?.legs?.map((row) => (
            <div key={row?.id}>
              <p style={{ marginBottom: "10px" }}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(row?.segment?.departureDate))}
              </p>
            </div>
          ))}
          <Stack spacing={2} direction="row">
            ৳ {rows?.rows?.totalPrice?.totalPrice} -{" "}
            {rows?.rows?.totalPrice?.currency}
          </Stack>
          <Button variant="contained" sx={{ mt: 3 }}>
            Book Now
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Flight Details
              </Typography>
              {rows?.rows?.legs?.map((row) => (
                <div key={row.id}>
                  {row?.segmentDetails?.map((details) => (
                    <Paper key={details.id} sx={{ p: 2, mb: 1 }}>
                      <Grid container spacing={2} columns={16}>
                        <Grid item xs={4}>
                          <Typography>
                            {details?.fleet?.marketing} -{" "}
                            {details?.fleet?.equipment?.code}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            Origin - ({details?.origin?.airport})
                          </Typography>
                          <Typography>{details?.origin?.dateTime}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            Destination - ({details?.destination?.airport})
                          </Typography>
                          <Typography>
                            {details?.destination?.dateTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            Origin terminal - ({details?.origin?.terminal})
                          </Typography>
                          <Typography>
                            Destination terminal - (
                            {details?.destination?.terminal})
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </div>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default FlightDetails;
