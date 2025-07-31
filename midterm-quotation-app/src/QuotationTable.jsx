import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quotation
        </Typography>
        <Typography variant="body1">
          <CiShoppingCart /> No items
        </Typography>
      </Container>
    );
  }

  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);
  const totalBeforeDiscount = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container sx={{ mt: 4, maxWidth: '100% !important' }}>

      <Box mb={2}>
        <Typography variant="h5" gutterBottom>
          Quotation
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearAll}
          startIcon={<MdClear />}
          size="small"
        >
          Clear
        </Button>
      </Box>


      <TableContainer component={Paper} sx={{ width: '100%' }}>

        <Table size="small" sx={{ width: "100%" }}>

          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>-</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Qty</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Price/Unit</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Discount</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu - (v.discount || 0);
              const isStriped = i % 2 === 1;

              return (
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor: isStriped ? "#f9f9f9" : "white",
                    "&:last-child td, &:last-child th": { borderBottom: "1px solid #ccc" },
                  }}
                >
                  <TableCell align="center">
                    <BsFillTrashFill
                      onClick={() => handleDelete(i)}
                      style={{ cursor: "pointer", verticalAlign: "middle" }}
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount || 0}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              );
            })}

            {/* Footer rows */}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography fontWeight="bold">Total Discount</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">{totalDiscount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography fontWeight="bold">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">{totalAfterDiscount}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
