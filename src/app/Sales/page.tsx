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
import { TableHead, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

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

const sales = [
    {
        billId: 1,
        name: "Leptap IP",
        sku: "lupiXII",
        category: "Computer",
        quantity: 78,
        price: "Rs. 70,000",
        soldBy: "Athens",
        date: "2024/03/07", // Ensure this is a string
    },
    // Add more sales entries as needed
];

export default function ViewSales() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editSale, setEditSale] = useState<typeof sales[0] | null>(null);
    const [deleteSale, setDeleteSale] = useState<typeof sales[0] | null>(null);
    const [salesState, setSalesState] = useState(sales);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);
    const [newSale, setNewSale] = useState({
        billId: 0,
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        price: "",
        soldBy: "",
        date: "", // Initialize as a string
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const handleEdit = (sale: typeof sales[0]) => {
        setEditSale(sale);
    };

    const handleDelete = (sale: typeof sales[0]) => {
        setDeleteSale(sale);
    };

    const handleSave = () => {
        if (editSale) {
            const updatedSales = salesState.map((s) =>
                s.billId === editSale.billId ? editSale : s
            );
            setSalesState(updatedSales);
            setEditSale(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteSale) {
            const updatedSales = salesState.filter((s) => s.billId !== deleteSale.billId);
            setSalesState(updatedSales);
            setDeleteSale(null);
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

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!newSale.name) newErrors.name = "Name is required";
        if (!newSale.sku) newErrors.sku = "SKU is required";
        if (!newSale.category) newErrors.category = "Category is required";
        if (!newSale.quantity) newErrors.quantity = "Quantity is required";
        if (!newSale.price) newErrors.price = "Price is required";
        if (!newSale.soldBy) newErrors.soldBy = "Sold By is required";
        if (!newSale.date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSale = () => {
        if (!validateForm()) return;

        const newSaleWithId = { ...newSale, billId: salesState.length + 1 };
        setSalesState([...salesState, newSaleWithId]);
        setIsAddSaleModalOpen(false);
        setNewSale({
            billId: 0,
            name: "",
            sku: "",
            category: "",
            quantity: 0,
            price: "",
            soldBy: "",
            date: "", // Reset to an empty string
        });
    };

    const filteredSales = salesState.filter((sale) =>
        sale.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedSales = filteredSales.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "quantity") {
            return sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
        } else if (sortBy === "price") {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        } else if (sortBy === "date") {
            return sortOrder === "asc" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedSales.length) : 0;

    // Calculate the range of entries being shown
    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedSales.length);
    const totalEntries = sortedSales.length;

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center justify-between text-gray-500">
                        <h2 className="text-2xl font-bold mb-4">Sales</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">All Sales</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search sales..."
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
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="quantity">Quantity</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                        <MenuItem value="date">Date</MenuItem>
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
                                        <TableCell>Bill ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Sold By</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedSales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedSales
                                    ).map((sale, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{sale.billId}</TableCell>
                                            <TableCell>{sale.name}</TableCell>
                                            <TableCell>{sale.sku}</TableCell>
                                            <TableCell>{sale.category}</TableCell>
                                            <TableCell>{sale.quantity}</TableCell>
                                            <TableCell>{sale.price}</TableCell>
                                            <TableCell>{sale.soldBy}</TableCell>
                                            <TableCell>{sale.date}</TableCell>
                                            <TableCell>
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                    onClick={() => setIsAddSaleModalOpen(true)}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                    onClick={() => handleEdit(sale)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleDelete(sale)}
                                                >
                                                    Delete
                                                </button>
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
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <TablePagination
                                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                        colSpan={8}
                                                        count={sortedSales.length}
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
            <Modal open={!!editSale} onClose={() => setEditSale(null)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, backgroundColor: "background.paper", boxShadow: 24, p: 4 }}>
                    <h2 className="text-xl font-bold mb-4">Edit Sale</h2>
                    <TextField
                        label="Name"
                        value={editSale?.name || ""}
                        onChange={(e) => setEditSale({ ...editSale!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="SKU"
                        value={editSale?.sku || ""}
                        onChange={(e) => setEditSale({ ...editSale!, sku: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.sku}
                        helperText={errors.sku}
                    />
                    <TextField
                        label="Category"
                        value={editSale?.category || ""}
                        onChange={(e) => setEditSale({ ...editSale!, category: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.category}
                        helperText={errors.category}
                    />
                    <TextField
                        label="Quantity"
                        value={editSale?.quantity || 0}
                        onChange={(e) => setEditSale({ ...editSale!, quantity: parseInt(e.target.value, 10) })}
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                    <TextField
                        label="Price"
                        value={editSale?.price || ""}
                        onChange={(e) => setEditSale({ ...editSale!, price: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Sold By"
                        value={editSale?.soldBy || ""}
                        onChange={(e) => setEditSale({ ...editSale!, soldBy: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.soldBy}
                        helperText={errors.soldBy}
                        sx={{ mb: 2 }} // Add margin bottom to create a gap
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={editSale?.date ? dayjs(editSale.date) : null}
                            onChange={(newValue: Dayjs | null) => {
                                setEditSale({ ...editSale!, date: newValue ? newValue.format('YYYY/MM/DD') : "" });
                            }}
                            sx={{ width: '100%' }} // Ensure DatePicker takes full width
                        />
                    </LocalizationProvider>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteSale} onClose={() => setDeleteSale(null)}>
                <DialogTitle>Delete Sale</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the sale &quot;{deleteSale?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteSale(null)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Sale Modal */}
            <Modal open={isAddSaleModalOpen} onClose={() => setIsAddSaleModalOpen(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, backgroundColor: "background.paper", boxShadow: 24, p: 4 }}>
                    <h2 className="text-xl font-bold mb-4">Add Sale</h2>
                    <TextField
                        label="Name"
                        value={newSale.name}
                        onChange={(e) => setNewSale({ ...newSale, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="SKU"
                        value={newSale.sku}
                        onChange={(e) => setNewSale({ ...newSale, sku: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.sku}
                        helperText={errors.sku}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newSale.category}
                            onChange={(e) => setNewSale({ ...newSale, category: e.target.value })}
                            label="Category"
                            error={!!errors.category}
                        >
                            <MenuItem value="Computer">Computer</MenuItem>
                            <MenuItem value="Mobile Phone">Mobile Phone</MenuItem>
                        </Select>
                        {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
                    </FormControl>
                    <TextField
                        label="Quantity"
                        value={newSale.quantity}
                        onChange={(e) => setNewSale({ ...newSale, quantity: parseInt(e.target.value, 10) })}
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                    <TextField
                        label="Price"
                        value={newSale.price}
                        onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Sold By"
                        value={newSale.soldBy}
                        onChange={(e) => setNewSale({ ...newSale, soldBy: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.soldBy}
                        helperText={errors.soldBy}
                        sx={{ mb: 2 }} // Add margin bottom to create a gap
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={newSale.date ? dayjs(newSale.date) : null}
                            onChange={(newValue: Dayjs | null) => {
                                setNewSale({ ...newSale, date: newValue ? newValue.format('YYYY/MM/DD') : "" });
                            }}
                            sx={{ width: '100%', mb: 2 }} // Ensure DatePicker takes full width
                        />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleAddSale} sx={{ mt: 2 }}>
                            Add
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setIsAddSaleModalOpen(false)} sx={{ mt: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}