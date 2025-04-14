"use client";

import React, { useState } from "react";
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
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import CashierSidebar from "@/components/CashierSidebar";
import CashierHeader from "@/components/CashierHeader";

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

interface Refund {
    image: string;
    name: string;
    sku: string;
    price: string;
    date: string;
    reason: string;
    proceed_by: string;
    customer: string;
    notes: string;
}

interface NewRefund {
    name: string;
    sku: string;
    price: string;
    date: string;
    reason: string;
    proceed_by: string;
    customer: string;
    notes: string;
    image: string;
}

const initialRefunds: Refund[] = [
    {
        image: "https://via.placeholder.com/50",
        name: "Laptop 7",
        sku: "Lap001",
        price: "Rs.70,000",
        date: "2024/03/07",
        reason: "Production Issues",
        proceed_by: "Pawan",
        customer: "Nimal",
        notes: "Successfull",
    },
];

export default function RefundPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [refundsState, setRefundsState] = useState<Refund[]>(initialRefunds);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [editProduct, setEditProduct] = useState<Refund | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Refund | null>(null);
    const [isAddRefundModalOpen, setIsAddRefundModalOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [newRefund, setNewRefund] = useState<NewRefund>({
        image: "",
        name: "",
        sku: "",
        price: "",
        date: "",
        reason: "",
        proceed_by: "",
        customer: "",
        notes: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [darkMode, setDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setNewRefund(prev => ({ ...prev, image: URL.createObjectURL(event.target.files![0]) }));
            setErrors(prev => ({ ...prev, image: "" }));
        }
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (refund: Refund) => {
        setEditProduct(refund);
    };

    const handleDelete = (refund: Refund) => {
        setDeleteProduct(refund);
    };

    const handleSave = () => {
        if (editProduct) {
            const updatedRefunds = refundsState.map(p =>
                p.sku === editProduct.sku ? editProduct : p
            );
            setRefundsState(updatedRefunds);
            setEditProduct(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteProduct) {
            const updatedRefunds = refundsState.filter(p => p.sku !== deleteProduct.sku);
            setRefundsState(updatedRefunds);
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newRefund.name) newErrors.name = "Product name is required";
        if (!newRefund.sku) newErrors.sku = "SKU is required";
        if (!newRefund.price) newErrors.price = "Price is required";
        if (!newRefund.date) newErrors.date = "Date is required";
        if (!newRefund.reason) newErrors.reason = "Reason is required";
        if (!newRefund.proceed_by) newErrors.proceed_by = "Processed by is required";
        if (!newRefund.customer) newErrors.customer = "Customer name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddRefund = () => {
        if (!validateForm()) return;

        const newRefundEntry: Refund = {
            image: image ? URL.createObjectURL(image) : "https://via.placeholder.com/50",
            name: newRefund.name,
            sku: newRefund.sku,
            price: newRefund.price,
            date: newRefund.date,
            reason: newRefund.reason,
            proceed_by: newRefund.proceed_by,
            customer: newRefund.customer,
            notes: newRefund.notes
        };

        setRefundsState([...refundsState, newRefundEntry]);
        setIsAddRefundModalOpen(false);
        setNewRefund({
            image: "",
            name: "",
            sku: "",
            price: "",
            date: "",
            reason: "",
            proceed_by: "",
            customer: "",
            notes: ""
        });
        setImage(null);
    };

    const filteredRefunds = refundsState.filter(refund =>
        refund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedRefunds = filteredRefunds.sort((a, b) => {
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRefunds.length) : 0;
    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedRefunds.length);
    const totalEntries = sortedRefunds.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <CashierSidebar />}
            <div className="flex-1 transition-all">
                <CashierHeader
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className={"text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}"}>Refund</h2>
                    </div>
                    <div className={"p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800 ${darkMode ? 'bg-gray-800' : 'bg-white'}"}>
                        <h2 className={"text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}"}>All Refunds</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search refunds..."
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
                                    onClick={() => setIsAddRefundModalOpen(true)}
                                >
                                    Add Refund
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
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Reason</TableCell>
                                        <TableCell>Proceed By</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedRefunds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedRefunds
                                    ).map((refund, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={refund.image}
                                                    alt={refund.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded"
                                                />
                                            </TableCell>
                                            <TableCell>{refund.name}</TableCell>
                                            <TableCell>{refund.sku}</TableCell>
                                            <TableCell>{refund.price}</TableCell>
                                            <TableCell>{refund.date}</TableCell>
                                            <TableCell>{refund.reason}</TableCell>
                                            <TableCell>{refund.proceed_by}</TableCell>
                                            <TableCell>{refund.customer}</TableCell>
                                            <TableCell>{refund.notes}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEdit(refund)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(refund)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={10} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={10} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={10}
                                                    count={sortedRefunds.length}
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
                    backgroundColor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <h2 className="text-xl font-bold mb-4">Edit Refund</h2>
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
                        label="Date"
                        value={editProduct?.date || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, date: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Proceed by"
                        value={editProduct?.proceed_by || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, proceed_by: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Customer"
                        value={editProduct?.customer || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, customer: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Notes"
                        value={editProduct?.notes || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, notes: e.target.value })}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                    />

                    <DialogActions sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
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
                <DialogTitle>Delete Refund</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the refund for &quot;{deleteProduct?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteProduct(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Refund Modal */}
            <Modal open={isAddRefundModalOpen} onClose={() => setIsAddRefundModalOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    backgroundColor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none'
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Process New Refund
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Product Information */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Product Name"
                                value={newRefund.name}
                                onChange={(e) => setNewRefund({ ...newRefund, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="SKU"
                                value={newRefund.sku}
                                onChange={(e) => setNewRefund({ ...newRefund, sku: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.sku}
                                helperText={errors.sku}
                            />
                        </Grid>

                        {/* Refund Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price"
                                value={newRefund.price}
                                onChange={(e) => setNewRefund({ ...newRefund, price: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.price}
                                helperText={errors.price}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                                }}
                            />
                        </Grid>

                        {/* Customer and Processing */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Customer Name"
                                value={newRefund.customer}
                                onChange={(e) => setNewRefund({ ...newRefund, customer: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.customer}
                                helperText={errors.customer}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Processed By"
                                value={newRefund.proceed_by}
                                onChange={(e) => setNewRefund({ ...newRefund, proceed_by: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.proceed_by}
                                helperText={errors.proceed_by}
                            />
                        </Grid>

                        {/* Date and Reason */}
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Refund Date"
                                    value={newRefund.date ? dayjs(newRefund.date) : null}
                                    onChange={(newValue) => {
                                        setNewRefund({ ...newRefund, date: newValue ? newValue.format('YYYY/MM/DD') : "" });
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Refund Reason</InputLabel>
                                <Select
                                    value={newRefund.reason}
                                    onChange={(e) => setNewRefund({ ...newRefund, reason: e.target.value })}
                                    label="Refund Reason"
                                    error={!!errors.reason}
                                >
                                    <MenuItem value="Production Issues">Production Issues</MenuItem>
                                    <MenuItem value="Damaged Product">Damaged Product</MenuItem>
                                    <MenuItem value="Wrong Item">Wrong Item</MenuItem>
                                    <MenuItem value="Customer Request">Customer Request</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                                {errors.reason && <Typography variant="caption" color="error">{errors.reason}</Typography>}
                            </FormControl>
                        </Grid>

                        {/* Notes */}
                        <Grid item xs={12}>
                            <TextField
                                label="Notes"
                                value={newRefund.notes}
                                onChange={(e) => setNewRefund({ ...newRefund, notes: e.target.value })}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {image && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Selected file: {image.name}
                                </Typography>
                            )}
                            {errors.image && <Typography variant="caption" color="error">{errors.image}</Typography>}
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddRefund}
                        >
                            Process Refund
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddRefundModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}