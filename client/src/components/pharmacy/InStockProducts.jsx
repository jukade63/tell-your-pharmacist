import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useProduct } from "../../contexts/ProductContext";
import ProductItem from "./ProductItem";

function InStockProducts() {
  const { products } = useProduct();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 1, mb: 0.5 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Name</TableCell>
              <TableCell>Price(THB)</TableCell>
              <TableCell>Stocks</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p) => (
                <ProductItem key={p.id} {...p} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ mt: 0.5 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          component="div"
          count={products.length}
        />
      </Paper>
    </>
  );
}

export default InStockProducts;
