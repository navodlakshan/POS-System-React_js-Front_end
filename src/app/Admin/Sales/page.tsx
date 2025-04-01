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
import {
    TableHead,
    Modal,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Typography,
    Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

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

interface Sale {
    billId: number;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    price: string;
    soldBy: string;
    date: string;
}

interface NewSale {
    billId: number;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    price: string;
    soldBy: string;
    date: string;
}

const initialSales: Sale[] = [
    {
        billId: 1,
        name: "Laptop i7",
        sku: "Lap001",
        category: "Computer",
        quantity: 78,
        price: "Rs.70,000",
        soldBy: "Athens",
        date: "2024/03/07",
    },
    // ... other initial sales data
];

export default function ViewSales() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [salesState, setSalesState] = useState<Sale[]>(initialSales);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editSale, setEditSale] = useState<Sale | null>(null);
    const [deleteSale, setDeleteSale] = useState<Sale | null>(null);
    const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);
    const [newSale, setNewSale] = useState<NewSale>({
        billId: 0,
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        price: "",
        soldBy: "",
        date: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

    const handleEdit = (sale: Sale) => {
        setEditSale(sale);
    };

    const handleDelete = (sale: Sale) => {
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
        const newErrors: Record<string, string> = {};
        if (!newSale.name) newErrors.name = "Product name is required";
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

        const newSaleEntry: Sale = {
            ...newSale,
            billId: Math.max(...salesState.map(s => s.billId), 0) + 1
        };

        setSalesState([...salesState, newSaleEntry]);
        setIsAddSaleModalOpen(false);
        setNewSale({
            billId: 0,
            name: "",
            sku: "",
            category: "",
            quantity: 0,
            price: "",
            soldBy: "",
            date: ""
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
        } else if (sortBy === "price") {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        } else if (sortBy === "date") {
            return sortOrder === "asc"
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedSales.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedSales.length);
    const totalEntries = sortedSales.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 transition-all">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Sales</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsAddSaleModalOpen(true)}
                                >
                                    Add Sale
                                </Button>
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedSales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedSales
                                    ).map((sale) => (
                                        <TableRow key={sale.billId}>
                                            <TableCell>{sale.billId}</TableCell>
                                            <TableCell>{sale.name}</TableCell>
                                            <TableCell>{sale.sku}</TableCell>
                                            <TableCell>{sale.category}</TableCell>
                                            <TableCell>{sale.quantity}</TableCell>
                                            <TableCell>{sale.price}</TableCell>
                                            <TableCell>{sale.soldBy}</TableCell>
                                            <TableCell>{sale.date}</TableCell>
                                            <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color= "primary"
                                                    size="small"
                                                    onClick={() => handleEdit(sale)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(sale)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={9} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={9} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={9}
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
                    <h2 className="text-xl font-bold mb-4">Edit Sale</h2>
                    <TextField
                        label="Name"
                        value={editSale?.name || ""}
                        onChange={(e) => setEditSale({ ...editSale!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="SKU"
                        value={editSale?.sku || ""}
                        onChange={(e) => setEditSale({ ...editSale!, sku: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Category"
                        value={editSale?.category || ""}
                        onChange={(e) => setEditSale({ ...editSale!, category: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={editSale?.quantity || ""}
                        onChange={(e) => setEditSale({ ...editSale!, quantity: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={editSale?.price || ""}
                        onChange={(e) => setEditSale({ ...editSale!, price: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Sold By"
                        value={editSale?.soldBy || ""}
                        onChange={(e) => setEditSale({ ...editSale!, soldBy: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date"
                        value={editSale?.date || ""}
                        onChange={(e) => setEditSale({ ...editSale!, date: e.target.value })}
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
                            onClick={() => setEditSale(null)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
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
                    <Button variant="outlined" onClick={() => setDeleteSale(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Sale Modal */}
            <Modal open={isAddSaleModalOpen} onClose={() => setIsAddSaleModalOpen(false)}>
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
                        Add New Sale
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Product Name"
                                value={newSale.name}
                                onChange={(e) => setNewSale({ ...newSale, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="SKU"
                                value={newSale.sku}
                                onChange={(e) => setNewSale({ ...newSale, sku: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.sku}
                                helperText={errors.sku}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={newSale.quantity}
                                onChange={(e) => setNewSale({ ...newSale, quantity: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price"
                                value={newSale.price}
                                onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Sold By"
                                value={newSale.soldBy}
                                onChange={(e) => setNewSale({ ...newSale, soldBy: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.soldBy}
                                helperText={errors.soldBy}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Sale Date"
                                    value={newSale.date ? dayjs(newSale.date) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setNewSale({ ...newSale, date: newValue ? newValue.format('YYYY/MM/DD') : "" });
                                    }}
                                    sx={{ width: '100%', mt: 2 }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.date,
                                            helperText: errors.date
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddSale}
                        >
                            Add Sale
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddSaleModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Modal>
        </div>
    );
}