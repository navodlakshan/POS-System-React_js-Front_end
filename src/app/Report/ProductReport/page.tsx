"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
    TableHead,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TextField,
    InputAdornment,
    Grid
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

interface Product {
    id: number;
    image: string;
    name: string;
    sku: string;
    price: string;
    quantity: number;
    currentQuantity: number;
    refunded: number;
}

const initialProducts: Product[] = [
    { id: 1, image: "", name: "Laptop i7", sku: "lep001", price: "Rs.6000", quantity: 7, currentQuantity: 1, refunded: 1 },
    { id: 2, image: "", name: "Laptop i5", sku: "lep002", price: "Rs.5000", quantity: 5, currentQuantity: 2, refunded: 0 },
    { id: 3, image: "", name: "Laptop i9", sku: "lep003", price: "Rs.8000", quantity: 3, currentQuantity: 1, refunded: 2 },
];

const PrintableReport = React.forwardRef<HTMLDivElement, { products: Product[], searchQuery: string }>(({ products, searchQuery }, ref) => {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return (
        <div ref={ref} className="p-4 print:p-0">
            <div className="print:hidden mb-4">
                <h2 className="text-xl font-bold">Print Preview</h2>
                <p className="text-sm text-gray-500">This is how your report will look when printed.</p>
            </div>

            <div className="bg-white p-4 print:p-0">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Product Report</h1>
                    <p className="text-sm text-gray-600">Generated on: {currentDate} at {currentTime}</p>
                </div>

                <div className="mb-4 flex justify-between">
                    <div>
                        <p className="font-medium">Total Products: <span className="font-normal">{filteredProducts.length}</span></p>
                    </div>
                    <div>
                        <p className="font-medium">Filter: <span className="font-normal">{searchQuery || "All products"}</span></p>
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Image</th>
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2 text-left">SKU</th>
                        <th className="border p-2 text-left">Price</th>
                        <th className="border p-2 text-left">Qty</th>
                        <th className="border p-2 text-left">Curr Qty</th>
                        <th className="border p-2 text-left">Refund</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="border p-2">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                )}
                            </td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.sku}</td>
                            <td className="border p-2">{product.price}</td>
                            <td className="border p-2">{product.quantity}</td>
                            <td className="border p-2">{product.currentQuantity}</td>
                            <td className="border p-2">{product.refunded}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-8 text-sm text-gray-600">
                    <p>This report was generated automatically by the system.</p>
                    <p className="mt-2">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
});

PrintableReport.displayName = 'PrintableReport';

export default function ProductReportPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [openPrintDialog, setOpenPrintDialog] = useState(false);
    const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const printRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handlePrintDialogOpen = () => {
        setOpenPrintDialog(true);
    };

    const handlePrintDialogClose = () => {
        setOpenPrintDialog(false);
    };

    const handleAddDialogOpen = () => {
        setCurrentProduct({
            id: 0,
            image: "",
            name: "",
            sku: "",
            price: "",
            quantity: 0,
            currentQuantity: 0,
            refunded: 0
        });
        setIsEditMode(false);
        setOpenAddEditDialog(true);
    };

    const handleEditDialogOpen = (product: Product) => {
        setCurrentProduct({ ...product });
        setIsEditMode(true);
        setOpenAddEditDialog(true);
    };

    const handleDeleteDialogOpen = (product: Product) => {
        setCurrentProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleAddEditDialogClose = () => {
        setOpenAddEditDialog(false);
        setCurrentProduct(null);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setCurrentProduct(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev!,
            [name]: name === 'quantity' || name === 'currentQuantity' || name === 'refunded'
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSaveProduct = () => {
        if (!currentProduct) return;

        if (isEditMode) {
            setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
        } else {
            const newId = Math.max(...products.map(p => p.id), 0) + 1;
            setProducts([...products, { ...currentProduct, id: newId }]);
        }
        handleAddEditDialogClose();
    };

    const handleDeleteProduct = () => {
        if (!currentProduct) return;
        setProducts(products.filter(p => p.id !== currentProduct.id));
        handleDeleteDialogClose();
    };

    const handlePrint = useReactToPrint({
        pageContent: () => printRef.current,
        pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
      }
    `,
    });

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredProducts.length);
    const totalEntries = filteredProducts.length;

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center justify-between text-gray-500 mb-4">
                        <h2 className="text-2xl font-bold">Product Report</h2>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddDialogOpen}
                        >
                            Add Product
                        </Button>
                    </div>
                    <div className="p-6 bg-background text-gray-500 rounded-lg shadow-md">
                        <div className="flex justify-between mb-4">
                            <Typography variant="body1">All Products</Typography>
                            <div className="flex gap-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<PrintIcon />}
                                    onClick={handlePrintDialogOpen}
                                >
                                    Print
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    startIcon={<PictureAsPdfIcon />}
                                    onClick={() => alert("PDF export functionality would be implemented here")}
                                >
                                    PDF
                                </Button>
                                <TextField
                                    placeholder="Search products..."
                                    variant="outlined"
                                    size="small"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="product report table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Curr Qty</TableCell>
                                        <TableCell>Refund</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : filteredProducts
                                    ).map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                                )}
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.currentQuantity}</TableCell>
                                            <TableCell>{product.refunded}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditDialogOpen(product)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteDialogOpen(product)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={8} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={8}
                                                    count={filteredProducts.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    slotProps={{
                                                        select: {
                                                            inputProps: {
                                                                "aria-label": "rows per page",
                                                            },
                                                            native: true,
                                                        },
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            {/* Print Dialog */}
            <Dialog
                open={openPrintDialog}
                onClose={handlePrintDialogClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>Print Report</span>
                        <IconButton onClick={handlePrintDialogClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <PrintableReport
                        ref={printRef}
                        products={filteredProducts}
                        searchQuery={searchQuery}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handlePrintDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PrintIcon />}
                        onClick={() => {
                            handlePrint();
                            handlePrintDialogClose();
                        }}
                    >
                        Print
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Product Dialog */}
            <Dialog
                open={openAddEditDialog}
                onClose={handleAddEditDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>{isEditMode ? 'Edit Product' : 'Add New Product'}</span>
                        <IconButton onClick={handleAddEditDialogClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {currentProduct && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={currentProduct.name}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="SKU"
                                    name="sku"
                                    value={currentProduct.sku}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={currentProduct.quantity}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Current Quantity"
                                    name="currentQuantity"
                                    type="number"
                                    value={currentProduct.currentQuantity}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Refunded"
                                    name="refunded"
                                    type="number"
                                    value={currentProduct.refunded}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleAddEditDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProduct}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                maxWidth="sm"
            >
                <DialogTitle>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product &quot;{currentProduct?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleDeleteDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteProduct}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}