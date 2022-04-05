import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Money() {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const navMoney = useSelector((state) => state.products.navMoney);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Box
        bg="green"
        display="flex"
        justifyContent="center"
        w="90%"
        height="50px"
        p={4}
        m={4}
        color="white"
        position="fixed"
        opacity="0.9"
        borderRadius="0 0 30px 30px"
        zIndex="1"
      >
        <Image
          borderRadius="full"
          boxSize="30px"
          src="https://www.pngmart.com/files/17/Bill-Gates-PNG-Transparent-Image.png"
        />{" "}
        Spend Bill Gates' Money : {numberWithCommas(navMoney)}
        <Image
          borderRadius="full"
          boxSize="30px"
          src="https://www.pngmart.com/files/17/Bill-Gates-PNG-Transparent-Image.png"
        />
      </Box>
    </div>
  );
}

export default Money;
