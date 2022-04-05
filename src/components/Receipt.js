import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Receipt() {
  const items = useSelector((state) => state.products.items);
  const filtered = items.filter((item) => item.amount > 0);
  let spendMoney = 0;

  // eslint-disable-next-line array-callback-return
  filtered.map((item) => {
    spendMoney += item.price * item.amount;
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (filtered.length === 0) {
    return null;
  }

  return (
    <div style={{border:"1px solid #48bb78",borderRadius:"30px",margin:"5px 0px",padding:"0px 5px"}}>
      <Box>
        <Text fontSize={35} fontWeight={700}>
          Your Receipt
        </Text>
        <hr style={{ border: "1px solid #444" }}></hr>
        {filtered.map((item) => (
          <Grid templateColumns="repeat(3, 1fr)" gap={4} key={item.id}>
            <GridItem>
              <Text fontSize={12}  textAlign="start"> {item.title}</Text>{" "}
            </GridItem>
            <GridItem>
              <Text fontSize={12}> x {item.amount}</Text>
            </GridItem>
            <GridItem>
              <Text color="green.600" fontSize={12} textAlign="end">
                ${numberWithCommas(item.price * item.amount)}
              </Text>
            </GridItem>
          </Grid>
        ))}
        <hr style={{ border: "1px solid #444" }}></hr>
        <Text fontSize={20} fontWeight={700} float="left" ms={4} >
          Total:
        </Text>
        <Text
          color="green.500"
          float="right"
          me={5}
          mb={5}
          fontSize={20}
          as="kbd"
        >
          ${numberWithCommas(spendMoney)}
        </Text>
      </Box>
    </div>
  );
}

export default Receipt;
