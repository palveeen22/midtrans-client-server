import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [order_id, setOrder_id] = useState("");
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  const processTransaction = async () => {
    const data = {
      name: name,
      order_id: order_id,
      total: total,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${apiUrl}/api/payment/process-transaction`,
      data,
      config
    );

    setToken(response.data.token);
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });

      setName("");
      setOrder_id("");
      setTotal("");
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = import.meta.env.VITE_MIDTRANS_API;
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] flex flex-col  paddingX paddingY gap-6">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100hv",
          width: "100hv",
          p: 4,
        }}
      >
        <TextField
          type="name"
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          type="name"
          label="Order ID"
          value={order_id}
          onChange={(e) => setOrder_id(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          type="name"
          label="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box>
          <Button
            onClick={processTransaction}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Process
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
