import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import initialData from './data/quotationData.json'; // ✅ Load pre-filled data

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState(initialData); // ✅ Use JSON here
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedCode, setSelectedCode] = useState(products[0].code);

  const addItem = () => {
    const product = products.find((v) => itemRef.current.value === v.code);
    const newItem = {
      item: product.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0,
    };

    const existingIndex = dataItems.findIndex(
      (v) => v.item === newItem.item && v.ppu === newItem.ppu
    );

    if (existingIndex !== -1) {
      const updated = [...dataItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        qty: updated[existingIndex].qty + newItem.qty,
        discount: updated[existingIndex].discount + newItem.discount,
      };
      setDataItems(updated);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    const newItems = [...dataItems];
    newItems.splice(index, 1);
    setDataItems(newItems);
  };

  const clearAll = () => {
    setDataItems([]);
  };

  const productChange = (e) => {
    const code = e.target.value;
    setSelectedCode(code);
    const product = products.find((v) => v.code === code);
    setPpu(product.price);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="flex-start">
        {/* Form Panel */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            backgroundColor: "#e4e4e4",
            p: 3,
            borderRadius: 1,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Item
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="item-label">Item</InputLabel>
            <Select
              labelId="item-label"
              inputRef={itemRef}
              value={selectedCode}
              label="Item"
              onChange={productChange}
              sx={{ backgroundColor: "#ffffff" }}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price Per Unit"
            type="number"
            inputRef={ppuRef}
            value={ppu}
            onChange={(e) => setPpu(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff" }}
          />

          <TextField
            label="Quantity"
            type="number"
            inputRef={qtyRef}
            defaultValue={1}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff" }}
          />

          <TextField
            label="Discount"
            type="number"
            inputRef={discountRef}
            defaultValue={0}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={addItem}
          >
            Add
          </Button>
        </Grid>

        {/* Table Panel */}
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
