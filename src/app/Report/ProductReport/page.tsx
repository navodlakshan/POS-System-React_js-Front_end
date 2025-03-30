"use client";

import React, { useState } from "react";
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
import { TableHead, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Typography, Grid } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";

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

interface NewProduct {
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

export default function ProductReportPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [productsState, setProductsState] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<NewProduct>({
        id: 0,
        image: "",
        name: "",
        sku: "",
        price: "",
        quantity: 0,
        currentQuantity: 0,
        refunded: 0
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [darkMode, setDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (product: Product) => {
        setEditProduct(product);
    };

    const handleDelete = (product: Product) => {
        setDeleteProduct(product);
    };

    const handleSave = () => {
        if (editProduct) {
            const updatedProducts = productsState.map((p) =>
                p.id === editProduct.id ? editProduct : p
            );
            setProductsState(updatedProducts);
            setEditProduct(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteProduct) {
            const updatedProducts = productsState.filter((p) => p.id !== deleteProduct.id);
            setProductsState(updatedProducts);
            setDeleteProduct(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    const handlePrintPreview = () => {
        setIsPrintPreviewOpen(true);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Product Report</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            color: #333;
                        }
                        .print-header {
                            text-align: center;
                            margin-bottom: 20px;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 20px;
                        }
                        .print-title {
                            font-size: 22px;
                            font-weight: bold;
                            margin-bottom: 5px;
                            color: #2c3e50;
                        }
                        .print-date {
                            font-size: 14px;
                            color: #7f8c8d;
                            margin-bottom: 10px;
                        }
                        .print-summary {
                            font-size: 15px;
                            margin-bottom: 15px;
                            font-weight: 500;
                        }
                        .print-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        .print-table th {
                            background-color: #f8f9fa;
                            text-align: left;
                            padding: 10px;
                            border: 1px solid #dee2e6;
                            font-weight: 600;
                        }
                        .print-table td {
                            padding: 8px 10px;
                            border: 1px solid #dee2e6;
                        }
                        .print-table tr:nth-child(even) {
                            background-color: #f8f9fa;
                        }
                        .print-footer {
                            font-size: 12px;
                            text-align: center;
                            margin-top: 30px;
                            color: #7f8c8d;
                            border-top: 1px solid #eee;
                            padding-top: 20px;
                        }
                        @media print {
                            body {
                                margin: 0;
                                padding: 10px;
                            }
                            .print-header {
                                margin-bottom: 15px;
                            }
                            .no-print {
                                display: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-header">
                        <div class="print-title">Product Report</div>
                        <div class="print-date">Generated on: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</div>
                    </div>
                    
                    <div class="print-summary">Total Products: ${productsState.length}</div>
                    
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Curr Qty</th>
                                <th>Refund</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsState.map(product => `
                                <tr>
                                    <td>${product.image ? `<img src="${product.image}" alt="${product.name}" width="40" height="40" />` : '[ ]'}</td>
                                    <td>${product.name}</td>
                                    <td>${product.sku}</td>
                                    <td>${product.price}</td>
                                    <td>${product.quantity}</td>
                                    <td>${product.currentQuantity}</td>
                                    <td>${product.refunded}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="print-footer">
                        This report was generated automatically by the system.<br>
                        © ${new Date().getFullYear()} ABC Product Services (Pvt) Ltd. All rights reserved.
                    </div>
                    
                    <div class="no-print" style="text-align: center; margin-top: 20px;">
                        <button onclick="window.print()" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Print Report
                        </button>
                        <button onclick="window.close()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                            Close Window
                        </button>
                    </div>
                    
                    <script>
                        // Auto-print after a short delay
                        setTimeout(() => {
                            window.print();
                        }, 300);
                        
                        // Close window after printing
                        window.onafterprint = function() {
                            setTimeout(() => {
                                window.close();
                            }, 300);
                        };
                    </script>
                </body>
            </html>
        `);
            printWindow.document.close();
        } else {
            alert('Popup blocker might be preventing the print window from opening. Please allow popups for this site.');
        }
        setIsPrintPreviewOpen(false);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newProduct.name) newErrors.name = "Product name is required";
        if (!newProduct.sku) newErrors.sku = "SKU is required";
        if (!newProduct.price) newErrors.price = "Price is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddProduct = () => {
        if (!validateForm()) return;

        const newProductEntry: Product = {
            id: Math.max(...productsState.map(p => p.id), 0) + 1,
            image: newProduct.image,
            name: newProduct.name,
            sku: newProduct.sku,
            price: newProduct.price,
            quantity: newProduct.quantity,
            currentQuantity: newProduct.currentQuantity,
            refunded: newProduct.refunded
        };

        setProductsState([...productsState, newProductEntry]);
        setIsAddProductModalOpen(false);
        setNewProduct({
            id: 0,
            image: "",
            name: "",
            sku: "",
            price: "",
            quantity: 0,
            currentQuantity: 0,
            refunded: 0
        });
    };

    const filteredProducts = productsState.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "price") {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        } else if (sortBy === "quantity") {
            return sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedProducts.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedProducts.length);
    const totalEntries = sortedProducts.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Product Report</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4">All Products</h2>
                        <div className="flex justify-between mb-4">
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
                            <div className="flex gap-4">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsAddProductModalOpen(true)}
                                >
                                    Add Sale
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<PrintIcon />}
                                    onClick={handlePrintPreview}
                                >
                                    Print
                                </Button>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="sku">SKU</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                        <MenuItem value="quantity">Quantity</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Order</InputLabel>
                                    <Select
                                        value={sortOrder}
                                        onChange={handleSortOrderChange}
                                        label="Order"
                                    >
                                        <MenuItem value="asc">Ascending</MenuItem>
                                        <MenuItem value="desc">Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
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
                                            ? sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedProducts
                                    ).map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell component="th" scope="row">
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
                                            <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color= "primary"
                                                    size="small"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(product)}
                                                >
                                                    Delete
                                                </Button>
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
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={8}
                                                    count={sortedProducts.length}
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

            {/* Update Modal */}
            <Modal open={!!editProduct} onClose={() => setEditProduct(null)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    backgroundColor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    color: darkMode ? "text.primary" : "text.secondary"
                }}>
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <TextField
                        label="Name"
                        value={editProduct?.name || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="SKU"
                        value={editProduct?.sku || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, sku: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={editProduct?.price || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, price: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={editProduct?.quantity || 0}
                        onChange={(e) => setEditProduct({ ...editProduct!, quantity: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Current Quantity"
                        type="number"
                        value={editProduct?.currentQuantity || 0}
                        onChange={(e) => setEditProduct({ ...editProduct!, currentQuantity: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Refunded"
                        type="number"
                        value={editProduct?.refunded || 0}
                        onChange={(e) => setEditProduct({ ...editProduct!, refunded: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setEditProduct(null)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteProduct} onClose={() => setDeleteProduct(null)}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product &quot;{deleteProduct?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteProduct(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Product Modal */}
            <Modal open={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)}>
                <Grid sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    backgroundColor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    color: darkMode ? "text.primary" : "text.secondary"
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Add New Product
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Product Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="SKU"
                                value={newProduct.sku}
                                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.sku}
                                helperText={errors.sku}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Current Quantity"
                                type="number"
                                value={newProduct.currentQuantity}
                                onChange={(e) => setNewProduct({ ...newProduct, currentQuantity: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Refunded"
                                type="number"
                                value={newProduct.refunded}
                                onChange={(e) => setNewProduct({ ...newProduct, refunded: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddProduct}
                        >
                            Save Product
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddProductModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Modal>

            {/* Print Preview Modal */}
            <Modal open={isPrintPreviewOpen} onClose={() => setIsPrintPreviewOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    color: darkMode ? "text.primary" : "text.secondary"
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                            Print Report
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Print Preview
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            This is how your report will look when printed.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Product Report
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Total Products: {productsState.length}
                    </Typography>

                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>SKU</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Curr Qty</TableCell>
                                    <TableCell>Refund</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsState.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>[ ]</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.sku}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.currentQuantity}</TableCell>
                                        <TableCell>{product.refunded}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}>
                        This report was generated automatically by the system.
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        © {new Date().getFullYear()} ABC Product Services (Pvt) Ltd. All rights reserved.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setIsPrintPreviewOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                        >
                            Print
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}