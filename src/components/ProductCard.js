import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Badge,
  Button,
  Center,
  NumberInput,
  NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateAmount } from "../redux/products/productsSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function ProductCard({ id }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const item = items.find((e) => e.id === id);
  const navMoney = useSelector((state) => state.products.navMoney);

  const [amount, setAmount] = useState(item.amount);
  const [isBuyable, setIsBuyable] = useState(false);
  const [isSellable, setIsSellable] = useState(true);
  const maxBuy = Math.floor(navMoney / item.price);
  const max = Number(amount) + Number(maxBuy);

  useEffect(() => {
    dispatch(updateAmount({ id: item.id, amount: amount }));
    purchaseControl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, dispatch, item.id]);

  useEffect(() => {
    if (item.price > navMoney) {
      setIsBuyable(true);
    }
    if (item.price <= navMoney) {
      setIsBuyable(false);
    }
  }, [navMoney, item.price]);

  const buy = () => {
    handleChange(Number(amount) + 1);
    alertify.success(Number(item.amount) + 1 + " x " + item.title + " bought!");
  };

  const sell = () => {
    handleChange(Number(amount) - 1);
    if (Number(item.amount) - 1 > 1) {
      alertify.error(
        item.title +
          " sold! " +
          (Number(item.amount) - 1) +
          " " +
          item.title +
          "'s left"
      );
    } else if (Number(item.amount) - 1 === 1) {
      alertify.error(
        item.title +
          " sold! " +
          (Number(item.amount) - 1) +
          " " +
          item.title +
          " left"
      );
    } else {
      alertify.error(
        item.title + " sold! You have no " + item.title + " anymore..."
      );
    }
  };
  const purchaseControl = () => {
    if (amount > 0) {
      setIsSellable(false);
    }
    if (amount === 0) {
      setIsSellable(true);
    }
  };

  const handleChange = (targetValue) => {
    if (targetValue > max && navMoney > 0) {
      setAmount(max);
    } else if (targetValue < 0) {
      setAmount(0);
    } else if (navMoney <= 0 && targetValue < amount) {
      setAmount(targetValue);
    } else {
      setAmount(targetValue);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // if (navMoney === 0) {
  //   alertify.success("Congratulations!!! Bill Gates is broke now... or not :)");
  // }

  return (
    <div style={{ margin: "5px", marginTop: "27px" }}>
      <Box
        w="100%"
        h="100%"
        p={4}
        color="black"
        borderWidth="1px"
        borderColor="green.400"
        borderRadius="lg"
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        flexDirection="column"
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          m="auto"
          borderRadius="lg"
          maxWidth={350}
        />

        <Box
          p="3"
          display="flex"
          justifyContent="space-around"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {item.title}
          </Box>
          <Center p="3">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="5" bg="cyan.200" fontSize="16px">
                ${numberWithCommas(item.price)}
              </Badge>
            </Box>
          </Center>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              colorScheme="green"
              variant="solid"
              isDisabled={isBuyable}
              onClick={() => buy()}
            >
              Buy
            </Button>
            <NumberInput
              mr={5}
              ml={5}
              size="md"
              maxW={20}
              value={amount}
              isDisabled={isBuyable}
            >
              <NumberInputField
                value={amount}
                min={0}
                max={maxBuy}
                onChange={(e) => handleChange(e.target.value)}
              />
            </NumberInput>
            <Button
              colorScheme="red"
              variant="outline"
              isDisabled={isSellable}
              onClick={() => sell()}
            >
              Sell
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProductCard;
